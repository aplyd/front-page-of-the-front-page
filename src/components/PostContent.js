import React from 'react';
import styled from 'styled-components';
import { GoArrowDown, GoArrowUp } from 'react-icons/go';
import { roundedGreyBorder } from '../GlobalStyle';
import formatDistance from 'date-fns/formatDistance';
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

const Comment = styled(ActionButton)``;
const Share = styled(ActionButton)``;
const Save = styled(ActionButton)``;

const Body = styled.p`
	padding: 4px 16px;
`;

export default function PostContent({ post }) {
	const { vote, author, title, postText, timestamp } = post[0];

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
					<p>front page</p>
					<p>•</p>
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
				<Comment>comment</Comment>
				<Share>share</Share>
				<Save>save</Save>
			</ActionContainer>
		</Container>
	);
}
