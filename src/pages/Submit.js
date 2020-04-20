import React from 'react';
import { Container } from '../App';
import Nav from '../layouts/Nav';
import CreatePost from '../components/CreatePost';

export default function Submit({ setUpdatePosts }) {
	return (
		<Container>
			<Nav />
			<CreatePost setUpdatePosts={setUpdatePosts} />
		</Container>
	);
}
