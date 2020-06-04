import React, { useContext, useState, useRef } from 'react';
import styled from 'styled-components';
import { PostContext } from '../PostContext';
import { logInExistingUser } from '../firebase';

import useInitialFocus from '../hooks/useInitialFocus';

const WordsContainer = styled.div`
	width: 432px;
	left: 0;
	height: 100%;
	padding-left: 24px;
`;

const Input = styled.input`
	font-size: ${(props) => props.theme.font.size.m};
	width: 392px;
	padding: 8px 24px 8px 16px;
	border-radius: 4px;
	text-indent: 10px;
	outline: none;
	border: 0.5px solid ${(props) => props.theme.colors.lightGray};
	display: block;
	margin-bottom: 32px;
	text-indent: 4px;
`;

const EmailInput = styled(Input)`
	margin-bottom: 24px;
`;
const PasswordInput = styled(Input)``;
const Title = styled.h3`
	margin-bottom: 16px;
`;

const SignInBtn = styled.button`
	width: 178px;
	height: 40px;
	padding: 8px;
	background-color: ${(props) => props.theme.colors.blue};
	color: white;
	text-transform: uppercase;
	font-size: ${(props) => props.theme.font.size.s};
	text-align: center;
	border: none;
	margin: 0 0 8px 0;
	&&:hover {
		background-color: ${(props) => props.theme.colors.lightBlue};
	}
`;

const P1 = styled.p`
	display: inline;
	margin-right: 4px;
	font-size: 12px;
`;
const P2 = styled.p`
	display: inline;
	font-size: 12px;
	cursor: pointer;
	color: ${(props) => props.theme.colors.blue};
`;

export default function LogIn({ showSignUp, closeModal }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { setUser, user } = useContext(PostContext);
	const input = useRef(null);
	useInitialFocus(input);

	const logInUser = (e) => {
		e.preventDefault();
		logInExistingUser(email, password, setUser, user);

		setEmail('');
		setPassword('');
		closeModal();
	};

	return (
		<WordsContainer>
			<Title>Sign In</Title>
			<form onSubmit={logInUser}>
				<EmailInput
					type="email"
					focus
					required
					placeholder="Email"
					vale={email}
					onChange={(e) => setEmail(e.target.value)}
					ref={input}
					maxLength="64"
				/>
				<PasswordInput
					type="password"
					required
					placeholder="Password"
					vale={password}
					onChange={(e) => setPassword(e.target.value)}
					maxLength="128"
				/>
				<SignInBtn type="submit">Sign In</SignInBtn>
			</form>
			<P1>Don't have an account?</P1>
			<P2 onClick={() => showSignUp()}>SIGN UP</P2>
		</WordsContainer>
	);
}
