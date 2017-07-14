import { Injectable, ElementRef } from '@angular/core';

@Injectable()
export class MovableService {

    zIndex = 9999;
    lastHeader: ElementRef;

    constructor() { }

    getZIndex() {
        return this.zIndex++;
    }

    setHeader(header: ElementRef) {
        this.lastHeader = header;
    }
}
