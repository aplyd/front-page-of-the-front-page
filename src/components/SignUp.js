import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { PostContext } from '../PostContext';

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
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { createUserAccount } = useContext(PostContext);

	const createUser = (e) => {
		e.preventDefault();
		createUserAccount(email, password);
		setEmail('');
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
				<EmailInput
					type="text"
					focus
					required
					placeholder="Email"
					vale={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<PasswordInput
					type="text"
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
