import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlanetService } from './planet.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class PlanetListComponent implements OnInit, OnDestroy {
  platenList = [];
  count: number;
  platenListSubscription: Subscription;
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  displayedColumns: string[] = ['name', 'terrain', 'population', 'residents', 'films'];
  isLoadData = false;
  expandedElement;
  residentNameList = [];
  filmNameList = [];

  constructor(private planetService: PlanetService) {
    planetService.planets$.subscribe(
      (res) => {
        this.isLoadData = true;
        this.dataSource.data = res;
      }
    );
  }

  ngOnInit() {
    this.getPlanetList(1);
  }

  ngOnDestroy() {
    this.platenListSubscription.unsubscribe();
  }

  addPlanetLst(planetSet) {
    planetSet.forEach(planet => this.platenList.push(planet));
    if (this.platenList.length === this.count) {
      this.planetService.setNextPlanetsSource(this.platenList);
    }
  }

  getPlanetList(page) {
    this.planetService.getPlanetList(page).subscribe(
      (response) => {
        this.count = response['count'];
        this.addPlanetLst(response['results']);
        if (response['next']) {
          const next = this.planetService.getPageNum(response['next']);
          this.getPlanetList(next);
        }
      },
      (err) => {}
    );
  }

  getExpandedDataHandler(el) {
    this.residentNameList = [];
    this.filmNameList = [];
    if (el === this.expandedElement) {
      this.expandedElement = null;
    } else {
      this.getResidentFilmNameList(el);
      this.expandedElement = el;
    }
  }

  getResidentFilmNameList(el) {
    if (el['residents'] && el['residents'].length !== 0) {
      el['residents'].forEach((url) => {
        const num = this.planetService.returnNumber(url);

        this.planetService.getResidentName(num).subscribe(
          (name: string) => {
            this.residentNameList.push(name);
          }
        );
      });
    }
    if (el['films'] && el['films'].length !== 0) {
      el['films'].forEach((url) => {
        const num = this.planetService.returnNumber(url);

        this.planetService.getFilmName(num).subscribe(
          (title: string) => {
            this.filmNameList.push(title);
          }
        );
      });
    }
  }
}
