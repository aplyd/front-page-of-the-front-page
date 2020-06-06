import React, { useEffect, useContext } from 'react';
// import { useParams } from 'react-router-dom';
import FeedContainer from '../layouts/FeedContainer';
import { Container } from '../App';
import { PostContext } from '../PostContext';
import PostContent from '../components/PostContent';
import { useParams } from 'react-router';

const tempPost = {
	id: 1,
	title: '',
	username: '',
	vote: 0,
	timestamp: '',
	postText: '',
	replies: [],
};

export default function Comments({
	setModalContent,
	currentPost,
	postData,
	viewPostComments,
	setPostData,
	setUser,
}) {
	const { user } = useContext(PostContext);
	const { id } = useParams();

	useEffect(() => {
		// if the user goes to a post without being directed from home page,
		// this will get the correct data
		if (!postData) {
			viewPostComments(id);
		}
		// if (window.pageYOffset !== 0) {
		// 	window.scrollTo(0, 0);
		// }
	}, [id, postData, viewPostComments]);

	return (
		<Container>
			<FeedContainer displayFeedSort={false}>
				<PostContent
					post={postData ? postData : tempPost}
					user={user}
					setModalContent={setModalContent}
					viewPostComments={viewPostComments}
					setPostData={setPostData}
					setUser={setUser}
				/>
			</FeedContainer>
		</Container>
	);
}
