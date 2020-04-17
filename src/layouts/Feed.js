import React from 'react';
import styled from 'styled-components';
import Post from '../components/Post';

const Container = styled.div`
	grid-column: 1;
`;

export default function Feed({ data }) {
	return (
		<Container>
			{data &&
				data.map((post) => {
					return (
						<Post
							title={post.data.title}
							subreddit={post.data.subreddit_name_prefixed}
							author={post.data.author}
							key={post.data.id}
							url={post.data.url}
						/>
					);
				})}
		</Container>
	);
}
