import React from 'react';
// import { useParams } from 'react-router-dom';
import FeedContainer from '../layouts/FeedContainer';
import { Container } from '../App';
// import { PostContext } from '../PostContext';
import PostContent from '../components/PostContent';
import { useLocation } from 'react-router';

const tempComments = [];

const tempPost = [
	{
		id: '32f0f5b6-c083-43a0-acfd-bf74a991e4c8',
		title: 'look long enough and the void looks at you',
		author: 'austin',
		vote: 23,
		timestamp: Date.now(),
		postText:
			'Exercitation aliquip sit esse in deserunt fugiat amet aute. Anim pariatur veniam ullamco ex ea. Consequat commodo qui ipsum ullamco anim ex ut cupidatat minim nulla eiusmod est dolor mollit. Est culpa anim esse cupidatat.',
		comments: tempComments,
	},
];

export default function Comments() {
	// const [width, setWidth] = useState(window.innerWidth);
	// const { postTitle } = useParams();
	// const { posts } = useContext(PostContext);
	const {
		state: { id },
	} = useLocation();

	return (
		<Container>
			<FeedContainer displayFeedSort={false}>
				<PostContent post={tempPost} id={id} />
			</FeedContainer>
		</Container>
	);
}
