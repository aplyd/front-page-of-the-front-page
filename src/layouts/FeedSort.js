import React from 'react';
import styled from 'styled-components';
import { roundedGreyBorder } from '../GlobalStyle';

//TODO - conditionally render styles based on input checked
const Container = styled.div`
	grid-column: 1;
	height: 54px;
	${roundedGreyBorder}
`;

const HiddenInput = styled.input`
	display: none;
`;

const Label = styled.label`
	color: ${(props) =>
		props.sortBy === props.children[1].props.value
			? props.theme.colors.blue
			: null};
	&:hover {
		color: ${(props) => props.theme.colors.blue};
		cursor: pointer;
	}
`;

const NewLabel = styled(Label)``;
const OldLabel = styled(Label)``;
const TopLabel = styled(Label)``;

export default function FeedSort({ sortPosts, sortBy }) {
	return (
		<Container>
			<div onChange={(e) => sortPosts(e.target.value)}>
				<NewLabel sortBy={sortBy}>
					new
					<HiddenInput type="radio" name="sort" value="TIME_ASC" />
				</NewLabel>
				<OldLabel sortBy={sortBy}>
					old
					<HiddenInput type="radio" name="sort" value="TIME_DESC" />
				</OldLabel>
				<TopLabel sortBy={sortBy}>
					top
					<HiddenInput type="radio" name="sort" value="VOTE_ASC" />
				</TopLabel>
			</div>
		</Container>
	);
}
