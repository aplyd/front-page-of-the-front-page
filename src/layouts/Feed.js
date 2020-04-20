import React from 'react';
import styled from 'styled-components';
import DisplayPost from '../components/DisplayPost';

const Container = styled.div`
	grid-column: 1;
`;

export default function Feed({ redditData, posts }) {
	return (
		<Container>
			{posts &&
				posts.map((post) => {
					return (
						<DisplayPost
							title={post.title}
							// subreddit={post.data.subreddit_name_prefixed}
							// author={post.data.author}
							key={post.id}
							id={post.id}
							vote={post.vote}
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
