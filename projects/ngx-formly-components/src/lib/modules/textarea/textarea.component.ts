import { Component, OnInit, DoCheck, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'ngx-formly-component-textarea',
    styles: [`
    textarea {
        resize: vertical;
    }
  `],
    template: `
    <div class="" [ngStyle]="{color:formControl?.errors?'#f44336':'inherit'}">
        <mat-form-field style="width: 100%">
            <textarea 
                [matAutosizeMaxRows]="to.maxRows" 
                [matAutosizeMinRows]="to.minRows" 
                matInput 
                matTextareaAutosize 
                matAutosize
                placeholder="{{to.placeholder}}" 
                [formControl]="formControl" 
                (keydown)="keydown($event)" 
                (keyup)="keyup($event)">
            </textarea>
        </mat-form-field>
    </div>
  `,
})
export class FormlyTextareaComponent extends FieldType implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<void> = new Subject<void>();
    public value: string;
    private isShiftDown: boolean;

    constructor(private changeDetectorRef: ChangeDetectorRef) {
        super();
    }

    public ngOnInit() {
        this.formControl.valueChanges.pipe(takeUntil(this.ngUnsubscribe)).subscribe(e => {
            let result = e;
            if (e) {
                if (this.to.maxLength && e.length > this.to.maxLength) {
                    result = result.substr(0, this.to.maxLength);
                }
                if (this.to.format) {
                    result = this.to.format(e);
                }
            }

            this.formControl.setValue(result, { emitEvent: false });
        });
    }

    keydown(e: any) {
        if (e.key == 'Shift') {
            this.isShiftDown = true;
        }
        if (this.to.keydown) {
            this.to.keydown(e, this.isShiftDown);
        }
    }

    keyup(e: any) {        
        if (e.key == 'Shift') {
            this.isShiftDown = false;
        }
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

}
