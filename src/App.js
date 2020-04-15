import React from 'react';
import './App.css';
import axios from 'axios';

function App() {
	const getFrontPageData = () => {
		axios
			.get('https://www.reddit.com/.json')
			.then((res) => console.log(res.data.children))
			.catch((err) => console.log(err));
	};

	getFrontPageData();

	return <div className="App"></div>;
}

export default App;
