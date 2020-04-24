import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

export default function Comments() {
	const { postTitle } = useParams();

	return (
		<div>
			<h1>hello {postTitle}</h1>
		</div>
	);
}
