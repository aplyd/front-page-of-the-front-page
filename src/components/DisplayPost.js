import React, { useContext } from 'react';
import { PostContext } from '../PostContext';
import styled from 'styled-components';
import { roundedGreyBorder } from '../GlobalStyle';
import { GoArrowDown, GoArrowUp } from 'react-icons/go';
import firebase from '../firebase';
import { Link } from 'react-router-dom';
import formatDistance from 'date-fns/formatDistance';

const Container = styled.div`
	width: 100%;
	${roundedGreyBorder}
	display: grid;
	grid-template-columns: 40px 1fr 154px;
	grid-template-rows: 1fr 32px;
	margin-bottom: 12px;
`;

export const VoteArrowContainer = styled.div`
	height: 100%;

	color: gray;
	grid-column: 1;
	&& > div {
		padding: 20px 0 0 8px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
`;

export const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	grid-column: 2;
	grid-row: 1;
`;

export const InfoContainer = styled.div`
	display: flex;
	flex-direction: row;
	padding: 8px 8px 4px 8px;
	grid-column: 3;
	&& > p {
		padding-right: 8px;
		color: gray;
		cursor: default;
		font-size: 12px;
	}
`;

export const Title = styled.h2`
	padding: 4px 8px 20px 8px;
	font-size: 20px;
	color: black;
`;

export const JoinContainer = styled.div`
	width: 140px;
	padding: 8px 8px 0 0;
`;

export const JoinBtn = styled.button`
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

export const LinkPreview = styled.div`
	width: 142px;
	height: 98px;
	background: lightgray;
	margin-top: 32px;
	background: white;
	border: 1px solid #0079d3;
	border-radius: 4px;
`;

export const ActionContainer = styled.div`
	display: flex;
	flex-direction: row;
	padding-left: 8px;
	border: none;
	grid-column: 2;
	grid-row: 2;
`;

//fix padding
export const ActionButton = styled.button`
	text-transform: capitalize;
	background: white;
	color: gray;
	font-size: 12px;
	border-radius: 4px;
	outline: none;
	border: none;
	margin: 0;
	&&:hover {
		cursor: pointer;
		background: lightgray;
	}
`;
const Comment = styled(ActionButton)``;
const Share = styled(ActionButton)`
	cursor: no-drop;
	&&:hover {
		cursor: no-drop;
	}
`;

export const Vote = styled.p`
	font-size: ${(props) => props.theme.font.size.xs};
	padding: 6px 0;
	cursor: default;
`;

export const SVG = styled.svg`
	&&:hover {
		color: ${(props) => props.theme.colors.red};
		background-color: ${(props) => props.theme.colors.lightGray};
		cursor: pointer;
	}
`;

const Pinned = styled.p`
	grid-column: 2;
	grid-row: 1;
	color: ${(props) => props.theme.colors.grey};
	font-size: 10px;
	text-transform: uppercase;
	padding: 6px 0 6px 8px;
`;

export default function DisplayPost({
	title,
	author,
	preview,
	vote,
	id,
	timestamp,
	pinned,
}) {
	const { setUpdatePosts } = useContext(PostContext);
	const url = title.replace(/\s+/g, '-').toLowerCase();

	//TODO - make sure user can only up/down vote once
	const castVote = (direction) => {
		let newVoteCount;

		direction === 'up'
			? (newVoteCount = vote + 1)
			: (newVoteCount = vote - 1);

		firebase
			.firestore()
			.collection('posts')
			.doc(id)
			.update({
				vote: newVoteCount,
			})
			.then(() => setUpdatePosts(Date.now()))
			.catch((err) => console.log(err));
	};

	return (
		<Container>
			<VoteArrowContainer>
				<div>
					<SVG as={GoArrowUp} onClick={() => castVote('up')} />
					<Vote>{vote}</Vote>
					<SVG as={GoArrowDown} onClick={() => castVote('down')} />
				</div>
			</VoteArrowContainer>

			<ContentContainer>
				{pinned ? <Pinned>Pinned by moderators</Pinned> : null}
				<InfoContainer>
					<p>Posted by {author} </p>
					<p>
						{formatDistance(Date.now(), timestamp, {
							includeSeconds: true,
						})}{' '}
						ago
					</p>
				</InfoContainer>

				<Title
					as={Link}
					to={{
						pathname: `/comments/${url}`,
						state: {
							id: id,
						},
					}}
					id={id}
				>
					{title}
				</Title>
			</ContentContainer>

			<ActionContainer pinned={pinned}>
				<Comment>comment</Comment>
				<Share>share</Share>
			</ActionContainer>

			<JoinContainer>
				<JoinBtn>+ Join</JoinBtn>
				<LinkPreview src={preview ? preview : null}></LinkPreview>
			</JoinContainer>
		</Container>
	);
}
