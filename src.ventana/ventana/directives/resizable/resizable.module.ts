import { NgModule } from '@angular/core';
import { MovableService } from '../../services/movable.service';
import { ResizableDirective } from "./resizable.directive";
import { ResizableDraggerDirective } from "./resizable-dragger.directive";
@NgModule({
    imports: [],
    exports: [ResizableDirective, ResizableDraggerDirective],
    declarations: [ResizableDirective, ResizableDraggerDirective],
    providers: [MovableService],
})
export class ResizableModule { }
