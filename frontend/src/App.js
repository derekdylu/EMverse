import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InputPage from './InputPage';

function App() {
	return (
		<Router>
			<div>
				<Routes>
					<Route path="/" element={<InputPage />} />
					{/* <Route path="/:_emotion" element={<CommentPage />} /> */}
				</Routes>
			</div>
		</Router>
	);
}

export default App;
