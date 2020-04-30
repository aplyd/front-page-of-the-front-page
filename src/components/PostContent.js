import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { GoArrowDown, GoArrowUp } from 'react-icons/go';
import { roundedGreyBorder } from '../GlobalStyle';
import formatDistance from 'date-fns/formatDistance';
import DisplayComments from './DisplayComments';
import useInitialFocus from '../hooks/useInitialFocus';
import { Comment } from '../utils';
import { PostContext } from '../PostContext';
import firebase from '../firebase';
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
import { v4 as uuidv4 } from 'uuid';

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

const Body = styled.p`
	padding: 4px 64px 8px 8px;
`;

const CommentInputContainer = styled.div`
	grid-column: 2;
	margin-right: 64px;
	margin-top: 16px;
	padding-left: 8px;
`;

const CommentAsDisplayName = styled.p`
	font-size: 12px;
	padding-top: 8px;
`;

export const CommentTextAreaContainer = styled.div`
	margin-top: 4px;
	padding-left: 8px;
	border-radius: 4px;
	&&:hover {
		border: solid 0.5px black;
	}
	border: solid 0.5px black;
	position: relative;
`;

export const CommentTextArea = styled.textarea`
	width: 100%;
	font-size: 14px;
	min-height: 86px;
	padding: 16px 0 0 16px;
	margin-bottom: 34px;
	max-width: 95%;
	outline: none;
	border: none;
	&&:hover {
		/* TODO try to style comment div with this is focused ???? */
	}
`;

export const CommentBtn = styled.button`
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
	padding-left: 8px;
	margin-bottom: 48px;
	&& > p {
		font-size: 12px;
		text-transform: uppercase;
		color: ${(props) => props.theme.colors.gray};
	}
`;

const CommentContainer = styled.div`
	grid-column: 1 / 3;
`;

export default function PostContent({ post, user }) {
	const [commentInput, setCommentInput] = useState();

	const submitTopLevelComment = () => {
		const { username } = user;
		let newComment = Comment({ commentInput, username });
		firebase
			.firestore()
			.collection('posts')
			.doc(post.id)
			.update({
				replies: [...post.replies, newComment],
			})
			.catch((err) => console.log(err));
	};

	return (
		<Container>
			<VoteArrowContainer>
				<div>
					{/* <SVG as={GoArrowUp} onClick={() => castVote('up')} /> */}
					<SVG as={GoArrowUp} />
					{/* <Vote>{post.vote}</Vote> */}
					<SVG as={GoArrowDown} />
					{/* <SVG as={GoArrowDown} onClick={() => castVote('down')} /> */}
				</div>
			</VoteArrowContainer>

			<ContentContainer>
				<InfoContainer>
					<p>Posted by {post.username}</p>
					<p>
						{post.timestamp
							? formatDistance(Date.now(), post.timestamp, {
									includeSeconds: true,
							  })
							: null}{' '}
						ago
					</p>
				</InfoContainer>
				<Title>{post.title}</Title>
				<Body>{post.postText}</Body>
			</ContentContainer>

			<ActionContainer>
				<CommentAction>
					{post.replies.length}{' '}
					{post.replies.length > 1 ? 'comments' : 'comment'}
				</CommentAction>
				<Share>share</Share>
			</ActionContainer>

			{user.isSignedIn ? (
				<CommentInputContainer>
					<CommentAsDisplayName>
						Comment as displayName
					</CommentAsDisplayName>
					<CommentTextAreaContainer>
						<CommentTextArea
							placeholder="What are your thoughts?"
							value={commentInput}
							onChange={(e) => setCommentInput(e.target.value)}
						></CommentTextArea>
						<CommentBtn
							type="button"
							onClick={submitTopLevelComment}
						>
							comment
						</CommentBtn>
					</CommentTextAreaContainer>
				</CommentInputContainer>
			) : null}

			<SortByContainer>
				<p>sort by</p>
				{/* TODO*/}
			</SortByContainer>

			<CommentContainer>
				{post.replies.map((comment, index) => {
					return (
						<DisplayComments
							comment={comment}
							key={uuidv4()}
							post={post}
							user={user}
						/>
					);
				})}
			</CommentContainer>
		</Container>
	);
}
