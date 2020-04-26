import React from 'react';
import { GoArrowDown, GoArrowUp } from 'react-icons/go';
import styled from 'styled-components';
import { VoteArrowContainer, SVG, ActionButton } from './DisplayPost';

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
const Btn = styled(ActionButton)``;

const tempComment = {
	author: 'RookyNumbs',
	points: 4,
	body: '70-80%!?? 51% accuracy and you can become fabulously wealthy.',
	timestamp: Date.now(),
};

let tempComments = [];

for (let i = 0; i < 12; i++) {
	tempComments.push(tempComment);
}

export default function DisplayComments() {
	return (
		<Container>
			{tempComments.map((c, index) => {
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
								{c.author} {c.points} points - {c.timestamp} ago
							</CommentInfo>
							<CommentBody>{c.body}</CommentBody>
							<BtnContainer>
								<Btn>Comment</Btn>
								<Btn>Share</Btn>
							</BtnContainer>
						</ContentContainer>
					</Card>
				);
			})}
		</Container>
	);
}
