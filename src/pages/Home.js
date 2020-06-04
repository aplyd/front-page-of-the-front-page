import React from 'react';
import { Container } from '../App';
import FeedContainer from '../layouts/FeedContainer';

export default function Home({
	redditData,
	posts,
	sortPosts,
	sortBy,
	viewPostComments,
	user,
}) {
	return (
		<Container>
			<FeedContainer
				redditData={redditData}
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
