import { Routes, Route, useLocation } from 'react-router-dom';
import HomePages from './pages/HomePage';
import PoliticasPrivacidadPage from './pages/PoliticasPrivacidadPage';
import Etapa1 from './components/etapas/etapa1';
import Etapa2 from './components/etapas/etapa2';
import Etapa3 from './components/etapas/etapa3';
import Etapa4 from './components/etapas/etapa4';
import ComplejoViviendas from './components/etapas/complejoViviendas';
import Login from './pages/Login';
import Dashboard from './pages/Administracion/Dashboard';
import Terrenos from './pages/Administracion/Terrenos';
import Sidebar from './components/Sidebar';
import PreciosPage from './pages/Administracion/PreciosPage';
import { ReservasPage } from './pages/Administracion/ReservasPage';
import { ControlReservasPage } from './pages/Administracion/ControlReservasPage';
import { ControlGral } from './pages/Administracion/ControlGral';
import VentaMetroPage from './pages/Administracion/VentaMetroPage';
import WhatsAppButton from './components/shared/WhatsAppButton';
import "slick-carousel/slick/slick.css";  
import "slick-carousel/slick/slick-theme.css";
import './index.css';


function App() {
  const location = useLocation();

  const hideWhatsAppButton = location.pathname.startsWith("/Administracion") || location.pathname === "/Login";

	return (
		<>
			<Routes>
				<Route path='/' element={<HomePages />} />
				<Route
					path='/politicasPrivacidad'
					element={<PoliticasPrivacidadPage />}
				/>
				<Route path='/primeraEtapa' element={<Etapa1 />} />
				<Route path='/segundaEtapa' element={<Etapa2 />} />
				<Route path='/terceraEtapa' element={<Etapa3 />} />
				<Route path='/cuartaEtapa' element={<Etapa4 />} />
				<Route path='/complejoViviendas' element={<ComplejoViviendas />} />
				<Route path='/Login' element={<Login />} />
				<Route path='/Administracion/*' element={<Sidebar />}>
					<Route index element={<Dashboard />} />
					<Route path='Terrenos' element={<Terrenos />} />
					<Route path='Precios' element={<PreciosPage />} />
					<Route path='Reservas' element={<ReservasPage />} />
					<Route path='ControlReservas' element={<ControlReservasPage />} />
					<Route path='ControlGral' element={<ControlGral />} />
					<Route path='VentaMetro' element={<VentaMetroPage />} />
				</Route>
			</Routes>
			{!hideWhatsAppButton && <WhatsAppButton />}
		</>

	);
}

export default App;
