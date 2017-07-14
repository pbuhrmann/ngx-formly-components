import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VentanaInterface } from './interfaces/ventana.interface';
@Component({
    // moduleId: module.id,
    inputs: ['title', 'close', 'minimizable', 'width', 'id', 'left', 'minimizada', 'top', 'height', 'onMinimizar', 'onRestaurar'],
    outputs: ['onClose', 'onSizeChanged', 'onCheckPermisos', 'onPositionChanged'],
    selector: 'ventana-flotante',
    template: `<div class="window-wrapper" movable [mLeft]="layout.left" [mTop]="layout.top" (positionChanged)="positionChanged($event)">
        <div movableheader class="window-header">
            <div [innerHTML]="title"></div>
            <span class="window-btn window-minimize-btn fa fa-window-minimize pull-right" (click)="minimizar()" *ngIf="minimizable && layout.minimizada == '0'"></span>
            <span class="window-btn window-restore-btn fa fa-window-restore pull-right" (click)="restaurar()" *ngIf="minimizable && layout.minimizada == '1'"></span>
            <span class="window-btn window-close-btn fa fa-close pull-right" (click)="onClose.emit()" *ngIf="close"></span>
        </div>
        <div class="sub-header" [ngClass]="{'minimizado':layout.minimizada == '1'}"><ng-content select=".window-sub-header"></ng-content></div>
        <div class="window-content-wrapper" [ngClass]="{'minimizado':layout.minimizada == '1'}" resizable (sizeChanged)="sizeChanged($event)" [rWidth]="layout.width" rOverflow="auto">
            <ng-content select=".window-content"></ng-content>
            <div class="resize-dragger" *ngIf="layout.minimizada != '1'" resizable-dragger></div>
        </div>
    </div>`,
    styles: [`:host {
    position: absolute;
    top: 0px;
}

.window-wrapper {
    background-color: #f7f7f7;
    position: absolute;
    width: auto;
    float: left;
    z-index: 9999;
    border-radius: 0px 15px 0 15px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
    min-width: 500px;
}

.window-btn  {
    position: absolute;
    z-index: 999;
    cursor: pointer;
    color: inherit;
    border-radius: 3px;
    height: 24px;
    width: 27px;
}
.window-close-btn {
    right: 9px;
    top: 7px;
    padding: 4px 8px;
}

.window-close-btn:hover {
    background: rgba(200, 100, 100, 1);
    color: white;
}

.window-minimize-btn {
    right: 40px;
    top: 7px;
    padding: 1px 6px;
}

.window-minimize-btn:hover {
    background: #1F91EF;
    color: white;
}

.window-restore-btn {
    right: 40px;
    top: 7px;
    padding: 4px 5px;
    line-height: 16px;
    width: 27px;
}

.window-restore-btn:hover {
    background: #6490c8;
    color: white;
}

.window-content-wrapper {
    float: left;
    width: 100%;
    padding: 0px 0px 0px 0px;
    clear: both;
    border-radius: 0px 0 0 15px;
    max-height: 80vh;
    max-width: 90vw;
    min-width: 500px;
    min-height: 50px;
    transition: .3s max-height ease;
}

.window-content-wrapper.minimizado {
    max-height: 0;
    min-height: 0;
}

.window-header {
    background: rgba(240, 240, 240, 0.95);
    position: relative;
    float: left;
    width: 100%;
    clear: both;
    padding: 8px 12px;
    font-weight: bold;
    border-radius: 0px 15px 0 0;
    cursor: move;
}

:host /deep/ .window-sub-header {
    border-bottom: 1px solid #ccc;
    padding: 5px;
    padding-bottom: 0;
    background-color: #fff;
    border-radius: 0 15px 0 0;
}

.sub-header {
    transition: .5s all ease;
}
.sub-header.minimizado{
    max-height: 0;
    min-height: 0;
    overflow: hidden;
}

:host /deep/ .window-content {
    position: relative;
    float: left;
    width: 100%;
    clear: both;
    padding: 6px;
}

.resize-dragger {
    position: absolute;
    width: 0;
    height: 0;
    bottom: 0px;
    right: 0px;
    cursor: se-resize;
    border-style: solid;
    border-width: 0 0 10px 10px;
    border-color: transparent transparent #333 transparent;
}`]
})
export class VentanaFlotanteComponent implements OnInit {
    @Input() title: string = '';
    @Input() close: boolean = true;
    @Input() minimizable: boolean = true;
    @Input() width: string = 'auto';
    @Input() id: string = '';
    @Input() left: string = '400';
    @Input() minimizada: string = '0';
    @Input() top: string = '150';
    @Input() height: string = 'auto';
    @Output() onClose = new EventEmitter<any>();
    @Output() onSizeChanged = new EventEmitter<any>();
    @Output() onCheckPermisos = new EventEmitter<any>();
    @Output() onPositionChanged = new EventEmitter<any>();
    @Output() onMinimizar = new EventEmitter<any>();
    @Output() onRestaurar = new EventEmitter<any>();
    layout: VentanaInterface;
    config;
    ngOnInit() {
        this.checkPermisos();
        this.config = JSON.parse(localStorage.getItem('__ventana-flotante__')) || {};

        if(!this.config[this.id]){
            this.config[this.id] = {};
        }

        this.layout = {
            left: this.config[this.id].left || this.left,
            top: this.config[this.id].top || this.top,
            width: this.config[this.id].width || this.width,
            height: this.config[this.id].height || this.height,
            minimizada: this.config[this.id].minimizada || this.minimizada,
        };
    }

    positionChanged(e) {
        this.onPositionChanged.emit({
            id: this.id,
            left: this.layout.left,
            top: this.layout.top,
        });
        this.layout.left = e.left.toString();
        this.layout.top = e.top.toString();
        
        this.config[this.id].top = this.layout.top;
        this.config[this.id].left = this.layout.left;

        localStorage.setItem('__ventana-flotante__', JSON.stringify(this.config));
    }

    sizeChanged(e) {
        this.onSizeChanged.emit({
            id: this.id,
            width: this.layout.width,
            height: this.layout.height
        });
        if (!this.layout.minimizada) {
            this.layout.height = e.height.toString();
        }
        this.layout.width = e.width.toString();
        
        this.config[this.id].width = this.layout.width;
        this.config[this.id].height = this.layout.height;
        localStorage.setItem('__ventana-flotante__', JSON.stringify(this.config));
    }

    minimizar(): void {
        this.layout.minimizada = '1';
        this.onMinimizar.emit({
            id: this.id,
            layout: this.layout
        });

        this.config[this.id].minimizada = this.layout.minimizada;
        localStorage.setItem('__ventana-flotante__', JSON.stringify(this.config));
    }

    restaurar() {
        this.layout.minimizada = '0';
        this.onRestaurar.emit({
            id: this.id,
            layout: this.layout
        });
        
        this.config[this.id].minimizada = this.layout.minimizada;
        localStorage.setItem('__ventana-flotante__', JSON.stringify(this.config));
    }

    checkPermisos(): void {
        this.onCheckPermisos.emit({});
    }
}

