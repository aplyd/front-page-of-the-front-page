import PropTypes from 'prop-types';
import React, { useContext, useState, useRef } from 'react';
import styled from 'styled-components';
import { PostContext } from '../PostContext';
import useInitialFocus from '../hooks/useInitialFocus';
import { createUserAccount } from '../firebase';
import firebase from '../firebase';

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

export const InvalidInputNotification = styled.p`
	color: ${(props) => props.theme.colors.red};
	font-size: ${(props) => props.theme.font.size.xs};
	padding-bottom: 4px;
`;

export const NotificationSpacer = styled.div`
	height: 14px;
	padding-bottom: 4px;
`;

export default function SignUp({ showLogIn, closeModal }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [isUsernameUnique, setIsUsernameUnique] = useState(true);
	const { setUser } = useContext(PostContext);
	const input = useRef(null);
	useInitialFocus(input);

	const createUser = (e) => {
		//check username here
		e.preventDefault();
		if (isUsernameUnique) {
			createUserAccount(username, email, password, setUser);
			setUsername('');
			setPassword('');
			closeModal();
		}
	};

	const checkUsernameAvailable = () => {
		if (username.length >= 1) {
			firebase
				.firestore()
				.collection('usernames')
				.doc(username)
				.get()
				.then((doc) =>
					doc.exists
						? setIsUsernameUnique(false)
						: setIsUsernameUnique(true)
				)
				.catch((err) => console.log(err));
		}
	};

	return (
		<WordsContainer>
			<Title>
				By having an account, you can join, vote, and comment on all
				your favorite content.
			</Title>
			<form onSubmit={createUser}>
				{isUsernameUnique ? (
					<NotificationSpacer />
				) : (
					<InvalidInputNotification>
						Sorry, this username is already taken
					</InvalidInputNotification>
				)}
				<UserNameInput
					type="text"
					focus
					required
					placeholder="Username"
					vale={username}
					ref={input}
					onChange={(e) => {
						setUsername(e.target.value);
						setIsUsernameUnique(true);
					}}
					onBlur={() => checkUsernameAvailable()}
					maxLength="15"
				/>

				<EmailInput
					type="email"
					focus
					required
					placeholder="Email"
					vale={email}
					onChange={(e) => setEmail(e.target.value)}
					maxLength="64"
				/>
				<PasswordInput
					type="password"
					required
					placeholder="Password"
					vale={password}
					onChange={(e) => setPassword(e.target.value)}
					minLength="6"
					maxLength="128"
				/>
				<SignUpBtn type="submit">Sign Up</SignUpBtn>
			</form>
			<P1>Already have an account?</P1>
			<P2 onClick={() => showLogIn()}>LOG IN</P2>
		</WordsContainer>
	);
}

SignUp.propTypes = {
	closeModal: PropTypes.func,
	showLogIn: PropTypes.func,
};
