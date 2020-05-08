import React, { useContext, useState, useRef } from 'react';
import styled from 'styled-components';
import { PostContext } from '../PostContext';
import firebase from '../firebase';
import { Link, useHistory } from 'react-router-dom';
import { useSearchBarPosition } from '../hooks/useSearchBarPosition';
import { filterPosts } from '../utils';
import { BsFillPersonFill } from 'react-icons/bs';

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
	max-height: 360px;
	overflow: scroll;
	width: ${(props) => props.width + 'px'};
	top: ${(props) => props.top + 'px'};
	left: ${(props) => props.left + 'px'};
	background: white;
	border-bottom-right-radius: 4px;
	border-bottom-left-radius: 4px;
	box-shadow: 0px 0px 17px 2px rgba(0, 0, 0, 0.22);
	z-index: 1000;
`;

const ResultCard = styled.div`
	height: 90px;
	overflow: hidden;
	padding-left: 16px;
	padding-right: 16px;
	padding-bottom: 8px;
	border-bottom-right-radius: 4px;
	border-bottom-left-radius: 4px;
	cursor: pointer;
	&&:hover {
		background: ${(props) => props.theme.colors.veryLightGray};
	}
`;

const ResultTitle = styled.div`
	color: ${(props) => props.theme.colors.blue};
	font-size: ${(props) => props.theme.font.size.m};
	padding: 12px 0 4px 0;
	cursor: pointer;
`;

const ResultContent = styled.div`
	color: ${(props) => props.theme.colors.gray};
	padding: 0 0 0 0;
	cursor: pointer;
`;

const ProfileContainer = styled.div`
	padding-left: 10px;
	display: flex;
	flex-direction: row;
`;

const ProfileDropdown = styled.div`
	position: absolute;
	top: ${(props) => props.top + 'px'};
	right: 0px;
	width: 240px;
	border-radius: 4px;
	box-shadow: 0px 0px 17px 2px rgba(0, 0, 0, 0.22);
	z-index: 1000;
`;

const SVG = styled.svg`
	color: ${(props) => props.theme.colors.grey};
	font-size: 28px;
	cursor: pointer;
`;

const ProfileItem = styled.div`
	height: 60px;
	display: flex;
	flex-direction: row;
	background: white;
	cursor: pointer;
	&&:hover {
		background: ${(props) => props.theme.colors.blue};
		color: white;
	}
`;

export default function Nav({ openModal, closeModal, viewPostComments }) {
	const { user, setUser, posts } = useContext(PostContext);
	const [searchInput, setSearchInput] = useState('');
	const searchBarRef = useRef(null);
	const {
		searchBarWidth,
		searchBarBottom,
		searchBarLeft,
	} = useSearchBarPosition(searchBarRef, user.isSignedIn);
	//dont forget to set back to false
	const [areSearchResultsOpen, setAreSearchResultsOpen] = useState(false);
	const [searchResults, setSearchResults] = useState([]);
	const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
	const history = useHistory();

	const handleSearchInput = (input) => {
		setAreSearchResultsOpen(true);
		setSearchInput(input);

		const results = filterPosts(posts, searchInput);
		setSearchResults(results);
	};

	const viewSearchResult = (postId, url) => {
		viewPostComments(postId);
		history.push(`/comments/${url}/${postId}`);
		setAreSearchResultsOpen(false);
		setSearchInput('');
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
				ref={searchBarRef}
				// onBlur={removeSearchInputFocus}
			/>

			{areSearchResultsOpen && (
				<SearchResultsDropDown
					top={searchBarBottom}
					left={searchBarLeft}
					width={searchBarWidth}
				>
					{/* this is the least readable code ive ever written */}
					{/* it checks if there are search results and then either */}
					{/* displays no results found, the results or nothing */}
					{searchInput.length > 0 && searchResults.length === 0 ? (
						<ResultCard key="no-results">
							<ResultTitle></ResultTitle>
							<ResultContent>No results found...</ResultContent>
						</ResultCard>
					) : searchInput.length > 0 ? (
						searchResults.map((post, index) => {
							const url = post.title
								.replace(/\s+/g, '-')
								.toLowerCase();
							return (
								<ResultCard
									key={index}
									onClick={() =>
										viewSearchResult(post.id, url)
									}
								>
									<ResultTitle>{post.title}</ResultTitle>
									<ResultContent>
										{post.postText}
									</ResultContent>
								</ResultCard>
							);
						})
					) : null}
				</SearchResultsDropDown>
			)}

			{displayLoggedInStatus()}
			<ProfileContainer>
				<SVG
					as={BsFillPersonFill}
					onClick={() =>
						setIsProfileDropdownOpen(!isProfileDropdownOpen)
					}
				/>
			</ProfileContainer>
			{isProfileDropdownOpen ? (
				<ProfileDropdown
					top={searchBarBottom}
					onMouseLeave={() => setIsProfileDropdownOpen(false)}
				>
					<ProfileItem>
						<p>username:</p>
					</ProfileItem>
					<ProfileItem>
						<p>sign up/login</p>
					</ProfileItem>
				</ProfileDropdown>
			) : null}
		</Container>
	);
}
