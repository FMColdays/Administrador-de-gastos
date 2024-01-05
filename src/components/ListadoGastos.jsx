import Gasto from './Gasto';
import PropTypes from 'prop-types';

const ListadoGastos = ({
	gastos,
	setGastoEditar,
	eliminarGasto,
	filtro,
	gastosFiltrados,
}) => {
	return (
		<div className='listado-gastos contenedor'>
			{filtro ? (
				<>
					<h2>{gastosFiltrados.length ? 'Gastos' : 'No hay gastos aun'}</h2>
					{gastosFiltrados.map(gasto => (
						<Gasto
							key={gasto.id}
							gasto={gasto}
							setGastoEditar={setGastoEditar}
							eliminarGasto={eliminarGasto}
						/>
					))}
				</>
			) : (
				<>
					<h2>{gastos.length ? 'Gastos' : 'No hay gastos aun'}</h2>
					{gastos.map(gasto => (
						<Gasto
							key={gasto.id}
							gasto={gasto}
							setGastoEditar={setGastoEditar}
							eliminarGasto={eliminarGasto}
						/>
					))}
				</>
			)}
		</div>
	);
};

ListadoGastos.propTypes = {
	gastos: PropTypes.array.isRequired,
	setGastoEditar: PropTypes.func.isRequired,
	eliminarGasto: PropTypes.func.isRequired,
	filtro: PropTypes.string.isRequired,
	gastosFiltrados: PropTypes.array.isRequired,
};

export default ListadoGastos;
