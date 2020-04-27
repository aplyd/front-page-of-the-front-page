import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import FeedContainer from '../layouts/FeedContainer';
import { Container } from '../App';
// import { PostContext } from '../PostContext';
import PostContent from '../components/PostContent';
import { useLocation } from 'react-router';
import firebase from '../firebase';

const zeroA2 = {
	username: 'RookyNumbs',
	points: 4,
	commentInput: 'zero A 2',
	timestamp: Date.now(),
	replies: [],
};

const zeroA1 = {
	username: 'RookyNumbs',
	points: 4,
	commentInput: 'zero A 1',
	timestamp: Date.now(),
	replies: [],
};

const zeroB = {
	username: 'RookyNumbs',
	points: 4,
	commentInput: 'zero B',
	timestamp: Date.now(),
	replies: [],
};

const zeroA = {
	username: 'RookyNumbs',
	points: 4,
	commentInput: 'zero A',
	timestamp: Date.now(),
	replies: [zeroA1, zeroA2],
};

const zero = {
	username: 'RookyNumbs',
	points: 4,
	commentInput: 'zero',
	timestamp: Date.now(),
	replies: [zeroA, zeroB],
};

const one = {
	username: 'RookyNumbs',
	points: 4,
	commentInput: 'one',
	timestamp: Date.now(),
	replies: [],
};

//dont forget to set this back to empty strings
const tempPost = {
	id: 1,
	title: 'Welcome to the front page of the front page',
	author: '',
	vote: 0,
	timestamp: Date.now(),
	postText: '',
	comments: [zero, one],
};

export default function Comments() {
	// const [width, setWidth] = useState(window.innerWidth);
	// const { postTitle } = useParams();
	// const { posts } = useContext(PostContext);
	const [postData, setPostData] = useState();
	const {
		state: { id },
	} = useLocation();

	// useEffect(() => {
	// 	firebase
	// 		.firestore()
	// 		.collection('posts')
	// 		.doc(id)
	// 		.get()
	// 		.then((content) => {
	// 			setPostData(content.data());
	// 		});
	// }, [id]);

	return (
		<Container>
			<FeedContainer displayFeedSort={false}>
				<PostContent post={postData ? postData : tempPost} id={id} />
			</FeedContainer>
		</Container>
	);
}
