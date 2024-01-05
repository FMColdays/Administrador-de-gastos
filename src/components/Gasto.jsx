import {
	LeadingActions,
	SwipeableList,
	SwipeableListItem,
	SwipeAction,
	TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { formatearFecha } from '../helpers';
import {
	IconoAhorro,
	IconoCasa,
	IconoComida,
	IconoGastos,
	IconoOcio,
	IconoSalud,
	IconoSuscripciones,
} from './Iconos';
import PropTypes from 'prop-types';

const diccionarioIconos = {
	comida: <IconoComida width='4em' height='4em' />,
	casa: <IconoCasa width='4em' height='4em' />,
	salud: <IconoSalud width='4em' height='4em' />,
	ocio: <IconoOcio width='4em' height='4em' />,
	suscripciones: <IconoSuscripciones width='4em' height='4em' />,
	ahorro: <IconoAhorro width='4em' height='4em' />,
	gastos: <IconoGastos width='4em' height='4em' />,
};

const Gasto = ({ gasto, setGastoEditar, eliminarGasto }) => {
	const { nombre, cantidad, categoria, id, fecha } = gasto;

	const leadingActions = () => (
		<LeadingActions>
			<SwipeAction onClick={() => setGastoEditar(gasto)}>Editar</SwipeAction>
		</LeadingActions>
	);

	const trailingActions = () => (
		<TrailingActions>
			<SwipeAction onClick={() => eliminarGasto(id)} destructive={true}>
				Eliminar
			</SwipeAction>
		</TrailingActions>
	);

	return (
		<SwipeableList>
			<SwipeableListItem
				leadingActions={leadingActions()}
				trailingActions={trailingActions()}
			>
				<div className='gasto sombra'>
					<div className='contenido-gasto'>
						{diccionarioIconos[categoria]}
						<div className='descripcion-gasto'>
							<p className='categoria'>{categoria}</p>
							<p className='nombre-gasto'>{nombre}</p>
							<p className='fecha-gasto'>
								Agregado el: <span>{formatearFecha(fecha)}</span>
							</p>
						</div>
					</div>
					<p className='cantidad-gasto'>${cantidad}</p>
				</div>
			</SwipeableListItem>
		</SwipeableList>
	);
};

Gasto.propTypes = {
	gasto: PropTypes.object.isRequired,
	setGastoEditar: PropTypes.func.isRequired,
	eliminarGasto: PropTypes.func.isRequired,
};

export default Gasto;
