/**
 * Created by alena on 27/02/19.
 */
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'formatAmount'})
export class FormatAmountPipe implements PipeTransform{
  transform(value): string | number {
    if (value === 'unknown') {
      return  '';
    }
    /* nine zeroes for billions */
    return Math.abs(Number(value)) >= 1.0e+9

      ? Math.abs(Number(value)) / 1.0e+9 + 'b'
      /* six zeroes for millions */
      : Math.abs(Number(value)) >= 1.0e+6

        ? Math.abs(Number(value)) / 1.0e+6 + 'm'
        /* three zeroes for thousands */
        : Math.abs(Number(value)) >= 1.0e+3

          ? Math.abs(Number(value)) / 1.0e+3 + 'k'

          : Math.abs(Number(value));
  }
}
