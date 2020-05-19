import React, { useContext, useState, useRef } from 'react';
import styled from 'styled-components';
import { PostContext } from '../PostContext';
import firebase from '../firebase';
import { Link, useHistory } from 'react-router-dom';
import { useSearchBarPosition } from '../hooks/useSearchBarPosition';
import { filterPosts } from '../utils';
import { BsFillPersonFill } from 'react-icons/bs';
import { FiLogIn } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import { IoIosCreate } from 'react-icons/io';
import { useWindowWidth } from '../hooks/useWindowWidth';

const Container = styled.div`
	background: white;
	height: 48px;
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0 20px;
	font-family: ${(props) => props.theme.font.family[0]};
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 1000;
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
	height: 34px;
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
	margin-left: 16px;
	:hover {
		color: ${(props) => props.theme.colors.lightBlue};
		border: 1px solid ${(props) => props.theme.colors.lightBlue};
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
	right: 8px;
	width: 200px;
	border-radius: 4px;
	box-shadow: 0px 0px 17px 2px rgba(0, 0, 0, 0.22);
	z-index: 1000;
	&& > div:first-child {
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
	}
	&& > div:last-child {
		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;
	}
`;

const SVG = styled.svg`
	color: ${(props) => props.theme.colors.grey};
	font-size: 32px;
	cursor: pointer;
`;

const SVGlogin = styled.svg`
	position: relative;
	font-size: 16px;
	cursor: pointer;
	top: 1px;
	color: ${(props) => props.theme.colors.grey};
`;

const ProfileItem = styled.div`
	height: 45px;
	background: white;
	cursor: ${(props) => (props.action ? 'pointer' : null)};
	&&:hover {
		background: ${(props) => props.theme.colors.blue};
		color: white;
		${SVGlogin} {
			color: white;
		}
	}
	&& > div {
		display: flex;
		flex-direction: row;
		padding-top: 14px;
		padding-left: 16px;
		border-radius: 4px;
	}
	&& > div > p {
		padding-left: 16px;
		font-size: 14px;
	}
`;

const Title = styled.h2`
	padding-right: 16px;
	cursor: pointer;
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
	const [areSearchResultsOpen, setAreSearchResultsOpen] = useState(false);
	const [searchResults, setSearchResults] = useState([]);
	const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
	const history = useHistory();
	const [windowWidth, setWindowWidth] = useState();
	useWindowWidth(setWindowWidth);

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

	const displayLogInButtons = () => {
		if (user.isSignedIn || windowWidth < 640) {
			return null;
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

			{windowWidth > 480 ? (
				<Title onClick={() => history.push('/')}>fpotfp</Title>
			) : null}

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
					{/* it checks if there are search results and then */}
					{/* displays "no results found", the results or nothing */}
					{/* nested ternary */}
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

			{displayLogInButtons()}
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
					{user.isSignedIn ? (
						<>
							<ProfileItem>
								<div>
									<SVGlogin as={FaUserCircle} />
									<p>{user.username}</p>
								</div>
							</ProfileItem>
							<ProfileItem
								action={'true'}
								onClick={() => history.push('/submit')}
							>
								<div>
									<SVGlogin as={IoIosCreate} />
									<p>Create Post</p>
								</div>
							</ProfileItem>
						</>
					) : null}

					<ProfileItem
						action={'true'}
						onClick={() =>
							user.isSignedIn ? logOutUser() : openModal('login')
						}
					>
						<div>
							<SVGlogin as={FiLogIn} />
							<p>
								{user.isSignedIn
									? 'Log Out'
									: 'Log In / Sign Up'}
							</p>
						</div>
					</ProfileItem>
				</ProfileDropdown>
			) : null}
		</Container>
	);
}
