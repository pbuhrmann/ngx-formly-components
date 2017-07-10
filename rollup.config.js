export default {
	entry: 'lib/dist/index.js',
	dest: 'lib/dist/bundles/ngx-formly-components.js',
	sourceMap: false,
	format: 'umd',
	moduleName: 'ngx.formly.components',
	globals: {
		'@angular/core': 'ng.core',
		'rxjs/Observable': 'Rx',
		'rxjs/ReplaySubject': 'Rx',
		'rxjs/add/operator/map': 'Rx.Observable.prototype',
		'rxjs/add/operator/mergeMap': 'Rx.Observable.prototype',
		'rxjs/add/observable/fromEvent': 'Rx.Observable',
		'rxjs/add/observable/of': 'Rx.Observable'
	}
}