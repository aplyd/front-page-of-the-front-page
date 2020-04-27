import React from 'react';
import { GoArrowDown, GoArrowUp } from 'react-icons/go';
import styled from 'styled-components';
import { VoteArrowContainer, SVG, ActionButton } from './DisplayPost';
import { v4 as uuidv4 } from 'uuid';
import formatDistance from 'date-fns/formatDistance';

const Card = styled.div`
	display: grid;
	grid-template-columns: 40px 1fr;
	/* padding-left: ${(props) => {
		if (props.index > 0) {
			let val = props.index * 40;
			val = val.toString() + 'px';
			return val;
		}
	}}; */
`;

const ContentContainer = styled.div`
	grid-column: 2;
	position: relative;
`;

const CommentInfo = styled.p`
	font-size: 12px;
	margin-bottom: 8px;
	color: ${(props) => props.theme.colors.gray};
`;
const CommentBody = styled.p`
	margin-bottom: 38px;
`;

const BtnContainer = styled.div`
	position: absolute;
	bottom: 4px;
	left: 0;
`;
const Btn = styled(ActionButton)``;

//TODO - use parentIndex in the comment to see where the next comment exists. if parentIndex = 0, uh

export default function DisplayComments({
	comment: { username, points, timestamp, commentInput, id, replies },
	counter = ' - ',
}) {
	console.log(counter);
	return (
		<React.Fragment>
			<Card>
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
						<Btn>Reply</Btn>
						<Btn style={{ cursor: 'no-drop' }}>Share</Btn>
					</BtnContainer>
				</ContentContainer>
			</Card>
			{replies &&
				replies.map((reply) => {
					return (
						<DisplayComments
							comment={reply}
							key={uuidv4()}
							counter={counter + ' - '}
						/>
					);
				})}
		</React.Fragment>
	);
}
