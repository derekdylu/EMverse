import './App.css';
<<<<<<< HEAD
import React, { useEffect } from "react";

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.-js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
=======
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InputPage from './inputPage';

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
>>>>>>> a475696ca01c4e4be3c8262bede098d7d746e7aa
}

export default App;
