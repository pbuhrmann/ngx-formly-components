import { Component } from '@angular/core';
import { Field } from 'ng-formly';

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
export class FormlyBlankComponent extends Field {

    constructor() {
        super();
    }

}
