import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hoursAndMinutes'
})
export class HoursAndMinutesPipe implements PipeTransform {
  transform(value: number): string {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    if (hours >0 && minutes>0) {
        return ` ${hours} hours and ${minutes} minuties ` ;
    }
    else if(hours>0)
    {
      return ` ${hours} hours.`
    }
    else
        return ` ${minutes} minuties`;
  }
}
