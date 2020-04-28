import React, { useContext } from 'react';
import styled from 'styled-components';
import { PostContext } from '../PostContext';
import firebase from '../firebase';
import { Link } from 'react-router-dom';

const Container = styled.div`
	background: white;
	height: 48px;
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0 20px;
	font-family: ${(props) => props.theme.font.family[0]};
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
	font-size: 16px;
	text-indent: 10px;
	border: none;
	max-width: 598px;
	margin: 0 auto;
	&&:hover {
		border: 0.5px solid rgb(0, 121, 211);
	}
`;

const LoginBtn = styled.button`
	color: ${(props) => props.theme.colors.blue};
	background-color: white;
	border: 1px solid ${(props) => props.theme.colors.blue};
	line-height: 24px;
`;

const SubmitLink = styled.a`
	color: ${(props) => props.theme.colors.blue};
	&&:hover && :active {
		color: ${(props) => props.theme.colors.blue};
	}
`;

const SignInBtn = styled.button`
	color: white;
	background-color: ${(props) => props.theme.colors.blue};
	border: 1px solid white;
	line-height: 24px;
`;

export default function Nav({ openModal, closeModal }) {
	const { user, setUser } = useContext(PostContext);

	const logOutUser = () => {
		firebase
			.auth()
			.signOut()
			.then(
				() => {
					console.log('Signed Out', user);
					closeModal(null);
					setUser(false);
				},
				(error) => {
					console.error('Sign Out Error', error);
				}
			);
	};

	const displayLoggedInStatus = () => {
		if (user.isSignedIn) {
			return (
				<React.Fragment>
					<LoginBtn type="button">
						<SubmitLink as={Link} to="/submit">
							Create Post
						</SubmitLink>
					</LoginBtn>
					<SignInBtn type="button" onClick={() => logOutUser()}>
						log out
					</SignInBtn>
				</React.Fragment>
			);
		} else {
			return (
				<React.Fragment>
					<LoginBtn type="button" onClick={() => openModal('login')}>
						log in
					</LoginBtn>
					<SignInBtn
						type="button"
						onClick={() => openModal('signup')}
					>
						sign up
					</SignInBtn>
				</React.Fragment>
			);
		}
	};

	return (
		<Container>
			<Circle as={Link} to="/" />

			<Search type="text" placeholder="Search" />

			{displayLoggedInStatus()}
		</Container>
	);
}
