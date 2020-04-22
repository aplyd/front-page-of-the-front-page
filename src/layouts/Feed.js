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
					console.log(post.id);
					return (
						//using the Date.now because without it, im getting duplicate keys when sorting
						<DisplayPost
							title={post.title}
							key={post.id + Date.now()}
							id={post.id}
							vote={post.vote}
						/>
					);
				})}
		</Container>
	);
}
