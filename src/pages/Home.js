import PropTypes from 'prop-types';
import React from 'react';
import { Container } from '../App';
import FeedContainer from '../layouts/FeedContainer';

export default function Home({
	posts,
	sortPosts,
	sortBy,
	viewPostComments,
	user,
}) {
	return (
		<Container>
			<FeedContainer
				posts={posts}
				sortPosts={sortPosts}
				sortBy={sortBy}
				displayFeedSort={true}
				viewPostComments={viewPostComments}
				user={user}
			></FeedContainer>
		</Container>
	);
}

Home.propTypes = {
	posts: PropTypes.array,
	sortBy: PropTypes.string,
	sortPosts: PropTypes.func,
	user: PropTypes.any,
	viewPostComments: PropTypes.func,
};
