import React from 'react';
import styled from 'styled-components';
import { roundedGreyBorder } from '../GlobalStyle';
import { GiSevenPointedStar } from 'react-icons/gi';
import { BsBarChartFill } from 'react-icons/bs';
import { RiTimeLine } from 'react-icons/ri';

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
			: props.theme.colors.gray};
	&:hover {
		color: ${(props) => props.theme.colors.blue};
		cursor: pointer;
	}
`;

const LabelDiv = styled.div`
	padding: 16px;
`;

const NewContainer = styled.div`
	display: inline;
	&&:hover {
		color: ${(props) => props.theme.colors.blue};
	}
`;
const OldContainer = styled.div`
	display: inline;
	&&:hover {
		color: ${(props) => props.theme.colors.blue};
	}
`;
const TopContainer = styled.div`
	display: inline;
	&&:hover {
		color: ${(props) => props.theme.colors.blue};
	}
`;

const NewLabel = styled(Label)`
	font-size: 16px;
	padding-right: 12px;
`;
const OldLabel = styled(Label)`
	padding-right: 12px;
`;
const TopLabel = styled(Label)`
	padding-right: 12px;
`;

const SVG = styled.svg`
	margin-right: 2px;
	padding-top: 2px;
	color: ${(props) =>
		props.sortby === props.value
			? props.theme.colors.blue
			: props.theme.colors.grey};
	&&:hover {
		color: ${(props) => props.theme.colors.blue};
	}
`;

const TopSVG = styled(SVG)`
	position: relative;
	top: 2px;
	right: 0;
	${TopLabel}:hover & {
		font-size: 100px;
	}
`;
const NewSVG = styled(SVG)`
	position: relative;
	top: 2px;
	right: 0;
	${NewLabel}:hover & {
		fill: ${(props) => props.theme.colors.blue};
	}
`;
const OldSVG = styled(SVG)`
	position: relative;
	top: 2px;
	right: 0;
	${OldLabel}:hover & {
		fill: ${(props) => props.theme.colors.blue};
	}
`;

export default function FeedSort({ sortPosts, sortBy }) {
	return (
		<Container>
			<LabelDiv onChange={(e) => sortPosts(e.target.value)}>
				<TopContainer>
					<TopSVG
						as={BsBarChartFill}
						value="VOTE_ASC"
						sortby={sortBy}
					/>
					<TopLabel sortBy={sortBy}>
						Top
						<HiddenInput
							type="radio"
							name="sort"
							value="VOTE_ASC"
						/>
					</TopLabel>
				</TopContainer>

				<NewContainer>
					<NewSVG
						as={GiSevenPointedStar}
						value="TIME_ASC"
						sortby={sortBy}
					/>
					<NewLabel sortBy={sortBy}>
						New
						<HiddenInput
							type="radio"
							name="sort"
							value="TIME_ASC"
						/>
					</NewLabel>
				</NewContainer>

				<OldContainer>
					<OldSVG as={RiTimeLine} value="TIME_DESC" sortby={sortBy} />
					<OldLabel sortBy={sortBy}>
						Old
						<HiddenInput
							type="radio"
							name="sort"
							value="TIME_DESC"
						/>
					</OldLabel>
				</OldContainer>
			</LabelDiv>
		</Container>
	);
}
