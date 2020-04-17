import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FeedFilter from './FeedFilter';
import Sidebar from './Sidebar';
import Feed from './Feed';

const Container = styled.div`
	max-width: 960px;
	margin: 0 auto;
	display: grid;
	grid-template-columns: 1fr 310px;
	grid-gap: 24px;
	padding-top: 24px;
	@media (max-width: 960px) {
		grid-template-columns: 1fr;
		max-width: 869px;
	}
`;

export default function FeedContainer({ data }) {
	const [width, setWidth] = useState(window.innerWidth);

	useEffect(() => {
		window.addEventListener('resize', () => setWidth(window.innerWidth));
	}, []);

	return (
		<Container>
			<FeedFilter />
			{width > 960 ? <Sidebar /> : null}
			<Feed data={data} />
		</Container>
	);
}
