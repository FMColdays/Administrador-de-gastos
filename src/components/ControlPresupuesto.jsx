import { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PropTypes from 'prop-types';

const ControlPresupuesto = ({
	gastos,
	setGastos,
	presupuesto,
	setPresupuesto,
	setPresupuestoValido,
}) => {
	const [porcentaje, setPorcentaje] = useState(0);
	const [disponible, setDisponible] = useState(0);
	const [gastado, setGastado] = useState(0);

	useEffect(() => {
		const totalGastado = gastos.reduce(
			(total, gasto) => gasto.cantidad + total,
			0
		);

		const totalDisponible = presupuesto - totalGastado;

		setDisponible(totalDisponible);
		setGastado(totalGastado);

		const valorPorcentaje = ((totalGastado * 100) / presupuesto).toFixed(2);

		setTimeout(() => setPorcentaje(valorPorcentaje), 1000);
	}, [gastos, presupuesto]);

	const formatearCantidad = cantidad => {
		return cantidad.toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD',
		});
	};

	const handleResetApp = () => {
		setGastos([]);
		setPresupuesto(0);
		setPresupuestoValido(false);
	};

	return (
		<div className='contenedor-presupuesto contenedor sombra dos-columnas'>
			<div>
				<CircularProgressbar
					styles={buildStyles({
						pathColor: porcentaje > 100 ? '#D61919' : '#3B82F6',
						trailColor: '#F5F5F5',
						pathTransitionDuration: 1,
						textColor: porcentaje > 100 ? '#D61919' : '#3B82F6',
					})}
					value={porcentaje}
					text={`${porcentaje}% gastado`}
				/>
			</div>
			<div className='contenido-presupuesto'>
				<button className='reset-app' type='button' onClick={handleResetApp}>
					Resetear app
				</button>
				<p>
					<span>Presupuesto:</span> {formatearCantidad(presupuesto)}
				</p>
				<p className={`${disponible < 0 ? 'negativo' : ''}`}>
					<span>Disponible:</span> {formatearCantidad(disponible)}
				</p>
				<p>
					<span>Gastado:</span> {formatearCantidad(gastado)}
				</p>
			</div>
		</div>
	);
};

ControlPresupuesto.propTypes = {
	gastos: PropTypes.array.isRequired,
	setGastos: PropTypes.func.isRequired,
	presupuesto: PropTypes.number.isRequired,
	setPresupuesto: PropTypes.func.isRequired,
	setPresupuestoValido: PropTypes.func.isRequired,
};

export default ControlPresupuesto;
