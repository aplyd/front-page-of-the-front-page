import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	width: 100%;
	background: white;
	border: 1px solid lightgray;
	border-radius: 4px;
	display: flex;
	flex-direction: row;
	margin-bottom: 10px;
`;

const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const VoteArrowContainer = styled.div`
	padding: 8px 4px 8px 4px;
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 32px;
	align-items: center;
	color: gray;
`;

const InfoContainer = styled.div`
	display: flex;
	flex-direction: row;
	padding: 8px 8px 8px 40px;
	&& > p {
		padding-right: 8px;
		color: gray;
	}
`;

const Title = styled.h2`
	padding: 0 8px 20px 40px;
	font-size: 20px;
`;

const JoinContainer = styled.div`
	width: 140px;
	padding: 8px 8px 0 0;
`;

const JoinBtn = styled.button`
	padding: 3px 12px;
	font-size: 12px;
	text-align: center;
	text-transform: uppercase;
	color: white;
	background-color: #0079d3;
	border: 1px solid white;
	border-radius: 4px;
	margin-bottom: 8px;
	float: right;
`;

const LinkPreview = styled.div`
	width: 142px;
	height: 98px;
	background: lightgray;
	margin-top: 32px;
`;

const ActionContainer = styled.div`
	display: flex;
	flex-direction: row;
	padding-left: 40px;
	border: none;
`;

const ActionButton = styled.button`
	background: white;
	color: gray;
	font-size: 12px;
	border-radius: 4px;
	outline: none;
	border: none;
	&&:hover {
		cursor: pointer;
		background: lightgray;
	}
`;
const Comment = styled(ActionButton)``;
const Share = styled(ActionButton)``;
const Save = styled(ActionButton)``;

export default function Post({ title, subreddit, author, id, url }) {
	return (
		<Container>
			<VoteArrowContainer>
				{/* <VoteArrows></VoteArrows> */}
				<p>^</p>
				<p>30.1k</p>
				<p>V</p>
			</VoteArrowContainer>

			<ContentContainer>
				<InfoContainer>
					<p>{subreddit}</p>
					<p>•</p>
					<p>Posted by {author}</p>
					<p>awards</p>
				</InfoContainer>

				<Title>{title}</Title>

				<ActionContainer>
					<Comment>comment</Comment>
					<Share>share</Share>
					<Save>save</Save>
				</ActionContainer>
			</ContentContainer>

			<JoinContainer>
				<JoinBtn>+ Join</JoinBtn>
				<LinkPreview></LinkPreview>
			</JoinContainer>
		</Container>
	);
}
