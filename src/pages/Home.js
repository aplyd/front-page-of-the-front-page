import React from 'react';
import { Container } from '../App';
import FeedContainer from '../layouts/FeedContainer';

export default function Home({ redditData, posts, sortPosts, sortBy }) {
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
