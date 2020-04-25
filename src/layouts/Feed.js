import React from 'react';
import styled from 'styled-components';
import DisplayPost from '../components/DisplayPost';

const Container = styled.div`
	grid-column: 1;
`;

export default function Feed({ redditData, posts, children }) {
	console.log(posts);
	return (
		<Container>
			{posts &&
				posts.map((post) => {
					return (
						//using the Date.now because without it, im getting duplicate keys when sorting. fix later?
						<DisplayPost
							title={post.title}
							key={post.id + Date.now()}
							id={post.id}
							vote={post.vote}
							timestamp={post.timestamp}
						/>
					);
				})}
			{children}
		</Container>
	);
}
