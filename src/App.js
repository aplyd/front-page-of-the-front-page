import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import styled from 'styled-components';

import Nav from './layouts/Nav';
import FeedFilter from './layouts/FeedFilter';
import FeedContainer from './layouts/FeedContainer';
import Feed from './layouts/Feed';
import Sidebar from './layouts/Sidebar';

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	background: red;
`;

function App() {
	const [data, setData] = useState();

	const getFrontPageData = () => {
		axios
			.get('https://www.reddit.com/.json')
			.then((res) => setData(res.data.data.children))
			.catch((err) => console.log(err));
	};

	getFrontPageData();

	return (
		<React.Fragment>
			<Container>
				<Nav />
				<FeedContainer>
					<FeedFilter />
					<Sidebar />
					<Feed />
				</FeedContainer>
			</Container>
		</React.Fragment>
	);
}

export default App;
