import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	grid-column: 2;
	grid-row: 1 / span 2;
	background: white;
	border: 1px solid lightgray;
	border-radius: 4px;
`;

export default function Sidebar() {
	return <Container></Container>;
}
