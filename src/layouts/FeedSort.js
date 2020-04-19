import React, { useState } from 'react';
import styled from 'styled-components';
import { roundedGreyBorder } from '../GlobalStyle';

//TODO - conditionally render styles based on input checked
const Container = styled.div`
	grid-column: 1;
	height: 54px;
	${roundedGreyBorder}

	&& > div > label {
		color: ${(props) => props.theme.colors.gray};
		&:hover {
			color: ${(props) => props.theme.colors.blue};
			cursor: pointer;
		}
		&:checked {
			color: ${(props) => props.theme.colors.blue};
			cursor: pointer;
		}
	}

	&& > div > label > input {
		display: none;
	}
`;

const SORT_OPTIONS = {
	TIME_ASC: { column: 'time', direction: 'asc' },
	TIME_DESC: { column: 'time', direction: 'desc' },
	VOTE_ASC: { column: 'vote', direction: 'asc' },
};

export default function FeedSort() {
	const [sortBy, setSortBy] = useState('TIME_ASC');

	return (
		<Container>
			<div onChange={(e) => setSortBy(e.target.value)}>
				<label>
					new
					<input type="radio" name="sort" value="TIME_ASC" />
					<span className="difficulty-radio"></span>
				</label>
				<label
				// style={this.state.difficulty === 'medium' ? selected : null}
				>
					old
					<input type="radio" name="sort" value="TIME_DESC" />
					<span className="difficulty-radio"></span>
				</label>
				<label
				// style={this.state.difficulty === 'hard' ? selected : null}
				>
					top
					<input type="radio" name="sort" value="VOTE_ASC" />
					<span className="difficulty-radio"></span>
				</label>
			</div>
		</Container>
	);
}
