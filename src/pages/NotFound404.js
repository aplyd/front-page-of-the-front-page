import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from '../App';

const Content = styled.div`
	margin: 0 auto;
	padding-top: 40px;
	text-align: center;
	color: ${(props) => props.theme.colors.grey};
	&& > a,
	a:visited {
		color: ${(props) => props.theme.colors.blue};
	}
`;

const FourOhFour = styled.h1`
	font-size: 160px;
`;
const PageNotFound = styled.p``;
const DoesntExist = styled.p``;

export default function NotFound404() {
	return (
		<Container>
			<Content>
				<FourOhFour>404</FourOhFour>
				<PageNotFound>page not found</PageNotFound>
				<DoesntExist>the page you requested does not exist</DoesntExist>
				<br />
				<Link to={'/'}>go back</Link>
			</Content>
		</Container>
	);
}
