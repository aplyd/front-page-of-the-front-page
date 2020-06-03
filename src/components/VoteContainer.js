import React, { useContext, useState, useEffect, memo } from 'react';
import styled from 'styled-components';
import { GoArrowDown, GoArrowUp } from 'react-icons/go';
import { PostContext } from '../PostContext';

export const Container = styled.div`
	height: 100%;
	color: gray;
	grid-column: 1;
	&& > div {
		padding: 10px 0 0 8px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
`;

const SVG = styled.svg`
	border-radius: 4px;
	color: ${(props) => {
		if (props.direction === props.uservote) {
			return props.direction === 'up'
				? props.theme.colors.red
				: props.theme.colors.blue;
		}
	}};
	background-color: ${(props) =>
		props.direction === props.uservote
			? props.theme.colors.lightGray
			: null};
	&&:hover {
		color: ${(props) =>
			props.direction === 'up'
				? props.theme.colors.red
				: props.theme.colors.blue};
		background-color: ${(props) => props.theme.colors.lightGray};
		cursor: pointer;
	}
`;

export const Vote = styled.p`
	font-size: ${(props) => props.theme.font.size.xs};
	color: ${(props) => {
		if (props.userVote === 'up') {
			return props.theme.colors.red;
		} else if (props.userVote === 'down') {
			return props.theme.colors.blue;
		} else {
			return 'black';
		}
	}};
	padding: 6px 0;
	cursor: default;
	font-weight: bold;
`;

const VoteContainer = memo(({ id, vote }) => {
	const { castPostVote, user } = useContext(PostContext);
	const [userVote, setUserVote] = useState(null);

	console.log({ id });
	console.log({ vote });
	useEffect(() => {
		const checkForUserVote = () => {
			if (user.postVotes.hasOwnProperty(id)) {
				setUserVote(user.postVotes[id]);
			}
		};
		user.postVotes && checkForUserVote();
	}, [userVote, setUserVote, id, user.postVotes]);

	return (
		<Container>
			<div>
				<SVG
					as={GoArrowUp}
					onClick={(e) =>
						castPostVote(e, 'up', id, vote, setUserVote, 'home')
					}
					direction={'up'}
					uservote={userVote}
				/>
				<Vote userVote={userVote}>{vote}</Vote>
				<SVG
					as={GoArrowDown}
					onClick={(e) =>
						castPostVote(e, 'down', id, vote, setUserVote, 'home')
					}
					direction={'down'}
					uservote={userVote}
				/>
			</div>
		</Container>
	);
});

export default VoteContainer;
