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
import { TiDocumentText } from 'react-icons/ti';
import { BsImageFill } from 'react-icons/bs';
import { RiLinksLine } from 'react-icons/ri';

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
	width: 100%;
`;

const InputSelectItem = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	min-height: 62px;
	cursor: pointer;
	&& > div {
		display: flex;
		flex-direction: row;
	}
`;

const PostP = styled.p`
	color: ${(props) =>
		props.inputshown === props.label
			? props.theme.colors.blue
			: props.theme.colors.gray};
	padding-top: 20px;
	font-size: 15px;
	/* padding: 24px 0 12px 10%; */
`;

const MediaP = styled(PostP)``;
const LinkP = styled(PostP)``;

const BlueLine = styled.div`
	background-color: ${(props) =>
		props.inputshown === props.label ? props.theme.colors.blue : 'white'};
	height: 2px;
	width: 100%;
`;

const InputTypeSVG = styled.svg`
	color: ${(props) =>
		props.inputshown === props.label
			? props.theme.colors.blue
			: props.theme.colors.gray};
	font-size: 16px;
	padding-top: 21px;
	padding-right: 8px;
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

	const postProps = { inputshown: inputShown, label: 'post' };
	const mediaProps = { inputshown: inputShown, label: 'media' };
	const linkProps = { inputshown: inputShown, label: 'link' };

	return (
		<Container>
			<FeedContainer displayFeedSort={false}>
				<div>
					<CreateAPost>Create a post</CreateAPost>
					<WhiteLine></WhiteLine>
					<CreatePostContainer>
						<InputShownSelectContainer>
							<InputSelectItem
								onClick={() => setInputShown('post')}
							>
								<div>
									<InputTypeSVG
										as={TiDocumentText}
										{...postProps}
									/>
									<PostP {...postProps}>Post</PostP>
								</div>
								<BlueLine {...postProps}></BlueLine>
							</InputSelectItem>

							<InputSelectItem
								onClick={() => setInputShown('media')}
								{...mediaProps}
							>
								<div>
									<InputTypeSVG
										as={BsImageFill}
										{...mediaProps}
									/>
									<MediaP {...mediaProps}>
										Image & Video
									</MediaP>
								</div>
								<BlueLine {...mediaProps}></BlueLine>
							</InputSelectItem>

							<InputSelectItem
								onClick={() => setInputShown('link')}
							>
								<div>
									<InputTypeSVG
										as={RiLinksLine}
										{...linkProps}
									/>
									<LinkP {...linkProps}>Link</LinkP>
								</div>
								<BlueLine {...linkProps}></BlueLine>
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
