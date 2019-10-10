import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormlySectionWrapperComponent } from './section-wrapper.component';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [FormlySectionWrapperComponent],
	exports: [FormlySectionWrapperComponent]
})
export class FormlySectionWrapperModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: FormlySectionWrapperModule, providers: []
		};
	}
}