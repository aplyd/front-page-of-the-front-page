import PropTypes from 'prop-types';
import React, { useContext, useState, useRef } from 'react';
import styled from 'styled-components';
import { PostContext } from '../PostContext';
import { logInExistingUser } from '../firebase';

import useInitialFocus from '../hooks/useInitialFocus';

const Container = styled.div`
	left: 0;
	right: 0;
	height: 100%;
`;

const FormContainer = styled.div`
	width: 100%;
	height: 100%;
	padding-left: 24px;
	max-width: 432px;

	@media screen and (max-width: 500px) {
		margin: 0 auto;
		padding: 8px 0 8px 0;
		width: calc(100% - 24px);
	}
`;

const Form = styled.form`
	width: 100%;
`;

const Input = styled.input`
	font-size: ${(props) => props.theme.font.size.m};
	width: 100%;
	max-width: calc(100% - 34px);
	display: block;
	padding: 8px 16px 8px 16px;
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
		<Container>
			<FormContainer>
				<Title>Sign In</Title>
				<Form onSubmit={logInUser}>
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
				</Form>
				<P1>Don't have an account?</P1>
				<P2 onClick={() => showSignUp()}>SIGN UP</P2>
			</FormContainer>
		</Container>
	);
}

LogIn.propTypes = {
	closeModal: PropTypes.func,
	showSignUp: PropTypes.func,
};
