import React, { useState } from 'react';
import styled from 'styled-components';
import { roundedGreyBorder } from '../GlobalStyle';
import { FaUserCircle } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
	height: 54px;
	${roundedGreyBorder}
	margin-bottom: 18px;
	display: flex;
	flex-direction: row;
`;

const SVGprofile = styled.svg`
	position: relative;
	top: 10px;
	left: 12px;
	font-size: 36px;
	color: ${(props) => props.theme.colors.grey};
`;

const CreatePostInput = styled.input`
	height: 34px;
	width: 100%;
	border-radius: 4px;
	font-size: 16px;
	text-indent: 10px;
	margin-top: 10px;
	margin-left: 24px;
	margin-right: 24px;
	border: solid 0.5px white;
	&&:hover {
		border: 0.5px solid rgb(0, 121, 211);
	}
`;

export default function FeedCreatePost() {
	const history = useHistory();
	return (
		<Container>
			<SVGprofile as={FaUserCircle} />
			<CreatePostInput
				placeholder="Create Post"
				type="text"
				onFocus={() => history.push('/submit')}
			></CreatePostInput>
		</Container>
	);
}
