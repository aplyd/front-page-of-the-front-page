import React, { useState } from 'react';
import styled from 'styled-components';
import { roundedGreyBorder } from '../GlobalStyle';

const Container = styled.div`
	grid-column: 1;
	grid-row: 1;
	height: 54px;
	${roundedGreyBorder}
`;

export default function FeedCreatePost() {
	return (
		<Container>
			<p>hi</p>
		</Container>
	);
}
