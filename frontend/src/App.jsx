import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InputPage from './Containers/inputPage';
import Home from './Containers/Home';
import CommentPage from './Containers/commentPage';
import Menu from './Components/Menu';
import Error from './Containers/Error';

function App() {
	return (
		<Router>
			<div>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/home" element={<Home />} />
					<Route path="/input" element={<InputPage />} />
					<Route path="/menu" element={<Menu />} />
					<Route path="/:_emotion" element={<CommentPage />} />
					<Route path="*" element={<Error />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
