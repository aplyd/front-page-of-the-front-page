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
	setUser = { setUser },
}) {
	// const [width, setWidth] = useState(window.innerWidth);
	// const { postTitle } = useParams();
	const { user } = useContext(PostContext);
	//id, below, not to be confused with user id or post author id lmao why
	const { id } = useParams();

	useEffect(() => {
		if (!postData) {
			viewPostComments(id);
		}
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
