import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import FeedContainer from '../layouts/FeedContainer';
import { Container } from '../App';
import Feed from '../layouts/Feed';
import Sidebar from '../layouts/Sidebar';
// import { useWindowWidth } from '../hooks/useWindowWidth';
import { PostContext } from '../PostContext';

export default function Comments() {
	const [width, setWidth] = useState(window.innerWidth);
	// useWindowWidth(setWidth);
	const { postTitle } = useParams();
	const { posts } = useContext(PostContext);

	const tempComments = [];

	const tempPost = [
		{
			id: '32f0f5b6-c083-43a0-acfd-bf74a991e4c8',
			title: 'look long enough and the void looks at you',
			author: 'austin',
			vote: 23,
			timestamp: Date.now(),
			comments: tempComments,
		},
	];

	return (
		<Container>
			<FeedContainer posts={tempPost} displayFeedSort={false}>
				{/* {width > 960 ? <Sidebar /> : null} */}
				{/* <Feed posts={tempPost} displayFeedSort={false} /> */}
			</FeedContainer>
		</Container>
	);
}
