import { Directive, ElementRef, HostListener, Input, Renderer, Host } from '@angular/core';
import { MovableDirective } from './movable.directive';
import { PerformanceService } from '../../services/performance.service';

@Directive({
    selector: '[movableheader]'
})
export class MovableHeaderDirective {

    public movable: MovableDirective;
    public el: ElementRef;

    protected mouseMoveBind: EventListener = this.onMouseMove.bind(this);
    protected mouseUpBind: EventListener = this.onMouseUp.bind(this);

    mouseIsDown = false;
    requestAnimation = null;

    constructor( @Host() movable: MovableDirective, el: ElementRef, private performance: PerformanceService) {
        this.movable = movable;
        this.el = el;
    }

    public ngOnInit(): void {
        this.movable.headerElement = this;
    }

    @HostListener('mousedown', ['$event'])
    public onMouseDown(event: MouseEvent) {
        this.performance.getAppComponentChangeDetectionRef().detach();
        window.document.addEventListener('mousemove', this.mouseMoveBind, true);
        window.document.addEventListener('mouseup', this.mouseUpBind, true);
    }

    public onMouseUp(event: MouseEvent) {
        this.performance.getAppComponentChangeDetectionRef().reattach();
        event.stopPropagation();
        window.document.removeEventListener('mousemove', this.mouseMoveBind, true);
        window.document.removeEventListener('mouseup', this.mouseUpBind, true);
        this.movable.x = null;
        this.movable.y = null;
    }

    public onMouseMove(event: MouseEvent) {
        event.stopPropagation();
        let posX = event.clientX;
        let posY = event.clientY;
        this.movable.move(posX, posY);
    }

}
