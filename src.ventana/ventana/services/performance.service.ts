import { Injectable, ChangeDetectorRef } from '@angular/core';

@Injectable()
export class PerformanceService {

    appComponentChangeDetectionRef: ChangeDetectorRef;

    constructor() { }

    setAppComponentChangeDetectionRef(ref: ChangeDetectorRef) {
        this.appComponentChangeDetectionRef = ref;
    }

    getAppComponentChangeDetectionRef() {
        return this.appComponentChangeDetectionRef;
    }
}