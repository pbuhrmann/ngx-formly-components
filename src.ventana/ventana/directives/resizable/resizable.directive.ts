import { Directive, ElementRef, HostListener, Input, Renderer, EventEmitter, Output, OnInit } from '@angular/core';
import { ResizableDraggerDirective } from './resizable-dragger.directive';

@Directive({
    inputs:[],
    selector: '[resizable]'
})
export class ResizableDirective implements OnInit {

    @Output() sizeChanged = new EventEmitter<any>();
    @Input('rWidth') rWidth: number = 0;
    @Input('rHeight') rHeight: number = 0;
    @Input('rOverflow') rOverflow: string = null;
    @Input('noWidth') noWidth: boolean = false;
    @Input('noHeight') noHeight: boolean = false;
    @Input('rUp') rUp: boolean = false;
    @Input('rLeft') rLeft: boolean = false;

    dragger: ResizableDraggerDirective;
    draggerEl: ElementRef;
    x = null;
    y = null;
    width = null;
    height = null;

    newWidth = null;
    newHeight = null;
    overflow = '';

    constructor(private el: ElementRef, private renderer: Renderer) { }

    ngOnInit() {
        if (this.rWidth) {
            this.renderer.setElementStyle(this.el.nativeElement, 'width', this.rWidth + 'px');
        }
        if (this.rHeight) {
            this.renderer.setElementStyle(this.el.nativeElement, 'height', this.rHeight + 'px');
        }
        if (this.rOverflow) {
            this.renderer.setElementStyle(this.el.nativeElement, 'overflow', this.rOverflow);
        }
    }

    public set draggerElement(dragger: { el: ElementRef }) {
        this.draggerEl = dragger.el;
    }

    public move(x, y) {
        //console.log(this.el);
        if (this.x == null && this.y == null) {
            this.x = x;
            this.y = y;
            this.width = this.el.nativeElement.offsetWidth;
            this.height = this.el.nativeElement.offsetHeight;
        }
        else {
            if (!this.noHeight) {
                if (this.rUp) {
                    this.newHeight = this.height + (this.y - y);
                }
                else {
                    this.newHeight = this.height - (this.y - y);
                }
            }
            if (!this.noWidth) {
                if (this.rLeft) {
                    this.newWidth = this.width + (this.x - x);
                }
                else {
                    this.newWidth = this.width - (this.x - x);
                }
            }
            if (this.newWidth < 0) {
                this.newWidth = 0;
            }
            if (this.newHeight < 0) {
                this.newHeight = 0;
            }
            //console.log(this.el.nativeElement.offsetWidth, this.el.nativeElement.scrollWidth, this.el.nativeElement.getBoundingClientRect());

            requestAnimationFrame(this.moveit.bind(this));
        }
    }

    public mouseup() {
        if (this.rOverflow)
            this.renderer.setElementStyle(this.el.nativeElement, 'overflow', this.rOverflow);
    }

    public mousedown() {
        if (this.rOverflow)
            this.renderer.setElementStyle(this.el.nativeElement, 'overflow', 'hidden');
    }

    private moveit() {
        this.renderer.setElementStyle(this.el.nativeElement, 'width', this.newWidth + 'px');
        this.renderer.setElementStyle(this.el.nativeElement, 'height', this.newHeight + 'px');
        this.sizeChanged.emit({ width: this.newWidth, height: this.newHeight });
    }
}
