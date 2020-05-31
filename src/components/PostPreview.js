import React from 'react';
import styled from 'styled-components';
import { roundedGreyBorder } from '../GlobalStyle';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
	width: 100%;
	${roundedGreyBorder}
	display: grid;
	grid-template-columns: 40px 1fr;
	grid-template-rows: 1fr 32px;
	margin-bottom: 12px;
	cursor: pointer;
	&&:hover {
		border: solid 1px rgb(137, 137, 137);
	}
`;

export default function PostPreview({ title, id, viewPostComments, children }) {
	const history = useHistory();
	const url = title.replace(/\W/g, '').toLowerCase();

	const handleClick = () => {
		viewPostComments(id);
		history.push(`/comments/${url}/${id}`);
	};

	return <Container onClick={handleClick}>{children}</Container>;
}
