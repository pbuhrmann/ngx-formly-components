import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormlySplitWrapperComponent } from './split-wrapper.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [FormlySplitWrapperComponent],
	exports: [FormlySplitWrapperComponent]
})
export class FormlySplitWrapperModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: FormlySplitWrapperModule, providers: []
		};
	}
}