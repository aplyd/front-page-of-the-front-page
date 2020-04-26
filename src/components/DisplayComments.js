import React from 'react';
import { GoArrowDown, GoArrowUp } from 'react-icons/go';
import styled from 'styled-components';
import { VoteArrowContainer, SVG, ActionButton } from './DisplayPost';
import formatDistance from 'date-fns/formatDistance';

const Container = styled.div`
	grid-column: 1 / 3;
`;

const Card = styled.div`
	display: grid;
	grid-template-columns: 40px 1fr;
	padding-left: ${(props) => {
		if (props.index > 0) {
			let val = props.index * 40;
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
const Btn = styled(ActionButton)`
	cursor: default;
`;

//TODO - use parentIndex in the comment to see where the next comment exists. if parentIndex = 0, uh

export default function DisplayComments({ comments }) {
	return (
		<Container>
			{comments &&
				comments.map((comment, index) => {
					return (
						<Card index={index} key={index}>
							<VoteArrowContainer>
								<div>
									<SVG as={GoArrowUp}></SVG>
									<SVG as={GoArrowDown}></SVG>
								</div>
							</VoteArrowContainer>
							<ContentContainer>
								<CommentInfo>
									{comment.username} {comment.points} points -{' '}
									{formatDistance(
										Date.now(),
										comment.timestamp
									)}{' '}
									ago
								</CommentInfo>
								<CommentBody>
									{comment.commentInput}
								</CommentBody>
								<BtnContainer>
									<Btn>Reply</Btn>
									<Btn>Share</Btn>
								</BtnContainer>
							</ContentContainer>
						</Card>
					);
				})}
		</Container>
	);
}
