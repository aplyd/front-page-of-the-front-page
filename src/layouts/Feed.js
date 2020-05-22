import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DisplayPost from '../components/DisplayPost';
import { v4 as uuidv4 } from 'uuid';

const Container = styled.div`
	grid-column: 1;
`;

const BackToTopBtn = styled.button`
	background-color: ${(props) => props.theme.colors.blue};
	color: white;
	border-radius: 4px;
	outline: none;
	display: block;
	margin: 32px auto 24px auto;
	padding: 8px 16px;
	&&:hover {
		background-color: ${(props) => props.theme.colors.lightBlue};
	}
`;

export default function Feed({ posts, children, viewPostComments }) {
	const [postRange, setPostRange] = useState(4);
	const setOfPosts = [...posts].slice(0, postRange);

	const loadMorePosts = () => {
		setPostRange(postRange + 4);
	};

	const scrollOptions = {
		top: 0,
		left: 0,
		behavior: 'smooth',
	};

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
			<button type="button" onClick={() => loadMorePosts()}>
				paginate me
			</button>
			{posts &&
				setOfPosts.map((post, index) => {
					return (
						<DisplayPost
							title={post.title}
							key={index + post.title}
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
			{setOfPosts.length === posts.length && setOfPosts.length > 0 ? (
				<BackToTopBtn onClick={() => window.scroll(scrollOptions)}>
					Back To Top
				</BackToTopBtn>
			) : null}
		</Container>
	);
}
