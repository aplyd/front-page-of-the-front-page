import React from 'react';
import styled from 'styled-components';
import DisplayPost from '../components/DisplayPost';

const Container = styled.div`
	grid-column: 1;
`;

export default function Feed({ redditData, posts, children }) {
	return (
		<Container>
			<DisplayPost
				title={'Welcome to the front page of the front page'}
				pinned={true}
				author={'Austin // aplyd'}
				timestamp={Date.now()}
				id={'pinned'}
			/>
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
							author={post.author}
						/>
					);
				})}
			{children}
		</Container>
	);
}
