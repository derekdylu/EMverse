import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InputPage from './Containers/inputPage';
import Home from './Containers/Home';
import CommentPage from './Containers/commentPage';

function App() {
	return (
		<Router>
			<div>
				<Routes>
					<Route path="/home" element={<Home />} />
					<Route path="/input" element={<InputPage />} />
					<Route path="/:_emotion" element={<CommentPage />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
