import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import firebase from '../firebase';
import { useHistory } from 'react-router-dom';
import { PostContext } from '../PostContext';
import { v4 as uuidv4 } from 'uuid';

const FormContainer = styled.form`
	padding: 20px;
	display: flex;
	flex-direction: column;
`;

const TitleInput = styled.input``;
const TextInput = styled.textarea``;
const Button = styled.button`
	width: auto;
	height: auto;
	border-radius: 4px;
	padding: 3px 16px 3px 16px;
	font-size: 12px;
	text-align: center;
	text-transform: uppercase;
	line-height: 24px;
	margin: 0 4px;
	&&:hover {
		cursor: pointer;
	}
`;

const CancelBtn = styled(Button)``;
const SubmitBtn = styled(Button)``;

//TODO - trigger rerender of App.js after posting ??
export default function CreatePost({ props, setUpdatePosts }) {
	const [title, setTitle] = useState('');
	const [postText, setPostText] = useState('');
	const { user, setUser } = useContext(PostContext);
	const history = useHistory();

	const onSubmit = (e) => {
		const timestamp = Date.now();
		const postID = uuidv4();
		e.preventDefault();

		if (window.user) {
			firebase
				.firestore()
				.collection('posts')
				.doc(postID)
				.set({
					title,
					postText,
					timestamp,
					vote: 1,
					author: user.username,
					comments: [],
				})
				.then(() => {
					setUpdatePosts(Date.now());
					history.push('/');
				});

			firebase
				.firestore()
				.collection('users')
				.doc(window.user.uid)
				.update({
					posts: [
						...user.posts,
						{
							title,
							postText,
							timestamp,
							postID,
							uid: window.user.uid,
						},
					],
				});

			firebase
				.firestore()
				.collection('users')
				.doc(window.user.uid)
				.get()
				.then((res) => {
					const data = res.data();
					setUser({
						...data,
						posts: [
							...user.posts,
							{
								postID,
								postText,
								title,
								timestamp,
								isSignedIn: true,
								isAnonymous: false,
								uid: window.user.uid,
							},
						],
					});
				});

			setTitle('');
			setPostText('');
		}
	};

	return (
		<FormContainer onSubmit={onSubmit}>
			<TitleInput
				type="text"
				value={title}
				required
				onChange={(e) => setTitle(e.currentTarget.value)}
			></TitleInput>
			<TextInput
				value={postText}
				required
				onChange={(e) => setPostText(e.currentTarget.value)}
			></TextInput>
			<CancelBtn type="button">Cancel</CancelBtn>
			<SubmitBtn type="submit">Post</SubmitBtn>
		</FormContainer>
	);
}
