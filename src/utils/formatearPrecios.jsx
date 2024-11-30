const formatearPrecios = (valor) => {
	const precio = valor;
	const precio_decimales = precio.toFixed(2);
	const partes = precio_decimales.split('.');
	const parteEntera = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
	const formattedPrecio = `${parteEntera},${partes[1]}`;
	return formattedPrecio;
};

export default formatearPrecios;
