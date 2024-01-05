import { useState } from 'react';
import Mensaje from './Mensaje';
import PropTypes from 'prop-types';

const NuevoPresupuesto = ({
	presupuesto,
	setPresupuesto,
	setPresupuestoValido,
}) => {
	const [mensaje, setMensaje] = useState('');

	const handlePresupuesto = e => {
		e.preventDefault();
		if (!presupuesto || presupuesto < 0) {
			setMensaje('No es un presupuesto valido');
			return;
		}
		setPresupuestoValido(true);
		setMensaje('');
	};

	return (
		<div className='contenedor-presupuesto contenedor sombra'>
			<form onSubmit={handlePresupuesto} className='formulario' action=''>
				<div className='campo'>
					<label>Definir presupuesto</label>

					<input
						id='presupuesto'
						className='nuevo-presupuesto'
						type='number'
						placeholder='Añade tu presupuesto'
						value={presupuesto}
						min={1}
						onChange={e => setPresupuesto(Number(e.target.value))}
					/>
				</div>
				<input type='submit' value='Añadir' />

				{mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
			</form>
		</div>
	);
};

NuevoPresupuesto.propTypes = {
	presupuesto: PropTypes.number.isRequired,
	setPresupuesto: PropTypes.func.isRequired,
	setPresupuestoValido: PropTypes.func.isRequired,
};

export default NuevoPresupuesto;
