import PropTypes from 'prop-types';

const Filtros = ({ filtro, setFiltro }) => {
	return (
		<div className='filtros sombra contenedor'>
			<form>
				<div className='campo'>
					<label htmlFor='filtro'>Filtrar gastos</label>
					<select
						id='filtro'
						value={filtro}
						onChange={e => setFiltro(e.target.value)}
					>
						<option value=''>Todas las categorías</option>
						<option value='ahorro'>Ahorro</option>
						<option value='comida'>Comida</option>
						<option value='gastos'>Gastos varios</option>
						<option value='ocio'>Ocio</option>
						<option value='salud'>Salud</option>
						<option value='suscripciones'>Suscripciones</option>
					</select>
				</div>
			</form>
		</div>
	);
};

Filtros.propTypes = {
	filtro: PropTypes.string.isRequired,
	setFiltro: PropTypes.func.isRequired,
};

export default Filtros;
