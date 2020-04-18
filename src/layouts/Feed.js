import React from 'react';
import styled from 'styled-components';
import Post from '../components/Post';

const Container = styled.div`
	grid-column: 1;
`;

export default function Feed({ redditData, posts }) {
	console.log(posts);
	return (
		<Container>
			{posts &&
				posts.map((post) => {
					return (
						<Post
							title={post.title}
							// subreddit={post.data.subreddit_name_prefixed}
							// author={post.data.author}
							key={post.id}
							// url={post.data.url}
							// preview={
							// 	post.preview ? post.preview : null
							// }
						/>
					);
				})}
		</Container>
	);
}
