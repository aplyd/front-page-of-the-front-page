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

	return (
		<Container>
			{posts &&
				setOfPosts.map((post, index) => {
					//display different components based on the post type
					return (
						<DisplayPost
							postType={post.postType}
							title={post.title}
							media={post.media ? post.media : null}
							link={post.link ? post.link : null}
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
				<BackToTopBtn
					onClick={() =>
						window.scrollTo({ top: 0, behavior: 'smooth' })
					}
				>
					Back To Top
				</BackToTopBtn>
			) : null}
			<div ref={lastItem}></div>
		</Container>
	);
}
