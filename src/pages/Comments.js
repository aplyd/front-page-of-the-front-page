import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import FeedContainer from '../layouts/FeedContainer';
import { Container } from '../App';
// import { PostContext } from '../PostContext';
import PostContent from '../components/PostContent';
import { useLocation } from 'react-router';
import firebase from '../firebase';

const tempPost = {
	id: '',
	title: '',
	author: '',
	vote: 0,
	timestamp: '',
	postText: '',
	comments: [],
};

const tempComment = {
	author: 'RookyNumbs',
	points: 4,
	body: '70-80%!?? 51% accuracy and you can become fabulously wealthy.',
	timestamp: Date.now(),
};

export default function Comments() {
	// const [width, setWidth] = useState(window.innerWidth);
	// const { postTitle } = useParams();
	// const { posts } = useContext(PostContext);
	const [postData, setPostData] = useState();
	const {
		state: { id },
	} = useLocation();

	useEffect(() => {
		firebase
			.firestore()
			.collection('posts')
			.doc(id)
			.get()
			.then((content) => {
				setPostData(content.data());
			});
	}, [id]);

	return (
		<Container>
			<FeedContainer displayFeedSort={false}>
				<PostContent post={postData ? postData : tempPost} id={id} />
			</FeedContainer>
		</Container>
	);
}
