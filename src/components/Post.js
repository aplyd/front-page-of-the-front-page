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
	padding: 0 0 20px 40px;
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

export default function Post() {
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
					<p>slash r subreddit</p>
					<p>•</p>
					<p>Posted by username</p>
					<p>awards</p>
				</InfoContainer>

				<Title>
					TIL of the unofficial Russian book The Last Ringbearer which
					describes The Lord of the Rings trilogy from Sauron's point
					of view and portrays Mordor as the good guys
				</Title>

				<ActionContainer>
					<Comment>comment</Comment>
					<Share>share</Share>
					<Save>save</Save>
				</ActionContainer>
			</ContentContainer>

			<JoinContainer>
				<JoinBtn>+ Join</JoinBtn>
			</JoinContainer>
		</Container>
	);
}
