import { Pipe, PipeTransform } from '@angular/core';
import _ from 'underscore';

@Pipe({
  name: 'orderBy'
})

export class OrderBy implements PipeTransform {
  transform(value: any, args: any): any {
    if (!args) { return value; }
    let field = args;
    let isReverse = false;
    let result = value;
    if (args.charAt(0) == "-") {
        isReverse = true;
        field = args.slice(1);
    }
    result = _.sortBy(value, field);
    if (isReverse) {
        result = result.reverse();
    }
    return result;
  }
}
