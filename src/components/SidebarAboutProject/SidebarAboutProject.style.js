import styled from 'styled-components';
import { roundedGreyBorder } from '../../GlobalStyle';

const AboutContainer = styled.div`
	background: white;
	${roundedGreyBorder};
`;

const AboutProjectDiv = styled.div`
	background: ${(props) => props.theme.colors.lightGray};
	border-top-right-radius: 4px;
	border-top-left-radius: 4px;

	&& > p {
		padding: 12px;
	}
`;

const Description = styled.p`
	padding: 0 12px 12px 12px;
	color: black;
	font-size: 13px;
	line-height: 1.4em;

	&& > a {
		color: ${(props) => props.theme.colors.blue};
	}
`;

const UserCount = styled.div`
	display: inline-block;
	padding: 12px;
	width: 88px;
`;

const MembersNum = styled.p`
	font-size: ${(props) => props.theme.font.size.m};
`;
const Members = styled.p`
	font-size: ${(props) => props.theme.font.size.xs};
`;

const PostCount = styled.div`
	display: inline-block;
	padding: 12px;
`;

const PostsNum = styled.p`
	font-size: ${(props) => props.theme.font.size.m};
`;
const Posts = styled.p`
	font-size: ${(props) => props.theme.font.size.xs};
`;

const CreationDate = styled.div`
	display: inline;
	padding: 12px 12px 0 12px;
	&& > p {
		display: inline;
	}
`;

const SVG = styled.svg`
	transform: scaleX(-1);
`;

const Spacer = styled.div`
	height: ${(props) => props.height + 'px'};
`;

export {
	AboutContainer,
	AboutProjectDiv,
	Description,
	UserCount,
	PostCount,
	CreationDate,
	SVG,
	Members,
	MembersNum,
	Posts,
	PostsNum,
	Spacer,
};
