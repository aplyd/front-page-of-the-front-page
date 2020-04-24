import React from 'react';
import { Container } from '../App';
import CreatePost from '../components/CreatePost';

export default function Submit({ setUpdatePosts }) {
	return (
		<Container>
			<CreatePost setUpdatePosts={setUpdatePosts} />
		</Container>
	);
}
