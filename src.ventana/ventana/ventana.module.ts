// Angular Imports
import { NgModule, ModuleWithProviders } from '@angular/core';

// import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
// This Module's Components
import { VentanaFlotanteComponent } from './ventana.component';
import { PerformanceService } from './services/performance.service';
import { MovableModule } from './directives/movable/movable.module';
import { ResizableModule } from './directives/resizable/resizable.module';
import { SimClickDirective } from './directives/sim-click/sim-click';
import { FocusDirective } from './directives/focus/focus.directive';
import { ActionEventService } from './services/action.event.service';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        // BrowserModule,
        CommonModule,
        FormsModule,
        MovableModule,
        ResizableModule
    ],
    declarations: [
        VentanaFlotanteComponent,
        FocusDirective,
        SimClickDirective,
    ],
    exports: [
        VentanaFlotanteComponent,
        SimClickDirective,
        FocusDirective,
        MovableModule,
        ResizableModule
    ],
})
export class VentanaFlotanteModule {
 static forRoot(): ModuleWithProviders {
     return{
         ngModule: VentanaFlotanteModule,
         providers: [PerformanceService, ActionEventService]
     }
 }
}
