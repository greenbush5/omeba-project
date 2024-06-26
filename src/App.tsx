import { BrowserRouter , Routes, Route } from 'react-router-dom';

import Root from './routes/Root';
import SignUp from './routes/SignUp';
import Home from './routes/Home';
import TeamInfo from './routes/TeamInfo';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Root />} />
				<Route path='/signup' element={<SignUp />} />
				<Route path='/home' element={<Home />} />
				<Route path='/team_info' element={<TeamInfo />} />
			</Routes>
		</BrowserRouter>
	);
}