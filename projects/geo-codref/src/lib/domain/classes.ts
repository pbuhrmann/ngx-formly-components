export class Punto {
	lat: number;
	lng: number;
}

export class PuntoMulti {
	lat: number;
	lng: number;
	id: number;
}

export class Sugerencia {
	sugerencia: string;
	direccion: string;
	extras: string;
	alias: string;
}

export class Numeracion {
	desde: number;
	hasta: number;
}

export class Inverso {
	nombre: string;
	sugerencia: Sugerencia;
	entre: string[];
	punto: Punto;
	numeracion: Numeracion;
	localidad: string;
	partido: string;
	barrio: string;
	linea: any;
}

export class Buscador {
	nombre: string;
	orden: number;
	permitido: boolean;
}

export class GeoDireccion {
	direccion: string;
	partido?: string;
	localidad?: string;
	pais?: string;
}

export class GeoReferenciar {
	barrio: string;
	numeracion: number[];
	entre: string[];
	localidad: string;
	partido: string;
	nombre: string;
	linea: any[];
	punto: GeoPunto;
	sugerencia: Sugerencia;
	numero: number;
	fuente: any;
	buscador: string;
}

export class GeoPunto {
	lat: string;
	lng: string;
	test: string;
	calle: string;
	alias: string;
}