import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import DisplayPost from '../components/DisplayPost';

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
	const [postRange, setPostRange] = useState(10);
	const setOfPosts = [...posts].slice(0, postRange);
	const lastItem = useRef(null);

	//simulating pagination for now - to be updated when firestore orderBy() and limit() work
	useEffect(() => {
		const item = lastItem.current;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setPostRange(postRange + 10);
				}
			},
			{
				root: null,
				rootMargin: '0px',
				threshold: 1,
			}
		);
		if (item) {
			observer.observe(item);
		}
		return () => {
			if (item) {
				observer.unobserve(item);
			}
		};
	}, [lastItem, postRange]);

	const scrollOptions = {
		top: 0,
		left: 0,
		behavior: 'smooth',
	};

	return (
		<Container>
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
			<div ref={lastItem}></div>
		</Container>
	);
}
