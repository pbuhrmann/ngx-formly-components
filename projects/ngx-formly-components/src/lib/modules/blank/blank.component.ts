import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
    selector: 'formly-blank',
    styles: [`
    .blank {
        width: 100%;
    }
    `],
    template: `
    <div class="blank"></div>
    `
})
export class FormlyBlankComponent extends FieldType {

    constructor() {
        super();
    }

}
