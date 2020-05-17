import React, { useState, useEffect } from 'react';
import { GoArrowDown, GoArrowUp } from 'react-icons/go';
import styled from 'styled-components';
import { VoteArrowContainer, ActionButton } from './DisplayPost';
import { SVGarrow } from './PostContent';
import { v4 as uuidv4 } from 'uuid';
import {
	insertReply,
	Comment,
	setCommentAsDeleted,
	getNewVoteCount,
	withNewCommentVote,
} from '../utils';
import firebase from '../firebase';
import formatDistance from 'date-fns/formatDistance';
import {
	CommentTextAreaContainer,
	CommentTextArea,
	CommentBtn,
} from './PostContent';

const Card = styled.div`
	display: grid;
	grid-template-columns: 40px 1fr;
	margin: 16px 16px 16px 0;
	padding-left: ${(props) => {
		if (props.depth > 0) {
			let val = props.depth * 28;
			val = val.toString() + 'px';
			return val;
		}
	}};
`;

const ContentContainer = styled.div`
	grid-column: 2;
	position: relative;
`;

const CommentInfo = styled.p`
	font-size: 12px;
	margin-bottom: 4px;
	padding-left: 8px;
	color: ${(props) => props.theme.colors.gray};
`;
const CommentBody = styled.p`
	margin-bottom: 32px;
	padding-left: 8px;
	padding-right: 48px;
`;

const BtnContainer = styled.div`
	position: absolute;
	bottom: 4px;
	left: 8px;
`;
const Btn = styled(ActionButton)``;

const ReplyInputContainer = styled.div`
	grid-column: 2;
	margin-right: 64px;
	margin-top: 16px;
	padding-left: ${(props) => {
		let val = props.depth * 28 + 76;
		val = val.toString() + 'px';
		return val;
	}};
`;

const CancelBtn = styled.button`
	position: absolute;
	bottom: 8px;
	right: 116px;
	color: ${(props) => props.theme.colors.blue};
	padding: 6px 18px;
	background: white;
	text-transform: uppercase;
	outline: none;
	border: none;
	&&:hover {
		color: ${(props) => props.theme.colors.lightBlue};
	}
`;

const Vote = styled.p`
	font-size: ${(props) => props.theme.font.size.xs};
	color: black;
	padding: 6px 0;
	cursor: default;
	font-weight: bold;
`;

