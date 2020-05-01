import React from 'react';
import { Container } from '../App';
import styled from 'styled-components';
import { roundedGreyBorder } from '../GlobalStyle';
import FeedContainer from '../layouts/FeedContainer';
import CreatePost from '../components/CreatePost';
import Feed from '../layouts/Feed';

const CreatePostContainer = styled.div`
	${roundedGreyBorder};
	grid-row: 1;
`;

const CreateAPost = styled.h3``;

const WhiteLine = styled.div`
	border-radius: 4px;
	background: white;
	height: 1px;
	margin-top: 4px;
	margin-bottom: 16px;
`;

const PostP = styled.p`
	color: ${(props) => props.theme.colors.blue};
	padding: 24px 0 12px 56px;
`;

const BlueLine = styled.div`
	background-color: ${(props) => props.theme.colors.blue};
	height: 2px;
	width: 25%;
`;

export default function Submit({ setUpdatePosts }) {
	return (
		<Container>
			<FeedContainer displayFeedSort={false}>
				<div>
					<CreateAPost>Create a post</CreateAPost>
					<WhiteLine></WhiteLine>
					<CreatePostContainer>
						<PostP>Post</PostP>
						<BlueLine></BlueLine>
						<CreatePost setUpdatePosts={setUpdatePosts} />
					</CreatePostContainer>
				</div>
			</FeedContainer>
		</Container>
	);
}
