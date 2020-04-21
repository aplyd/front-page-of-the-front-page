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
	color: ${(props) => props.theme.colors.gray};
	&:hover {
		color: ${(props) => props.theme.colors.blue};
		cursor: pointer;
	}
`;

const NewLabel = styled(Label)``;
const OldLabel = styled(Label)``;
const TopLabel = styled(Label)``;

export default function FeedSort({ sortPosts }) {
	return (
		<Container>
			<div onChange={(e) => sortPosts(e.target.value)}>
				<NewLabel style={{}}>
					new
					<HiddenInput type="radio" name="sort" value="TIME_ASC" />
					<span className="difficulty-radio"></span>
				</NewLabel>
				<OldLabel
				// style={this.state.difficulty === 'medium' ? selected : null}
				>
					old
					<HiddenInput type="radio" name="sort" value="TIME_DESC" />
					<span className="difficulty-radio"></span>
				</OldLabel>
				<TopLabel
				// style={this.state.difficulty === 'hard' ? selected : null}
				>
					top
					<HiddenInput type="radio" name="sort" value="VOTE_ASC" />
					<span className="difficulty-radio"></span>
				</TopLabel>
			</div>
		</Container>
	);
}
