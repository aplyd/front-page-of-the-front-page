import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	background: white;
	height: 48px;
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0 20px;
`;

const Circle = styled.div`
	border-radius: 50%;
	height: 38px;
	width: 38px;
	min-width: 38px;
	background: rgb(255, 69, 0);
	margin: 8px 8px 8px 0;
`;

const Search = styled.input`
	height: 36px;
	width: 100%;
	border-radius: 4px;
	border: none;
	font-size: 16px;
	text-indent: 10px;
	max-width: 598px;
	margin: 0 auto;
	&&:hover {
		border: 0.5px solid rgb(0, 121, 211);
	}
`;

const button = styled.button`
	width: auto;
	height: auto;
	border-radius: 4px;
	padding: 3px 16px 3px 16px;
	font-size: 12px;
	text-align: center;
	text-transform: uppercase;
	line-height: 24px;
	white-space: nowrap;
	margin: 0 4px;
	&&:hover {
		cursor: pointer;
	}
`;

const LoginBtn = styled(button)`
	color: #0079d3;
	background-color: white;
	border: 1px solid #0079d3;
`;

const SignInBtn = styled(button)`
	color: white;
	background-color: #0079d3;
	border: 1px solid white;
`;

export default function Nav() {
	return (
		<Container>
			<Circle />

			<Search type="text" placeholder="search" />

			<LoginBtn type="button">log in</LoginBtn>
			<SignInBtn type="button">sign up</SignInBtn>
		</Container>
	);
}