export default function DisplayComments({
	comment,
	post,
	user,
	viewPostComments,
	setModalContent,
	setPostData,
	setUser,
}) {
	const [replyInput, setReplyInput] = useState();
	const [isReplyContainerOpen, setIsReplyContainerOpen] = useState(false);
	const [userVote, setUserVote] = useState(null);

	useEffect(() => {
		const checkForUserVote = () => {
			if (user.commentVotes.hasOwnProperty(comment.id)) {
				setUserVote(user.commentVotes[comment.id]);
			}
		};
		user.commentVotes && checkForUserVote();
	}, [userVote, setUserVote, comment.id, user.commentVotes]);

	const submitReply = () => {
		const depth = comment.depth + 1;
		const commentInput = replyInput;
		const username = user.username;
		const newComment = Comment({ commentInput, username, depth });
		//insert reply function finds the correct id and adds the new comment to its replies
		const withNewReply = insertReply(post, comment.id, newComment);

		firebase
			.firestore()
			.collection('posts')
			.doc(post.id)
			.update({ replies: withNewReply })
			.then(() => viewPostComments(post.id))
			.catch((err) => console.log(err));
	};

	const deleteComment = () => {
		const withDeleted = setCommentAsDeleted(post, comment.id);

		firebase
			.firestore()
			.collection('posts')
			.doc(post.id)
			.update({ replies: withDeleted })
			.then(() => viewPostComments(post.id))
			.catch((err) => console.log(err));
	};

	const castCommentVote = (e, direction) => {
		e.stopPropagation();

		if (user.isSignedIn) {
			let newVoteCount;

			if (user.commentVotes[comment.id] === direction) {
				//do nothing - this block is to filter out double votes
			} else {
				if (user.commentVotes[comment.id] === 'up') {
					//this block is to vote down after previously voting up
					newVoteCount = comment.points - 2;
				} else if (user.commentVotes[comment.id] === 'down') {
					//this block is to vote up after previously voting down
					newVoteCount = comment.points + 2;
				} else {
					//this block gets the direction for first vote
					direction === 'up'
						? (newVoteCount = comment.points + 1)
						: (newVoteCount = comment.points - 1);
				}
				//update post state object
				const updated = withNewCommentVote(
					{ ...post },
					comment.id,
					newVoteCount
				);
				setPostData(updated);

				//update user state object
				const newUserVotes = { ...user.commentVotes };
				newUserVotes[comment.id] = direction;
				setUser({ ...user, commentVotes: newUserVotes });
				setUserVote(direction);

				//persist to firebase
				firebase
					.firestore()
					.collection('posts')
					.doc(post.id)
					.update({ replies: updated.replies })
					.catch((err) => console.log(err));

				firebase
					.firestore()
					.collection('users')
					.doc(user.uid)
					.update({ commentVotes: newUserVotes })
					.catch((err) => console.log(err));
			}
		} else {
			setModalContent('signup');
		}
	};

	const displayReplyContainer = () => {
		if (user.isSignedIn) {
			return (
				<ReplyInputContainer depth={comment.depth}>
					<CommentTextAreaContainer>
						<CommentTextArea
							placeholder="What are your thoughts?"
							value={replyInput}
							onChange={(e) => setReplyInput(e.target.value)}
						></CommentTextArea>
						<CancelBtn
							type="button"
							onClick={() => setIsReplyContainerOpen(false)}
						>
							cancel
						</CancelBtn>
						<CommentBtn
							type="button"
							onClick={submitReply}
							isSignedIn={user}
						>
							comment
						</CommentBtn>
					</CommentTextAreaContainer>
				</ReplyInputContainer>
			);
		} else {
			return null;
		}
	};

	return (
		<React.Fragment>
			<Card depth={comment.depth}>
				<VoteArrowContainer>
					<div>
						<SVGarrow
							as={GoArrowUp}
							onClick={(e) => castCommentVote(e, 'up')}
							direction="up"
							uservote={userVote}
						></SVGarrow>
						<Vote>{comment.points}</Vote>
						<SVGarrow
							as={GoArrowDown}
							onClick={(e) => castCommentVote(e, 'down')}
							direction="down"
							uservote={userVote}
						></SVGarrow>
					</div>
				</VoteArrowContainer>
				<ContentContainer>
					<CommentInfo>
						{comment.deleted ? '[deleted]' : comment.username}{' '}
						{comment.points}{' '}
						{comment.points === 1 ? 'point' : 'points'} •{' '}
						{formatDistance(Date.now(), comment.timestamp)} ago
					</CommentInfo>
					<CommentBody>
						{comment.deleted ? '[deleted]' : comment.commentInput}
					</CommentBody>
					<BtnContainer>
						<Btn onClick={(e) => setIsReplyContainerOpen(true)}>
							Reply
						</Btn>
						<Btn style={{ cursor: 'no-drop' }}>Share</Btn>
						{user.username === comment.username ? (
							<Btn onClick={() => deleteComment()}>Delete</Btn>
						) : null}
					</BtnContainer>
				</ContentContainer>
			</Card>
			{isReplyContainerOpen ? displayReplyContainer() : null}

			{/* recursively rendering to display unknown amount of replies */}
			{comment.replies &&
				comment.replies.map((reply) => {
					return (
						<DisplayComments
							comment={reply}
							key={uuidv4()}
							post={post}
							user={user}
							viewPostComments={viewPostComments}
							setModalContent={setModalContent}
							setPostData={setPostData}
							setUser={setUser}
						/>
					);
				})}
		</React.Fragment>
	);
}
