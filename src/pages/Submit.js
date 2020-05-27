import React, { useState, useContext } from 'react';
import { Container } from '../App';
import styled from 'styled-components';
import { roundedGreyBorder } from '../GlobalStyle';
import FeedContainer from '../layouts/FeedContainer';
import CreatePost from '../components/CreatePost';
import { useHistory } from 'react-router-dom';
import { PostContext } from '../PostContext';
import firebase from '../firebase';
import { v4 as uuidv4 } from 'uuid';

const CreatePostContainer = styled.div`
	${roundedGreyBorder};
	grid-row: 1;
`;

const CreateAPost = styled.h3`
	padding-left: 4px;
`;

const WhiteLine = styled.div`
	border-radius: 4px;
	background: white;
	height: 2px;
	border-radius: 4px;
	margin-top: 4px;
	margin-bottom: 16px;
`;

const InputShownSelectContainer = styled.div`
	display: flex;
	flex-direction: row;
`;

const InputSelectItem = styled.div``;

const PostP = styled.p`
	color: ${(props) => props.theme.colors.blue};
	padding: 24px 0 12px 10%;
`;

const MediaP = styled(PostP)``;
const LinkP = styled(PostP)``;

const BlueLine = styled.div`
	background-color: ${(props) => props.theme.colors.blue};
	height: 2px;
	width: 25%;
	margin-bottom: 8px;
`;

export default function Submit() {
	const [title, setTitle] = useState('');
	const [postText, setPostText] = useState('');
	const [inputShown, setInputShown] = useState('post');
	const { user, setUser, setPosts, posts } = useContext(PostContext);
	const history = useHistory();

	const onSubmit = (e) => {
		const timestamp = Date.now();
		const postID = uuidv4();
		e.preventDefault();

		if (user) {
			//add post data to firebase and 'posts' state to immediately display
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
			//this block should never be reached because 'create a post' is only mounted when signed in
			alert('you must sign in to create a post :)');
		}
	};

	const onCancel = () => {
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
		<Container>
			<FeedContainer displayFeedSort={false}>
				<div>
					<CreateAPost>Create a post</CreateAPost>
					<WhiteLine></WhiteLine>
					<CreatePostContainer>
						<InputShownSelectContainer>
							<InputSelectItem>
								<PostP>Post</PostP>
								<BlueLine></BlueLine>
							</InputSelectItem>

							<InputSelectItem></InputSelectItem>
							<MediaP>Image & Video</MediaP>
							<BlueLine></BlueLine>

							<InputSelectItem>
								<LinkP>Link</LinkP>
								<BlueLine></BlueLine>
							</InputSelectItem>
						</InputShownSelectContainer>
						<CreatePost
							onCancel={onCancel}
							onSubmit={onSubmit}
							setTitle={setTitle}
							setPostText={setPostText}
							title={title}
							postText={postText}
							inputShown={inputShown}
						/>
					</CreatePostContainer>
				</div>
			</FeedContainer>
		</Container>
	);
}
