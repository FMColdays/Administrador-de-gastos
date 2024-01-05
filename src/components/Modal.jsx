import { useEffect, useState } from 'react';
import Mensaje from './Mensaje';
import { IconoCerrar } from './Iconos/';
import PropTypes from 'prop-types';

const Modal = ({
	setModal,
	animarmodal,
	setAnimarModal,
	guardarGasto,
	gastoEditar,
	setGastoEditar,
}) => {
	const [nombre, setNombre] = useState('');
	const [cantidad, setCantidad] = useState(0);
	const [categoria, setCategoria] = useState('');
	const [mensaje, setMensaje] = useState('');
	const [fecha, setFecha] = useState('');
	const [id, setId] = useState('');

	useEffect(() => {
		if (Object.keys(gastoEditar).length > 0) {
			setNombre(gastoEditar.nombre);
			setCantidad(gastoEditar.cantidad);
			setCategoria(gastoEditar.categoria);
			setFecha(gastoEditar.fecha);
			setId(gastoEditar.id);
		}
	}, [gastoEditar]);

	const handleSubmit = e => {
		e.preventDefault();

		if ([nombre, cantidad, categoria].includes('')) {
			setMensaje('Todos los campos son obligatorios');

			setTimeout(() => {
				setMensaje('');
			}, 8000);

			return;
		}

		guardarGasto({
			nombre,
			cantidad,
			categoria,
			fecha,
			id,
		});

		ocultarModal();
	};

	const ocultarModal = () => {
		setGastoEditar({});
		setAnimarModal(false);
		setTimeout(() => {
			setModal(false);
		}, 500);
	};

	return (
		<div className='modal'>
			<div className='cerrar-modal'>
				<IconoCerrar
					width='2em'
					height='2em'
					alt='Cerrar'
					onClick={ocultarModal}
					fill='#fff'
				/>
			</div>

			<form
				onSubmit={e => handleSubmit(e)}
				className={`formulario ${animarmodal ? 'animar' : 'cerrar'}`}
				action=''
			>
				<legend>{gastoEditar.nombre ? 'Editar gasto' : 'Nuevo gasto'}</legend>
				{mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}

				<div className='campo'>
					<label htmlFor='nombre'>Nombre gasto</label>
					<input
						id='nombre'
						type='text'
						placeholder='Añade el nombre del gasto'
						value={nombre}
						onChange={e => setNombre(e.target.value)}
					/>
				</div>

				<div className='campo'>
					<label htmlFor='nombre'>Nombre gasto</label>
					<input
						id='cantidad'
						type='number'
						placeholder='Añade la cantidad'
						value={cantidad}
						min={1}
						onChange={e => setCantidad(Number(e.target.value))}
					/>
				</div>

				<div className='campo'>
					<label htmlFor='nombre'>Categoría</label>
					<select
						id='categoria'
						value={categoria}
						onChange={e => setCategoria(e.target.value)}
					>
						<option value=''>Seleccione una categoría</option>
						<option value='ahorro'>Ahorro</option>
						<option value='comida'>Comida</option>
						<option value='gastos'>Gastos varios</option>
						<option value='ocio'>Ocio</option>
						<option value='salud'>Salud</option>
						<option value='suscripciones'>Suscripciones</option>
					</select>
				</div>

				<input
					type='submit'
					value={gastoEditar.nombre ? 'Guardar cambios' : 'Añadir gasto'}
				/>
			</form>
		</div>
	);
};

Modal.propTypes = {
	setModal: PropTypes.func.isRequired,
	animarmodal: PropTypes.bool.isRequired,
	setAnimarModal: PropTypes.func.isRequired,
	guardarGasto: PropTypes.func.isRequired,
	gastoEditar: PropTypes.object.isRequired,
	setGastoEditar: PropTypes.func.isRequired,
};

export default Modal;
