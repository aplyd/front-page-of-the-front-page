import React from 'react';
import { GoArrowDown, GoArrowUp } from 'react-icons/go';
import styled from 'styled-components';
import { VoteArrowContainer, SVG, ActionButton } from './DisplayPost';
import { v4 as uuidv4 } from 'uuid';
import firebase from '../firebase';
import formatDistance from 'date-fns/formatDistance';

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
`;

const BtnContainer = styled.div`
	position: absolute;
	bottom: 4px;
	left: 8px;
`;
const Btn = styled(ActionButton)``;

//TODO - use parentIndex in the comment to see where the next comment exists. if parentIndex = 0, uh

export default function DisplayComments({
	comment: { username, points, timestamp, commentInput, id, replies, depth },
	post,
}) {
	const openReplyInput = (target) => {
		if (window.user) {
			console.log(target);
		}
	};

	const submitReply = () => {
		let newComment = Comment({ commentInput, username });
		firebase
			.firestore()
			.collection('posts')
			.doc(id)
			.update({
				comments: [...post.comments, newComment],
			})
			.catch((err) => console.log(err));
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
						{/* WORKING HERE TO GET BOTH ID AND DEPTH ON REPLY ELEMENT */}
						<Btn
							data-reply-info={depth && id}
							onClick={(e) => openReplyInput(e.target)}
						>
							Reply
						</Btn>
						<Btn style={{ cursor: 'no-drop' }}>Share</Btn>
					</BtnContainer>
				</ContentContainer>
			</Card>
			{/* recursively rendering to display unknown amount of replies */}
			{replies &&
				replies.map((reply) => {
					return <DisplayComments comment={reply} key={uuidv4()} />;
				})}
		</React.Fragment>
	);
}
