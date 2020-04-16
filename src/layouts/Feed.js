import React from 'react';
import styled from 'styled-components';
import Post from '../components/Post';

const Container = styled.div`
	grid-column: 1;
`;

export default function Feed() {
	return (
		<Container>
			<Post />
		</Container>
	);
}
