import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { roundedGreyBorder } from '../GlobalStyle';
import { GiSevenPointedStar } from 'react-icons/gi';
import { BsBarChartFill } from 'react-icons/bs';
import { RiTimeLine } from 'react-icons/ri';

export const Container = styled.div`
	height: 54px;
	${roundedGreyBorder}
	margin-bottom: 18px;
`;

const HiddenInput = styled.input`
	display: none;
`;

const Label = styled.label`
	padding-right: 12px;
	cursor: pointer;
	color: ${(props) =>
		props.sortby === props.value
			? props.theme.colors.blue
			: props.theme.colors.grey};
`;

const LabelDiv = styled.div`
	padding: 16px;
`;

const NewLabel = styled(Label)``;
const OldLabel = styled(Label)``;
const TopLabel = styled(Label)``;

const SVG = styled.svg`
	margin-right: 2px;
	padding-top: 2px;
	position: relative;
	top: 2px;
	right: 0;
	cursor: pointer;
	color: ${(props) =>
		props.sortby === props.value
			? props.theme.colors.blue
			: props.theme.colors.grey};
`;

const TopSVG = styled(SVG)``;
const NewSVG = styled(SVG)``;
const OldSVG = styled(SVG)``;

const NewContainer = styled.div`
	display: inline;
	&&:hover {
		${NewSVG} {
			color: ${(props) => props.theme.colors.blue};
		}
		${NewLabel} {
			color: ${(props) => props.theme.colors.blue};
		}
	}
`;
const OldContainer = styled.div`
	display: inline;
	&&:hover {
		${OldSVG} {
			color: ${(props) => props.theme.colors.blue};
		}
		${OldLabel} {
			color: ${(props) => props.theme.colors.blue};
		}
	}
`;
const TopContainer = styled.div`
	display: inline;
	&&:hover {
		${TopSVG} {
			color: ${(props) => props.theme.colors.blue};
		}
		${TopLabel} {
			color: ${(props) => props.theme.colors.blue};
		}
	}
`;

export default function FeedSort({ sortPosts, sortBy }) {
	return (
		<Container>
			<LabelDiv onChange={(e) => sortPosts(e.target.value)}>
				<TopContainer value="VOTE_ASC" sortby={sortBy}>
					<TopSVG
						as={BsBarChartFill}
						sortby={sortBy}
						value="VOTE_ASC"
					/>
					<TopLabel sortby={sortBy} value="VOTE_ASC">
						Top
						<HiddenInput
							type="radio"
							name="sort"
							value="VOTE_ASC"
						/>
					</TopLabel>
				</TopContainer>

				<NewContainer value="TIME_ASC" sortby={sortBy}>
					<NewSVG
						as={GiSevenPointedStar}
						sortby={sortBy}
						value="TIME_ASC"
					/>
					<NewLabel sortby={sortBy} value="TIME_ASC">
						New
						<HiddenInput
							type="radio"
							name="sort"
							value="TIME_ASC"
						/>
					</NewLabel>
				</NewContainer>

				<OldContainer value="TIME_DESC" sortby={sortBy}>
					<OldSVG as={RiTimeLine} sortby={sortBy} value="TIME_DESC" />
					<OldLabel sortby={sortBy} value="TIME_DESC">
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

FeedSort.propTypes = {
	sortBy: PropTypes.any,
	sortPosts: PropTypes.func,
};
