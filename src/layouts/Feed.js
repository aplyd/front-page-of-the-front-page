import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	grid-column: 1;
	height: 500px;
	background: white;
	border: 1px solid lightgray;
	border-radius: 4px;
`;

export default function Feed() {
	return <Container></Container>;
}
