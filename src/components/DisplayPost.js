import React, { useContext } from 'react';
import { PostContext } from '../PostContext';
import styled from 'styled-components';
import { roundedGreyBorder } from '../GlobalStyle';
import { GoArrowDown, GoArrowUp } from 'react-icons/go';
import firebase from '../firebase';
import { Link, useHistory } from 'react-router-dom';
import formatDistance from 'date-fns/formatDistance';
import { countReplies } from '../utils';
import { FaCommentAlt } from 'react-icons/fa';

const Container = styled.div`
	width: 100%;
	${roundedGreyBorder}
	display: grid;
	grid-template-columns: 40px 1fr;
	grid-template-rows: 1fr 32px;
	margin-bottom: 12px;
	cursor: pointer;
	:hover {
		border: solid 1px rgb(137, 137, 137);
	}
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

export const ActionButton = styled.button`
	text-transform: capitalize;
	background: white;
	color: gray;
	font-size: 12px;
	border-radius: 4px;
	outline: none;
	border: none;
	padding: 0 4px;
	margin-right: 8px;
	&&:hover {
		cursor: pointer;
		background: lightgray;
	}
`;
const Comment = styled(ActionButton)`
	vertical-align: middle;
`;
const Share = styled(ActionButton)`
	cursor: no-drop;
	&&:hover {
		cursor: no-drop;
	}
`;

export const Vote = styled.p`
	font-size: ${(props) => props.theme.font.size.xs};
	color: black;
	padding: 6px 0;
	cursor: default;
	font-weight: bold;
`;

export const SVG = styled.svg`
	&&:hover {
		color: ${(props) => props.theme.colors.red};
		background-color: ${(props) => props.theme.colors.lightGray};
		cursor: pointer;
	}
`;

const CommentSVG = styled.svg`
	position: relative;
	top: 2.5px;
	left: 0px;
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
	username,
	preview,
	vote,
	id,
	timestamp,
	pinned,
	post,
	viewPostComments,
}) {
	const { setUpdatePosts } = useContext(PostContext);
	const url = title.replace(/\s+/g, '-').toLowerCase();
	const commentCount = post ? countReplies(post) : null;
	const history = useHistory();

	//TODO - make sure user can only up/down vote once
	const castVote = (event, direction) => {
		event.stopPropagation();
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

	const handleClick = (event) => {
		viewPostComments(post.id);
		history.push(`/comments/${url}/${post.id}`);
	};

	return (
		<Container onClick={handleClick}>
			<VoteArrowContainer>
				<div>
					<SVG as={GoArrowUp} onClick={(e) => castVote(e, 'up')} />
					<Vote>{vote}</Vote>
					<SVG
						as={GoArrowDown}
						onClick={(e) => castVote(e, 'down')}
					/>
				</div>
			</VoteArrowContainer>

			<ContentContainer>
				{pinned ? <Pinned>Pinned by moderators</Pinned> : null}
				<InfoContainer>
					<p>Posted by {username}</p>
					<p>
						{formatDistance(Date.now(), timestamp, {
							includeSeconds: true,
						})}{' '}
						ago
					</p>
				</InfoContainer>

				<Title>{title}</Title>
			</ContentContainer>

			<ActionContainer pinned={pinned}>
				<Comment>
					<CommentSVG as={FaCommentAlt} />
					{'  ' + commentCount}{' '}
					{commentCount === 1 ? 'comment' : 'comments'}
				</Comment>
				<Share>share</Share>
			</ActionContainer>

			{/* <JoinContainer>
				<JoinBtn>+ Join</JoinBtn>
				<LinkPreview src={preview ? preview : null}></LinkPreview>
			</JoinContainer> */}
		</Container>
	);
}
