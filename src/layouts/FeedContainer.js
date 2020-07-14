import PropTypes from 'prop-types';
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
	margin: 0 auto;
	display: grid;
	grid-template-columns: 1fr 310px;
	grid-template-rows: auto;
	grid-gap: 24px;
	padding-top: 24px;
	@media screen and (max-width: 960px) {
		grid-template-columns: 1fr;
		max-width: 869px;
	}
	@media screen and (max-width: 600px) {
		width: 100%;
	}
`;

const MainContainer = styled.div`
	grid-column: 1;
`;

const SidebarContainer = styled.div`
	grid-column: 2;
`;

export default function FeedContainer({
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

	// conditionally displaying Feed/FeedSort because the
	// Comments page uses this component without FeedSort
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

FeedContainer.propTypes = {
	children: PropTypes.node,
	displayFeedSort: PropTypes.bool,
	posts: PropTypes.any,
	sortBy: PropTypes.any,
	sortPosts: PropTypes.func,
	user: PropTypes.any,
	viewPostComments: PropTypes.func,
};
