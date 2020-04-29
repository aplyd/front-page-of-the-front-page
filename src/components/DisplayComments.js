import React, { useState } from 'react';
import { GoArrowDown, GoArrowUp } from 'react-icons/go';
import styled from 'styled-components';
import { VoteArrowContainer, SVG, ActionButton } from './DisplayPost';
import { v4 as uuidv4 } from 'uuid';
import { getReplyObject } from '../utils';
import firebase from '../firebase';
import formatDistance from 'date-fns/formatDistance';
import {
	CommentInputContainer,
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

export default function DisplayComments({
	comment: { username, points, timestamp, commentInput, id, replies, depth },
	post,
	user,
	topLevelCommentIndex,
}) {
	const [replyInput, setReplyInput] = useState();
	const [isReplyContainerOpen, setIsReplyContainerOpen] = useState(false);

	const openReplyInput = () => {
		if (user.isSignedIn) {
			setIsReplyContainerOpen(true);
			let allComments = post.comments;

			let foundObj = getReplyObject(allComments, id);
			console.log(foundObj);
		}
	};

	const submitReply = () => {
		let newComment = Comment({ commentInput, username });
		//stuck here, how do i locate where the commment will be placed when the depth will be unknown
		let allComments = post.comments;

		console.log(allComments);

		// firebase
		// 	.firestore()
		// 	.collection('posts')
		// 	.doc(id)
		// 	.update({
		// 		comments:
		// 	})
		// 	.catch((err) => console.log(err));
	};

	const displayReplyContainer = () => {
		if (user.isSignedIn) {
			return (
				<ReplyInputContainer depth={depth}>
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
			<Card depth={depth}>
				<VoteArrowContainer>
					<div>
						<SVG as={GoArrowUp}></SVG>
						<SVG as={GoArrowDown}></SVG>
					</div>
				</VoteArrowContainer>
				<ContentContainer>
					<CommentInfo>
						{/*TODO style comment.username black*/}
						{username} {points} points -{' '}
						{/* {formatDistance(Date.now(), timestamp)} ago */}
					</CommentInfo>
					<CommentBody>{commentInput}</CommentBody>
					<BtnContainer>
						<Btn
							data-depth={depth}
							data-username={points}
							onClick={(e) => openReplyInput(e.target)}
						>
							Reply
						</Btn>
						<Btn style={{ cursor: 'no-drop' }}>Share</Btn>
					</BtnContainer>
				</ContentContainer>
			</Card>
			{isReplyContainerOpen ? displayReplyContainer() : null}

			{/* recursively rendering to display unknown amount of replies */}
			{replies &&
				replies.map((reply) => {
					return <DisplayComments comment={reply} key={uuidv4()} />;
				})}
		</React.Fragment>
	);
}
