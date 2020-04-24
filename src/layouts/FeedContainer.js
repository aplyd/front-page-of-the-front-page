import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FeedSort from './FeedSort';
import Sidebar from './Sidebar';
import Feed from './Feed';
import { useWindowWidth } from '../hooks/useWindowWidth';

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

export default function FeedContainer({
	redditData,
	posts,
	sortPosts,
	sortBy,
}) {
	const [width, setWidth] = useState(window.innerWidth);
	useWindowWidth(setWidth);

	return (
		<Container>
			<FeedSort sortPosts={sortPosts} sortBy={sortBy} />
			{width > 960 ? <Sidebar /> : null}
			<Feed redditData={redditData} posts={posts} />
		</Container>
	);
}
