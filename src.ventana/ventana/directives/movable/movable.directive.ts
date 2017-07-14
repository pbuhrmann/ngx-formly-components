import { Directive, ElementRef, HostListener, Input, Renderer, enableProdMode, EventEmitter, Output, OnInit } from '@angular/core';
import { MovableHeaderDirective } from './movableheader.directive';
import { MovableService } from '../../services/movable.service';

@Directive({
    selector: '[movable]'
})
export class MovableDirective implements OnInit {

    @Output() positionChanged = new EventEmitter<any>();
    @Input('mLeft') mLeft: number = 0;
    @Input('mTop') mTop: number = 0;

    header: MovableHeaderDirective;
    headerEl: ElementRef;
    element: HTMLElement;
    x = null;
    y = null;
    width = null;
    height = null;
    left = null;
    top = null;
    right = null;
    bottom = null;

    newPosX = null;
    newPosY = null;

    constructor(private el: ElementRef, private renderer: Renderer, private service: MovableService) {
        this.element = this.el.nativeElement;
        this.obtenerFoco();
    }

    ngOnInit() {
        //console.log(this.mLeft, this.mTop);
        this.renderer.setElementStyle(this.el.nativeElement, 'left', this.mLeft + 'px');
        this.renderer.setElementStyle(this.el.nativeElement, 'top', this.mTop + 'px');
        this.obtenerFoco();
    }

    @HostListener('mousedown', ['$event'])
    public OnMouseDown(event: MouseEvent) {
        this.obtenerFoco();
    }

    public set headerElement(header: { el: ElementRef }) {
        this.headerEl = header.el;
        this.renderer.setElementStyle(this.headerEl.nativeElement, 'backgroundColor', '#0275D8');
        this.renderer.setElementStyle(this.headerEl.nativeElement, 'color', '#FFFFFF');
        this.service.setHeader(this.headerEl);
    }
    public move(x, y) {
        if (this.x == null && this.y == null) {
            this.x = x;
            this.y = y;

            //console.log(this.el);
            this.left = this.el.nativeElement.style.left.replace('px', '');
            this.top = this.el.nativeElement.style.top.replace('px', '');

            /*let bounds = this.element.getBoundingClientRect();
            this.width = bounds.width;
            this.height = bounds.height;
            this.left = bounds.left;
            this.right = bounds.right;
            this.top = bounds.top;
            this.bottom = bounds.bottom;*/
        }
        else {
            if (this.left != "") {
                this.newPosX = this.left - (this.x - x);
                this.newPosX = this.newPosX < 0 ? 0 : this.newPosX;
                this.newPosX = this.newPosX + 25 > window.innerWidth ? window.innerWidth - 25 : this.newPosX;
            }
            if (this.top != "") {
                this.newPosY = this.top - (this.y - y);
                this.newPosY = this.newPosY < 0 ? 0 : this.newPosY;
                this.newPosY = this.newPosY + 25 > window.innerHeight ? window.innerHeight - 25 : this.newPosY;
            }
            requestAnimationFrame(this.moveit.bind(this));
        }
    }

    private moveit() {
        if (this.left != "") {
            this.renderer.setElementStyle(this.el.nativeElement, 'left', this.newPosX + 'px');
        }
        if (this.top != "") {
            this.renderer.setElementStyle(this.el.nativeElement, 'top', this.newPosY + 'px');
        }

        this.positionChanged.emit({ left: this.newPosX, top: this.newPosY });
    }

    private obtenerFoco() {
        /**
         * Utiliza el servicio para aumentar su z index, poner el header de la ventana anterior en gris
         * y el de esta en azul.
         */
        this.renderer.setElementStyle(this.el.nativeElement, 'zIndex', this.service.getZIndex().toString());
        if (this.service.lastHeader !== this.headerEl) {
            if (this.headerEl) {
                this.renderer.setElementStyle(this.headerEl.nativeElement, 'backgroundColor', '#0275D8');
                this.renderer.setElementStyle(this.headerEl.nativeElement, 'color', '#FFFFFF');
            }
            if (this.service.lastHeader) {
                this.renderer.setElementStyle(this.service.lastHeader.nativeElement, 'backgroundColor', '#F0F0F0');
                this.renderer.setElementStyle(this.service.lastHeader.nativeElement, 'color', '#888888');
            }
            this.service.setHeader(this.headerEl);
        }
    }
}
