import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import firebase from '../firebase';
import { useHistory } from 'react-router-dom';
import { PostContext } from '../PostContext';
import { v4 as uuidv4 } from 'uuid';

const FormContainer = styled.form`
	padding: 12 0px;
`;

const TitleInput = styled.input`
	width: 100%;
	text-indent: 10px;
	border-radius: 4px;
	font-size: 16px;
	outline: none;
	border: none;
	padding: 8px;
	margin-bottom: 16px;
	&&:focus,
	:hover {
		border: solid 0.5px black;
	}
`;
const TextInput = styled.textarea`
	width: 100%;
	padding: 18px 12px 12px 12px;
	text-indent: 10px;
	border-radius: 4px;
	min-height: 122px;
	font-size: 16px;
	outline: none;
	border: none;
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
	:hover {
		color: ${(props) => props.theme.colors.lightBlue};
		border: 1px solid ${(props) => props.theme.colors.lightBlue};
	}
	display: inline;
`;
const SubmitBtn = styled.button`
	color: white;
	background-color: ${(props) => props.theme.colors.blue};
	border: 1px solid white;
	line-height: 24px;
	:hover {
		background-color: ${(props) => props.theme.colors.lightBlue};
	}
	display: inline;
`;

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
					//this is probably bad
					setUpdatePosts(Date.now());
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

			//is this neeeded????
			firebase
				.firestore()
				.collection('users')
				.doc(user.uid)
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
								uid: user.uid,
							},
						],
					});
				});

			setTitle('');
			setPostText('');
		} else {
			alert('you must sign in to create a post :)');
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
				required
				onChange={(e) => setPostText(e.currentTarget.value)}
				placeholder="Text (optional)"
				maxLength="2000"
			></TextInput>
			<CancelBtn type="button">Cancel</CancelBtn>
			<SubmitBtn type="submit">Post</SubmitBtn>
		</FormContainer>
	);
}
