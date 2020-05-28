import React, { useContext, useState, useEffect } from 'react';
import { PostContext } from '../PostContext';
import styled from 'styled-components';
import { roundedGreyBorder } from '../GlobalStyle';
import { GoArrowDown, GoArrowUp } from 'react-icons/go';
import { useHistory } from 'react-router-dom';
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
	&&:hover {
		border: solid 1px rgb(137, 137, 137);
	}
`;

export const VoteArrowContainer = styled.div`
	height: 100%;
	color: gray;
	grid-column: 1;
	&& > div {
		padding: 10px 0 0 8px;
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
	color: ${(props) => {
		if (props.userVote === 'up') {
			return props.theme.colors.red;
		} else if (props.userVote === 'down') {
			return props.theme.colors.blue;
		} else {
			return 'black';
		}
	}};
	padding: 6px 0;
	cursor: default;
	font-weight: bold;
`;

export const SVG = styled.svg`
	border-radius: 4px;
	color: ${(props) => {
		if (props.direction === props.uservote) {
			return props.direction === 'up'
				? props.theme.colors.red
				: props.theme.colors.blue;
		}
	}};
	background-color: ${(props) =>
		props.direction === props.uservote
			? props.theme.colors.lightGray
			: null};
	&&:hover {
		color: ${(props) =>
			props.direction === 'up'
				? props.theme.colors.red
				: props.theme.colors.blue};
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
	vote,
	id,
	timestamp,
	pinned,
	post,
	viewPostComments,
	postType,
}) {
	const { user, castPostVote } = useContext(PostContext);
	const url = title.replace(/\W/g, '').toLowerCase(); //remove all non-alphanumeric characters
	const commentCount = post ? countReplies(post) : null;
	const history = useHistory();
	const [userVote, setUserVote] = useState(null);

	//checks through users votes to see if previously voted
	useEffect(() => {
		const checkForUserVote = () => {
			if (user.postVotes.hasOwnProperty(id)) {
				setUserVote(user.postVotes[id]);
			}
		};
		user.postVotes && checkForUserVote();
	}, [userVote, setUserVote, id, user.postVotes]);
	//maybe add post to dep array

	const handleClick = () => {
		viewPostComments(post.id);
		// history.push(`/comments/${url}/${post.id}`);
		history.push(`/comments/${url}/${post.id}`);
	};

	return (
		<Container onClick={handleClick}>
			<VoteArrowContainer>
				<div>
					<SVG
						as={GoArrowUp}
						onClick={(e) =>
							castPostVote(e, 'up', id, vote, setUserVote, 'home')
						}
						direction={'up'}
						uservote={userVote}
					/>
					<Vote userVote={userVote}>{vote}</Vote>
					<SVG
						as={GoArrowDown}
						onClick={(e) =>
							castPostVote(
								e,
								'down',
								id,
								vote,
								setUserVote,
								'home'
							)
						}
						direction={'down'}
						uservote={userVote}
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

			{/* {postType === 'link' ? (
				<JoinContainer>
					<JoinBtn>+ Join</JoinBtn>
					<LinkPreview
						src={post.preview ? post.preview : null}
					></LinkPreview>
				</JoinContainer>
			) : null} */}
		</Container>
	);
}
