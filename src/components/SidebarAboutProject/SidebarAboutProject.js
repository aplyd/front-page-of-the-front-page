import React, { useState, useContext } from 'react';
// import firebase from '../firebase';
import { GiCakeSlice } from 'react-icons/gi';
import * as S from './SidebarAboutProject.style';
import { PostContext } from '../../PostContext';

export default function SidebarAboutProject() {
	const [userCount, setUserCount] = useState();
	const { posts } = useContext(PostContext);

	return (
		<S.AboutContainer>
			<S.AboutProjectDiv>
				<p>About Project</p>
			</S.AboutProjectDiv>
			<S.Spacer height={12} />
			<S.Description>
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
			</S.Description>
			<div>
				<S.UserCount>
					<S.MembersNum>{userCount ? userCount : '2'}</S.MembersNum>
					<S.Members>Members</S.Members>
				</S.UserCount>
				<S.PostCount>
					<S.PostsNum>16</S.PostsNum>
					<S.Posts>Posts</S.Posts>
				</S.PostCount>
			</div>

			<S.Spacer height={12} />
			<S.CreationDate>
				<S.SVG as={GiCakeSlice} /> <p>Created April 15th, 2020</p>
			</S.CreationDate>
			<S.Spacer height={24} />
		</S.AboutContainer>
	);
}
