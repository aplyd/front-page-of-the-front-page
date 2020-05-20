import React from 'react';
import styled from 'styled-components';
import DisplayPost from '../components/DisplayPost';
import { v4 as uuidv4 } from 'uuid';

const Container = styled.div`
	grid-column: 1;
`;

export default function Feed({ posts, children, viewPostComments }) {
	return (
		<Container>
			{/* to display a pinned post in the future 
			<DisplayPost
				title={'Welcome to the front page of the front page'}
				pinned={true}
				username={'Austin // aplyd'}
				timestamp={Date.now()}
				id={'pinned'}
			/> */}
			{posts &&
				posts.map((post) => {
					return (
						//using the Date.now because without it, im getting duplicate keys when sorting. fix later... hopefully
						<DisplayPost
							title={post.title}
							key={uuidv4()}
							id={post.id}
							vote={post.vote}
							timestamp={post.timestamp}
							username={post.username}
							post={post}
							viewPostComments={viewPostComments}
						/>
					);
				})}
			{children}
		</Container>
	);
}
