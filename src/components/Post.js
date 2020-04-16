import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	width: 100%;
	background: white;
	border: 1px solid lightgray;
	border-radius: 4px;
	display: flex;
	flex-direction: row;
`;

const VoteArrowContainer = styled.div`
	padding: 8px 4px 8px 0;
	display: flex;
	flex-direction: column;
	top: 0;
	left: 0;
	background: red;
	height: 100%;
	width: 32px;
`;

const Info = styled.div`
	display: flex;
	flex-direction: row;
`;

export default function Post() {
	return (
		<Container>
			<VoteArrowContainer>
				{/* <VoteArrows></VoteArrows> */}
			</VoteArrowContainer>

			<Info>
				<h4>slash r subreddit</h4>
				<p>•</p>
				<p>Posted by username</p>
			</Info>
		</Container>
	);
}
