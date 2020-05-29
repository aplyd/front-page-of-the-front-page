import React from 'react';
import styled from 'styled-components';

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

const MediaInput = styled(TextInput)`
	min-height: 48px;
`;
const LinkInput = styled(TextInput)`
	min-height: 48px;
`;

export default function CreatePost({
	onSubmit,
	onCancel,
	setPostText,
	setPostLink,
	postLink,
	postMedia,
	setPostMedia,
	setTitle,
	title,
	postText,
	inputShown,
}) {
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
			{inputShown === 'post' && (
				<TextInput
					value={postText}
					onChange={(e) => setPostText(e.currentTarget.value)}
					placeholder="Text (optional)"
					maxLength="1600"
				></TextInput>
			)}
			{inputShown === 'media' && (
				<MediaInput
					placeholder={'Url'}
					onChange={(e) => setPostMedia(e.target.value)}
					value={postMedia}
					required
				></MediaInput>
			)}
			{inputShown === 'link' && (
				<LinkInput
					placeholder={'Url'}
					onChange={(e) => setPostLink(e.target.value)}
					value={postLink}
					required
				></LinkInput>
			)}

			<CancelBtn type="button" onClick={() => onCancel()}>
				Cancel
			</CancelBtn>
			<SubmitBtn type="submit">Post</SubmitBtn>
		</FormContainer>
	);
}
