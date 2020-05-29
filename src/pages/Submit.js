import React, { useState, useContext } from 'react';
import { Container } from '../App';
import styled from 'styled-components';
import { roundedGreyBorder } from '../GlobalStyle';
import FeedContainer from '../layouts/FeedContainer';
import CreatePost from '../components/CreatePost';
import { useHistory } from 'react-router-dom';
import { PostContext } from '../PostContext';
import firebase, { LINKPREVIEW_API_KEY } from '../firebase';
import { TiDocumentText } from 'react-icons/ti';
import { BsImageFill } from 'react-icons/bs';
import { RiLinksLine } from 'react-icons/ri';
import axios from 'axios';
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
	font-size: 16px;
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
	font-size: 18px;
	padding-top: 21px;
	padding-right: 8px;
`;

export default function Submit() {
	const [title, setTitle] = useState('');
	const [postText, setPostText] = useState('');
	const [postMedia, setPostMedia] = useState('');
	const [postLink, setPostLink] = useState('');
	const [inputShown, setInputShown] = useState('post');
	const { user, setUser, setPosts, posts } = useContext(PostContext);
	const history = useHistory();

	const onSubmit = async (e) => {
		e.preventDefault();

		const timestamp = Date.now();
		const postID = uuidv4();

		//fetch post preview
		const getPreviewImage = async () => {
			const image = await axios
				.get(
					`https://api.linkpreview.net/?key=${LINKPREVIEW_API_KEY}&q=${postLink}`
				)
				.then((res) => res.data.image)
				.catch((err) => console.error(err));
			return image;
		};

		const submitPost = (img = null) => {
			//add post data to firebase and 'posts' state to immediately display
			firebase
				.firestore()
				.collection('posts')
				.doc(postID)
				.set({
					postType: inputShown,
					linkPreview: img,
					title,
					postText,
					postMedia,
					postLink,
					timestamp,
					vote: 1,
					username: user.username,
					replies: [],
					id: postID,
				})
				.then(() => {
					setPosts([
						{
							postType: inputShown,
							linkPreview: img,
							title,
							postText,
							postMedia,
							postLink,
							timestamp,
							vote: 1,
							username: user.username,
							replies: [],
							id: postID,
						},
						...posts,
					]);
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

			console.log(
				'//TODO - remove GET request and instead update state directly'
			);
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
		};

		//fetch post preview and save to firebase
		if (user) {
			if (inputShown === 'link') {
				const img = await getPreviewImage();
				submitPost(img);
			} else {
				submitPost();
			}
			//add post data to firebase and 'posts' state to immediately display
			setTitle('');
			setPostText('');
			history.push('/');
		} else {
			//this block should never be reached because CreatePost component is only mounted when signed in
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
							postMedia={postMedia}
							setPostMedia={setPostMedia}
							postLink={postLink}
							setPostLink={setPostLink}
							inputShown={inputShown}
						/>
					</CreatePostContainer>
				</div>
			</FeedContainer>
		</Container>
	);
}
