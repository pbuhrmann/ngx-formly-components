import { NgModule } from '@angular/core';
import { MovableHeaderDirective } from "./movableheader.directive";
import { MovableDirective } from "./movable.directive";
@NgModule({
    imports: [],
    exports: [MovableDirective, MovableHeaderDirective],
    declarations: [MovableDirective, MovableHeaderDirective],
    providers: [],
})
export class MovableModule { }
