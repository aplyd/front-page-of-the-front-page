import React, { useContext, useState, useRef } from 'react';
import styled from 'styled-components';
import { PostContext } from '../PostContext';
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

const UserNameInput = styled(Input)`
	margin-bottom: 24px;
`;
const PasswordInput = styled(Input)``;
const EmailInput = styled(Input)``;
const Title = styled.h3`
	margin-bottom: 16px;
`;

const SignUpBtn = styled.button`
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

export default function SignUp({ showLogIn, closeModal }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const { createUserAccount } = useContext(PostContext);
	const input = useRef(null);
	useInitialFocus(input);

	const createUser = (e) => {
		e.preventDefault();
		createUserAccount(username, email, password);
		setUsername('');
		setPassword('');
		closeModal();
	};

	return (
		<WordsContainer>
			<Title>
				By having an account, you can join, vote, and comment on all
				your favorite content.
			</Title>
			<form onSubmit={createUser}>
				<UserNameInput
					type="text"
					focus
					required
					placeholder="Username"
					vale={username}
					ref={input}
					onChange={(e) => setUsername(e.target.value)}
				/>

				<EmailInput
					type="text"
					focus
					required
					placeholder="Email"
					vale={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<PasswordInput
					type="password"
					required
					placeholder="Password"
					vale={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<SignUpBtn type="submit">Sign Up</SignUpBtn>
			</form>
			<P1>Already have an account?</P1>
			<P2 onClick={() => showLogIn()}>LOG IN</P2>
		</WordsContainer>
	);
}
