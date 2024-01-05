import NuevoPresupuesto from './NuevoPresupuesto';
import ControlPresupuesto from './ControlPresupuesto';
import PropTypes from 'prop-types';

const Header = ({
	gastos,
	setGastos,
	presupuesto,
	setPresupuesto,
	presupuestoValido,
	setPresupuestoValido,
}) => {
	return (
		<header>
			<h1>Planificador de gastos </h1>

			{presupuestoValido ? (
				<ControlPresupuesto
					gastos={gastos}
					setGastos={setGastos}
					presupuesto={presupuesto}
					setPresupuesto={setPresupuesto}
					setPresupuestoValido={setPresupuestoValido}
				/>
			) : (
				<NuevoPresupuesto
					presupuesto={presupuesto}
					setPresupuesto={setPresupuesto}
					setPresupuestoValido={setPresupuestoValido}
				/>
			)}
		</header>
	);
};

Header.propTypes = {
	gastos: PropTypes.array.isRequired,
	setGastos: PropTypes.func.isRequired,
	presupuesto: PropTypes.number.isRequired,
	setPresupuesto: PropTypes.func,
	presupuestoValido: PropTypes.bool.isRequired,
	setPresupuestoValido: PropTypes.func.isRequired,
};

export default Header;
