import React from 'react';
import styled from 'styled-components';
import { GoArrowDown, GoArrowUp } from 'react-icons/go';
import { roundedGreyBorder } from '../GlobalStyle';
import formatDistance from 'date-fns/formatDistance';
import DisplayComments from './DisplayComments';
import {
	VoteArrowContainer,
	SVG,
	ContentContainer,
	InfoContainer,
	Title,
	ActionContainer,
	ActionButton,
	Vote,
} from './DisplayPost';

const Container = styled.div`
	width: 100%;
	${roundedGreyBorder}
	display: grid;
	grid-template-columns: 40px 1fr;
	grid-template-rows: 1fr 32px;
	margin-bottom: 12px;
`;

const CommentAction = styled(ActionButton)``;
const Share = styled(ActionButton)``;
const Save = styled(ActionButton)``;

const Body = styled.p`
	padding: 4px 64px 8px 8px;
`;

const CommentInputContainer = styled.div`
	grid-column: 2;
	margin-right: 64px;
	margin-top: 16px;
`;

const CommentAsDisplayName = styled.p`
	font-size: 12px;
	padding-top: 8px;
`;

const CommentTextAreaContainer = styled.div`
	margin-top: 4px;
	padding-left: 8px;
	border-radius: 4px;
	&&:hover {
		border: solid 0.5px black;
	}
	border: solid 0.5px black;
	position: relative;
`;

const CommentTextArea = styled.textarea`
	width: 100%;
	font-size: 14px;
	min-height: 86px;
	padding: 16px 0 0 16px;
	margin-bottom: 34px;
	max-width: 95%;
	outline: none;
	border: none;
	&&:hover {
		/* try to style comment div with this is focused ???? */
	}
`;

const CommentBtn = styled.button`
	position: absolute;
	bottom: 8px;
	right: 8px;
	color: white;
	padding: 6px 18px;
	background: ${(props) => props.theme.colors.blue};
	text-transform: uppercase;
	&&:hover {
		background: ${(props) => props.theme.colors.lightBlue};
	}
`;

const SortByContainer = styled.div`
	grid-column: 2;
	margin-top: 24px;
	margin-bottom: 48px;
	&& > p {
		font-size: 12px;
		text-transform: uppercase;
		color: ${(props) => props.theme.colors.gray};
	}
`;

export default function PostContent({ post }) {
	const { vote, author, title, postText, timestamp } = post[0];

	const displayComments = () => {};

	console.log(post);
	return (
		<Container>
			<VoteArrowContainer>
				<div>
					{/* <SVG as={GoArrowUp} onClick={() => castVote('up')} /> */}
					<SVG as={GoArrowUp} />
					<Vote>{vote}</Vote>
					<SVG as={GoArrowDown} />
					{/* <SVG as={GoArrowDown} onClick={() => castVote('down')} /> */}
				</div>
			</VoteArrowContainer>

			<ContentContainer>
				<InfoContainer>
					<p>Posted by {author}</p>
					<p>
						{formatDistance(Date.now(), timestamp, {
							includeSeconds: true,
						})}{' '}
						ago
					</p>
				</InfoContainer>

				<Title>{title}</Title>
				<Body>{postText}</Body>
			</ContentContainer>

			<ActionContainer>
				<CommentAction>comment</CommentAction>
				<Share>share</Share>
			</ActionContainer>
			{/* show/hide below component when user is logged in */}
			<CommentInputContainer>
				<CommentAsDisplayName>
					Comment as displayName
				</CommentAsDisplayName>
				<CommentTextAreaContainer>
					<CommentTextArea placeholder="What are your thoughts?"></CommentTextArea>
					<CommentBtn>comment</CommentBtn>
				</CommentTextAreaContainer>
			</CommentInputContainer>
			<SortByContainer>
				<p>sort by</p>
				{/* TODO*/}
			</SortByContainer>
			<DisplayComments />
		</Container>
	);
}
