import { useState, useEffect } from 'react';
import Header from './components/Header'
import Filtros from './components/Filtros';
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal';
import { generarId } from './helpers';
import { IconoNuevoGasto } from './components/Iconos';

function App() {
	const [gastos, setGastos] = useState(
		localStorage.getItem('gastos')
			? JSON.parse(localStorage.getItem('gastos'))
			: []
	);
	const [presupuesto, setPresupuesto] = useState(
		Number(localStorage.getItem('presupuesto')) ?? 0
	);
	const [presupuestoValido, setPresupuestoValido] = useState(false);
	const [modal, setModal] = useState(false);
	const [animarmodal, setAnimarModal] = useState(false);
	const [gastoEditar, setGastoEditar] = useState({});
	const [filtro, setFiltro] = useState('');
	const [gastosFiltrados, setGastosFiltrados] = useState([]);

	useEffect(() => {
		if (Object.keys(gastoEditar).length > 0) {
			setModal(true);

			setTimeout(() => {
				setAnimarModal(true);
			}, 100);
		}
	}, [gastoEditar]);

	useEffect(() => {
		localStorage.setItem('presupuesto', presupuesto ?? 0);
	}, [presupuesto]);

	useEffect(() => {
		localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
	}, [gastos]);

	useEffect(() => {
		const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;

		if (presupuestoLS > 0) {
			setPresupuestoValido(true);
		}
	}, []);

	useEffect(() => {
		if (filtro) {
			const gastosFiltrados = gastos.filter(
				gasto => gasto.categoria === filtro
			);
			setGastosFiltrados(gastosFiltrados);
		}
	}, [filtro, gastos]);

	const handleNuevoGasto = () => {
		setModal(true);
		setGastoEditar({});

		setTimeout(() => {
			setAnimarModal(true);
		}, 100);
	};

	const guardarGasto = gasto => {
		if (gasto.id) {
			const gastosActualizados = gastos.map(gastoState =>
				gastoState.id == gasto.id ? gasto : gastoState
			);
			setGastos(gastosActualizados);
			setGastoEditar({});
		} else {
			gasto.fecha = Date.now();
			gasto.id = generarId();
			setGastos([...gastos, gasto]);
		}
	};

	const eliminarGasto = id => {
		const gastosActuales = gastos.filter(gasto => gasto.id !== id);
		setGastos(gastosActuales);
	};

	return (
		<div className={modal ? 'fijar' : ''}>
			<Header
				gastos={gastos}
				setGastos={setGastos}
				presupuesto={presupuesto}
				setPresupuesto={setPresupuesto}
				presupuestoValido={presupuestoValido}
				setPresupuestoValido={setPresupuestoValido}
			/>

			{presupuestoValido && (
				<>
					<main>
						<Filtros filtro={filtro} setFiltro={setFiltro} />
						<ListadoGastos
							gastos={gastos}
							setGastoEditar={setGastoEditar}
							eliminarGasto={eliminarGasto}
							filtro={filtro}
							gastosFiltrados={gastosFiltrados}
						/>
					</main>

					<div className='nuevo-gasto'>
						<IconoNuevoGasto
							width='2.5em'
							height='2.5em'
							alt='Icono Nuevo Gasto'
							onClick={handleNuevoGasto}
						/>
					</div>
				</>
			)}

			{modal && (
				<Modal
					setModal={setModal}
					animarmodal={animarmodal}
					setAnimarModal={setAnimarModal}
					guardarGasto={guardarGasto}
					gastoEditar={gastoEditar}
					setGastoEditar={setGastoEditar}
				/>
			)}
		</div>
	);
}

export default App;
