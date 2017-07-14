import { Directive, ElementRef, HostListener, Input, Renderer, Host } from '@angular/core';
import { ResizableDirective } from './resizable.directive';
import { PerformanceService } from '../../services/performance.service';

@Directive({
    selector: '[resizable-dragger]'
})
export class ResizableDraggerDirective {

    public resizeable: ResizableDirective;
    public el: ElementRef;

    protected mouseMoveBind: EventListener = this.onMouseMove.bind(this);
    protected mouseUpBind: EventListener = this.onMouseUp.bind(this);

    mouseIsDown = false;
    requestAnimation = null;
    animating: boolean = false;

    constructor( @Host() resizeable: ResizableDirective, el: ElementRef, private performance: PerformanceService) {
        this.resizeable = resizeable;
        this.el = el;
    }

    public ngOnInit(): void {
        this.resizeable.draggerElement = this;
    }

    @HostListener('mousedown', ['$event'])
    public onMouseDown(event: MouseEvent) {
        this.performance.getAppComponentChangeDetectionRef().detach();
        event.stopPropagation();
        this.resizeable.mousedown();
        window.document.addEventListener('mousemove', this.mouseMoveBind, true);
        window.document.addEventListener('mouseup', this.mouseUpBind, true);
    }

    public onMouseUp(event: MouseEvent) {
        this.performance.getAppComponentChangeDetectionRef().reattach();
        event.stopPropagation();
        this.resizeable.mouseup();
        window.document.removeEventListener('mousemove', this.mouseMoveBind, true);
        window.document.removeEventListener('mouseup', this.mouseUpBind, true);
        this.resizeable.x = null;
        this.resizeable.y = null;
    }

    public onMouseMove(event: MouseEvent) {
        event.stopPropagation();
        let posX = event.clientX;
        let posY = event.clientY;
        this.resizeable.move(posX, posY);
    }
}
