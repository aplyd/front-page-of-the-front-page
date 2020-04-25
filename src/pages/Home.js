import React, { useContext } from 'react';
import { Container } from '../App';
import FeedContainer from '../layouts/FeedContainer';
import { PostContext } from '../PostContext';

export default function Home({ redditData, posts, sortPosts, sortBy }) {
	const { user } = useContext(PostContext); //?

	return (
		<Container>
			<FeedContainer
				redditData={redditData}
				posts={posts}
				sortPosts={sortPosts}
				sortBy={sortBy}
				displayFeedSort={true}
			></FeedContainer>
		</Container>
	);
}
