import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import firebase from '../firebase';
import { useHistory } from 'react-router-dom';
import { PostContext } from '../PostContext';
import { v4 as uuidv4 } from 'uuid';

const FormContainer = styled.form`
	position: relative;
`;

const TitleInput = styled.input`
	width: calc(100% - 42px);
	text-indent: 10px;
	border-radius: 4px;
	font-size: 16px;
	outline: none;
	padding: 8px;
	margin: 8px 8px 16px 12px;
	border: solid 0.5px white;
	&&:focus,
	:hover {
		border: solid 0.5px black;
	}
`;
const TextInput = styled.textarea`
	width: calc(100% - 42px);
	padding: 8px;
	margin-left: 12px;
	margin-bottom: 92px;
	text-indent: 10px;
	border-radius: 4px;
	min-height: 122px;
	font-size: 16px;
	outline: none;
	border: solid 0.5px white;
	&&:focus,
	:hover {
		border: solid 0.5px black;
	}
`;

const CancelBtn = styled.button`
	color: ${(props) => props.theme.colors.blue};
	background-color: white;
	border: 1px solid ${(props) => props.theme.colors.blue};
	line-height: 24px;
	display: inline;
	position: absolute;
	right: 90px;
	bottom: 52px;
	:hover {
		color: ${(props) => props.theme.colors.lightBlue};
		border: 1px solid ${(props) => props.theme.colors.lightBlue};
	}
`;
const SubmitBtn = styled.button`
	color: white;
	background-color: ${(props) => props.theme.colors.blue};
	border: 1px solid white;
	line-height: 24px;
	display: inline;
	position: absolute;
	right: 8px;
	bottom: 52px;
	:hover {
		background-color: ${(props) => props.theme.colors.lightBlue};
	}
`;

//TODO - trigger rerender of App.js after posting ??
export default function CreatePost({ props, setUpdatePosts }) {
	const [title, setTitle] = useState('');
	const [postText, setPostText] = useState('');
	const { user, setUser, setPosts, posts } = useContext(PostContext);
	const history = useHistory();

	const onSubmit = (e) => {
		const timestamp = Date.now();
		const postID = uuidv4();
		e.preventDefault();

		if (user) {
			firebase
				.firestore()
				.collection('posts')
				.doc(postID)
				.set({
					title,
					postText,
					timestamp,
					vote: 1,
					username: user.username,
					replies: [],
					id: postID,
				})
				.then(() => {
					setPosts([
						{
							title,
							postText,
							timestamp,
							vote: 1,
							username: user.username,
							replies: [],
							id: postID,
						},
						...posts,
					]);
					history.push('/');
				});

			firebase
				.firestore()
				.collection('users')
				.doc(user.uid)
				.update({
					posts: [
						...user.posts,
						{
							title,
							postText,
							timestamp,
							postID,
							uid: user.uid,
						},
					],
				});

			//TODO - is this neeeded????
			firebase
				.firestore()
				.collection('users')
				.doc(user.uid)
				.get()
				.then((res) => {
					const data = res.data();
					setUser({
						...data,
						isSignedIn: true,
						isAnonymous: false,
						posts: [
							...user.posts,
							{
								postID,
								postText,
								title,
								timestamp,
								uid: user.uid,
							},
						],
					});
				});

			setTitle('');
			setPostText('');
		} else {
			//this shouldn't ever happen because 'create a post' is only mounted when signed in
			alert('you must sign in to create a post :)');
		}
	};

	const cancelCreatePost = () => {
		const cancel = () => {
			setTitle('');
			setPostText('');
			history.push('/');
		};
		if (title.length > 0 || postText.length > 0) {
			if (
				window.confirm(
					'Are you sure you want to leave this page? Your post will not be saved.'
				)
			) {
				cancel();
			}
		} else {
			cancel();
		}
	};

	return (
		<FormContainer onSubmit={onSubmit}>
			<TitleInput
				type="text"
				value={title}
				required
				onChange={(e) => setTitle(e.currentTarget.value)}
				placeholder="Title"
				maxLength="300"
			></TitleInput>
			<TextInput
				value={postText}
				onChange={(e) => setPostText(e.currentTarget.value)}
				placeholder="Text (optional)"
				maxLength="1600"
			></TextInput>
			<CancelBtn type="button" onClick={() => cancelCreatePost()}>
				Cancel
			</CancelBtn>
			<SubmitBtn type="submit">Post</SubmitBtn>
		</FormContainer>
	);
}
