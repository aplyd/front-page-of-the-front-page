import React, { useState } from 'react';
import styled from 'styled-components';
import firebase from '../firebase';
import { useHistory } from 'react-router-dom';

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

//TODO - trigger rerender of App.js after posting
export default function CreatePost({ props, setUpdatePosts }) {
	const [title, setTitle] = useState('');
	const [postText, setPostText] = useState('');
	const history = useHistory();

	const onSubmit = (e) => {
		e.preventDefault();

		firebase
			.firestore()
			.collection('posts')
			.add({
				title,
				postText,
				timestamp: Date.now(),
				vote: 0,
			})
			.then(() => {
				setUpdatePosts(Date.now());
				history.push('/');
			});
		setTitle('');
		setPostText('');
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
