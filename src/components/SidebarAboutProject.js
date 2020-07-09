import React from 'react';
// import firebase from '../firebase';
import { GiCakeSlice } from 'react-icons/gi';
import styled from 'styled-components';
import { roundedGreyBorder } from '../GlobalStyle';

const AboutContainer = styled.div`
	background: white;
	${roundedGreyBorder};
`;

const AboutProjectDiv = styled.div`
	background: ${(props) => props.theme.colorlightGray};
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
		color: ${(props) => props.theme.colorblue};
	}
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

export default function SidebarAboutProject() {
	return (
		<AboutContainer>
			<AboutProjectDiv>
				<p>About Project</p>
			</AboutProjectDiv>
			<Spacer height={12} />
			<Description>
				Welcome to the front page of the front page! This was built by
				me, Austin Ftacnik, for my final project of{' '}
				<a
					href="https://www.theodinproject.com/courses/javascript/lessons/final-project-116ff273-1e55-4055-bd7f-146c17d0ec9c"
					target="_blank"
					rel="noopener noreferrer"
				>
					The Odin Project
				</a>{' '}
				JavaScript course. This is a simplified clone of a popular
				website and was built for learning purposes, not to replace said
				site. If you have any questions or comments, feel free to
				contact via{' '}
				<a
					href="https://github.com/aplyd"
					target="_blank"
					rel="noopener noreferrer"
				>
					Github
				</a>{' '}
				or{' '}
				<a
					href="https://twitter.com/austinftacnik"
					target="_blank"
					rel="noopener noreferrer"
				>
					Twitter
				</a>
				.
			</Description>
			{/* <div>
				<UserCount>
					<MembersNum>{userCount ? userCount : '2'}</MembersNum>
					<Members>Members</Members>
				</UserCount>
				<PostCount>
					<PostsNum>16</PostsNum>
					<Posts>Posts</Posts>
				</PostCount>
			</div> */}

			<Spacer height={12} />
			<CreationDate>
				<SVG as={GiCakeSlice} /> <p>Created April 15th, 2020</p>
			</CreationDate>
			<Spacer height={24} />
		</AboutContainer>
	);
}
