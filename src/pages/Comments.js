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
	commentInput:
		'Fugiat amet velit ad proident laborum sunt velit mollit adipisicing pariatur aliquip ad aliqua ipsum.',
	timestamp: Date.now(),
	replies: [],
	depth: 2,
};

const zeroA1 = {
	username: 'RookyNumbs',
	points: 4,
	commentInput:
		'Fugiat amet velit ad proident laborum sunt velit mollit adipisicing pariatur aliquip ad aliqua ipsum.',
	timestamp: Date.now(),
	replies: [],
	depth: 2,
};

const zeroB = {
	username: 'RookyNumbs',
	points: 4,
	commentInput:
		'Fugiat amet velit ad proident laborum sunt velit mollit adipisicing pariatur aliquip ad aliqua ipsum.',
	timestamp: Date.now(),
	replies: [],
	depth: 1,
};

const zeroA = {
	username: 'RookyNumbs',
	points: 4,
	commentInput:
		'Fugiat amet velit ad proident laborum sunt velit mollit adipisicing pariatur aliquip ad aliqua ipsum.',
	timestamp: Date.now(),
	replies: [zeroA1, zeroA2],
	depth: 1,
};

const zero = {
	username: 'RookyNumbs',
	points: 4,
	commentInput:
		'Laborum excepteur veniam eiusmod consequat minim sunt ea ullamco. Sit dolore tempor incididunt est cillum aliquip incididunt est commodo labore. Labore est amet et sint eiusmod Lorem adipisicing. Ad reprehenderit eu ex aliqua. Nisi ea excepteur veniam ea deserunt quis minim eu do dolor. Ad aliqua aliquip et ea elit culpa irure non voluptate ut non.',
	timestamp: Date.now(),
	replies: [zeroA, zeroB],
	depth: 0,
};

const one = {
	username: 'RookyNumbs',
	points: 4,
	commentInput:
		'Fugiat amet velit ad proident laborum sunt velit mollit adipisicing pariatur aliquip ad aliqua ipsum.',
	timestamp: Date.now(),
	replies: [],
	depth: 0,
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
