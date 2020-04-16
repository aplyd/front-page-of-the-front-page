import React from 'react';
import styled from 'styled-components';
import FeedFilter from './FeedFilter';
import Sidebar from './Sidebar';
import Feed from './Feed';

const Container = styled.div`
	background: yellow;
	display: grid;
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
