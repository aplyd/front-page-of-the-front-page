import React from 'react';
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
`;

export default function FeedContainer() {
	return (
		<Container>
			<FeedFilter />
			<Sidebar />
			<Feed />
		</Container>
	);
}
