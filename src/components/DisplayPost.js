import React from 'react';
import styled from 'styled-components';
import { roundedGreyBorder } from '../GlobalStyle';

const Container = styled.div`
	width: 100%;
	${roundedGreyBorder}
	display: grid;
	grid-template-columns: 40px 1fr 154px;
	grid-template-rows: 1fr 32px;
	margin-bottom: 12px;
`;

const VoteArrowContainer = styled.div`
	height: 100%;

	color: gray;
	grid-column: 1;
	&& > div {
		padding: 20px 0 0 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
`;

const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	grid-column: 2;
`;

const InfoContainer = styled.div`
	display: flex;
	flex-direction: row;
	padding: 8px 8px 8px 30px;
	grid-column: 3;
	&& > p {
		padding-right: 8px;
		color: gray;
	}
`;

const Title = styled.h2`
	padding: 4px 8px 20px 30px;
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
	background: white;
	border: 1px solid #0079d3;
	border-radius: 4px;
`;

const ActionContainer = styled.div`
	display: flex;
	flex-direction: row;
	padding-left: 30px;
	border: none;
	grid-column: 2;
	grid-row: 2;
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

export default function DisplayPost({
	title,
	subreddit,
	author,
	preview,
	url,
}) {
	return (
		<Container>
			<VoteArrowContainer>
				{/* <VoteArrows></VoteArrows> */}
				<div>
					<p>^</p>
					<p>30.1k</p>
					<p>V</p>
				</div>
			</VoteArrowContainer>

			<ContentContainer>
				<InfoContainer>
					<p>{subreddit}</p>
					<p>•</p>
					<p>Posted by {author}</p>
					<p>awards</p>
				</InfoContainer>

				<Title>{title}</Title>
			</ContentContainer>

			<ActionContainer>
				<Comment>comment</Comment>
				<Share>share</Share>
				<Save>save</Save>
			</ActionContainer>

			<JoinContainer>
				<JoinBtn>+ Join</JoinBtn>
				<LinkPreview src={preview ? preview : null}></LinkPreview>
			</JoinContainer>
		</Container>
	);
}
