import { Directive, Input, EventEmitter, ElementRef, Renderer, Inject } from '@angular/core';

@Directive({
    selector: '[sim-click]'
})
export class SimClickDirective {
    @Input('sim-click') clickEvent: EventEmitter<boolean>;

    constructor( @Inject(ElementRef) private element: ElementRef, private renderer: Renderer) {
    }

    ngOnInit() {
        this.clickEvent.subscribe(event => {
            this.renderer.invokeElementMethod(this.element.nativeElement, 'click', []);
        });
    }
}
