import React, { useState } from 'react';
import styled from 'styled-components';
import FeedSort from './FeedSort';
import Sidebar from './Sidebar';
import Feed from './Feed';
import { useWindowWidth } from '../hooks/useWindowWidth';

const Container = styled.div`
	width: calc(100% - 32px);
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
	displayFeedSort,
	children,
	viewPostComments,
}) {
	const [width, setWidth] = useState(window.innerWidth);
	useWindowWidth(setWidth);

	//conditionally displaying Feed/FeedSort because the Comments page
	//uses this component without FeedSort
	return (
		<Container>
			{displayFeedSort
				? [
						<FeedSort
							sortPosts={sortPosts}
							sortBy={sortBy}
							key={'sort posts'}
						/>,
						<Feed
							redditData={redditData}
							posts={posts}
							key={'feed'}
							viewPostComments={viewPostComments}
						/>,
				  ]
				: null}

			{width > 960 ? <Sidebar /> : null}
			{children}
		</Container>
	);
}
