export const generarId = () => {
	const random = Math.random().toString(36).substr(2);
	const fecha = Date.now().toString(36);
	return random + fecha;
};

export const formatearFecha = fecha => {
	const fechaSinFormatear = new Date(fecha);
	const fechaNueva = fechaSinFormatear.toLocaleDateString('es-ES', {
		year: 'numeric',
		month: 'long',
		day: '2-digit',
	});

	return fechaNueva;
};
