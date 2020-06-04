import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
// import PostPreview from '../components/PostPreview';
import PreviewContent from '../components/PreviewContent';
import VoteContainer from '../components/VoteContainer';
import { roundedGreyBorder } from '../GlobalStyle';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
	grid-column: 1;
`;

const PreviewContainer = styled.div`
	width: 100%;
	min-height: 152px;
	${roundedGreyBorder}
	display: grid;
	grid-template-columns: 40px 1fr;
	grid-template-rows: 1fr 32px;
	margin-bottom: 12px;
	cursor: pointer;
	&&:hover {
		border: solid 1px rgb(137, 137, 137);
	}
`;

const BackToTopBtn = styled.button`
	background-color: ${(props) => props.theme.colors.blue};
	border-color: ${(props) => props.theme.colors.blue};
	color: white;
	border-radius: 4px;
	border: none;
	display: block;
	margin: 32px auto 24px auto;
	padding: 8px 16px;
	&&:hover {
		background-color: ${(props) => props.theme.colors.lightBlue};
	}
`;

const Feed = ({ posts, children, viewPostComments, postVotes }) => {
	// const [postRange, setPostRange] = useState(10);
	// const setOfPosts = [...posts].slice(0, postRange);
	// const lastItem = useRef(null);
	const history = useHistory();

	//simulating pagination for now - to be updated when firestore orderBy() and limit() work
	// useEffect(() => {
	// 	const item = lastItem.current;
	// 	const observer = new IntersectionObserver(
	// 		([entry]) => {
	// 			if (entry.isIntersecting) {
	// 				setPostRange(postRange + 10);
	// 			}
	// 		},
	// 		{
	// 			root: null,
	// 			rootMargin: '0px',
	// 			threshold: 1,
	// 		}
	// 	);
	// 	if (item) {
	// 		observer.observe(item);
	// 	}
	// 	return () => {
	// 		if (item) {
	// 			observer.unobserve(item);
	// 		}
	// 	};
	// }, [lastItem, postRange]);

	const handleClick = (id, url) => {
		viewPostComments(id);
		history.push(`/comments/${url}/${id}`);
	};

	return (
		<Container>
			{posts &&
				postVotes &&
				posts.map((post, index) => {
					const url = post.title.replace(/\W/g, '').toLowerCase();
					//using index in vote containes

					return (
						<PreviewContainer
							key={index}
							onClick={() => handleClick(post.id, url)}
						>
							<PreviewContent
								username={post.username}
								timestamp={post.timestamp}
								post={post}
							/>

							<VoteContainer
								vote={postVotes[index].vote}
								id={postVotes[index].id}
							/>
						</PreviewContainer>
					);
				})}

			{children}
			{/* {setOfPosts.length === posts.length && setOfPosts.length > 0 ? ( */}
			<BackToTopBtn
				onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
			>
				Back To Top
			</BackToTopBtn>
			{/* ) : null} */}
			{/* <div ref={lastItem}></div> */}
		</Container>
	);
};

export default Feed;
