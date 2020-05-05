import React, { useContext, useState } from 'react';
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
	border: 0.5px solid rgb(0, 121, 211);
	max-width: 598px;
	margin: 0 auto;
	&&:hover {
		border: 0.5px solid rgb(0, 121, 211);
	}
`;

export const LoginBtn = styled.button`
	color: ${(props) => props.theme.colors.blue};
	background-color: white;
	border: 1px solid ${(props) => props.theme.colors.blue};
	line-height: 24px;
	:hover {
		color: ${(props) => props.theme.colors.lightBlue};
		border: 1px solid ${(props) => props.theme.colors.lightBlue};
	}
`;

const SubmitLink = styled.a`
	color: ${(props) => props.theme.colors.blue};
	&&:hover && :active {
		color: ${(props) => props.theme.colors.blue};
	}
`;

export const SignInBtn = styled.button`
	color: white;
	background-color: ${(props) => props.theme.colors.blue};
	border: 1px solid white;
	line-height: 24px;
	:hover {
		background-color: ${(props) => props.theme.colors.lightBlue};
	}
`;

const SearchResultsDropDown = styled.div`
	position: absolute;
	height: 100px;
	width: 100px;
	background: pink;
`;

export default function Nav({ openModal, closeModal }) {
	const { user, setUser, posts } = useContext(PostContext);
	const [searchInput, setSearchInput] = useState('');

	const handleSearchInput = (input) => {
		setSearchInput(input);
		console.log(searchInput);

		// if (searchInput.length > 1) {
		// 	console.log('filter');
		// 	const results = posts.filter((post) => {
		// 		const search = searchInput.toLowerCase();
		// 		const title = post.title.toLowerCase();
		// 		const body = post.postText.toLowerCase();
		// 		if (
		// 			title.indexOf(search) === -1 ||
		// 			body.indexOf(search) === -1
		// 		) {
		// 			return false;
		// 		}
		// 		return true;
		// 	});
		// 	console.log(results);
		// }
	};

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

			<Search
				type="text"
				placeholder="Search"
				onChange={(e) => handleSearchInput(e.target.value)}
				value={searchInput}
			/>

			<SearchResultsDropDown></SearchResultsDropDown>

			{displayLoggedInStatus()}
		</Container>
	);
}
