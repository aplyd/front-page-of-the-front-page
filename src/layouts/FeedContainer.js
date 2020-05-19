import React, { useState } from 'react';
import styled from 'styled-components';
import FeedSort from './FeedSort';
import Sidebar from './Sidebar';
import Feed from './Feed';
import FeedCreatePost from '../components/FeedCreatePost';
import { useWindowWidth } from '../hooks/useWindowWidth';

const Container = styled.div`
	width: calc(100% - 32px);
	max-width: 960px;
	min-width: 480px;
	margin: 0 auto;
	display: grid;
	grid-template-columns: 1fr 310px;
	grid-template-rows: auto;
	grid-gap: 24px;
	padding-top: 24px;
	@media (max-width: 960px) {
		grid-template-columns: 1fr;
		max-width: 869px;
	}
`;

const MainContainer = styled.div`
	grid-column: 1;
`;

const SidebarContainer = styled.div`
	grid-column: 2;
`;

export default function FeedContainer({
	redditData,
	posts,
	sortPosts,
	sortBy,
	displayFeedSort,
	children,
	viewPostComments,
	user,
}) {
	const [width, setWidth] = useState(window.innerWidth);
	useWindowWidth(setWidth);

	//conditionally displaying Feed/FeedSort because the Comments page
	//uses this component without FeedSort
	return (
		<Container>
			<MainContainer>
				{displayFeedSort ? (
					<React.Fragment>
						{user.isSignedIn ? (
							<FeedCreatePost key={'create post'} />
						) : null}

						<FeedSort
							sortPosts={sortPosts}
							sortBy={sortBy}
							key={'sort posts'}
						/>
						<Feed
							redditData={redditData}
							posts={posts}
							key={'feed'}
							viewPostComments={viewPostComments}
						/>
					</React.Fragment>
				) : null}
				{children}
			</MainContainer>
			{width > 960 ? (
				<SidebarContainer>
					<Sidebar />
				</SidebarContainer>
			) : null}
		</Container>
	);
}
