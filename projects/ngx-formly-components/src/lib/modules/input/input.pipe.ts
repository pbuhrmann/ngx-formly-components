import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'inputFormat'
})
export class InputFormat implements PipeTransform {
    transform(value, format): any {
        if (!value) {
            return null;
        }
        if (format) {
            return format(value);
        }
        return value;
    }
}