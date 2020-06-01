import React, { memo } from 'react';
import styled from 'styled-components';
import { MediaPreview } from './MediaPreview';
import LinkPreview from './LinkPreview';
import formatDistance from 'date-fns/formatDistance';
import { FaCommentAlt } from 'react-icons/fa';
import { countReplies } from '../utils';

export const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	grid-column: 2;
	grid-row: 1;
	position: relative;
`;

export const InfoContainer = styled.div`
	display: flex;
	flex-direction: row;
	padding: 8px 8px 4px 8px;
	grid-column: 3;
	&& > p {
		padding-right: 8px;
		color: gray;
		cursor: default;
		font-size: 12px;
	}
`;

export const Title = styled.h2`
	padding: 4px 8px 20px 8px;
	font-size: 20px;
	color: black;
`;

export const ActionContainer = styled.div`
	display: flex;
	flex-direction: row;
	padding-left: 8px;
	border: none;
	grid-column: 2;
	grid-row: 2;
`;

export const ActionButton = styled.button`
	text-transform: capitalize;
	background: white;
	color: gray;
	font-size: 12px;
	border-radius: 4px;
	outline: none;
	border: none;
	padding: 0 4px;
	margin-right: 8px;
	&&:hover {
		cursor: pointer;
		background: lightgray;
	}
`;

export const SVG = styled.svg`
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

const Pinned = styled.p`
	grid-column: 2;
	grid-row: 1;
	color: ${(props) => props.theme.colors.grey};
	font-size: 10px;
	text-transform: uppercase;
	padding: 6px 0 6px 8px;
`;

const Comment = styled(ActionButton)`
	vertical-align: middle;
`;

const Share = styled(ActionButton)`
	cursor: no-drop;
	&&:hover {
		cursor: no-drop;
	}
`;

const CommentSVG = styled.svg`
	position: relative;
	top: 2.5px;
	left: 0px;
`;

export const PreviewContent = memo(({ pinned, username, timestamp, post }) => {
	const commentCount = post ? countReplies(post) : null;

	return (
		<React.Fragment>
			<ContentContainer>
				{pinned ? <Pinned>Pinned by moderators</Pinned> : null}
				<InfoContainer>
					<p>Posted by {username}</p>
					<p>
						{formatDistance(Date.now(), timestamp, {
							includeSeconds: true,
						})}{' '}
						ago
					</p>
				</InfoContainer>

				{post.postType === 'post' && <Title>{post.title}</Title>}
				{post.postType === 'media' && (
					<MediaPreview title={post.title} media={post.postMedia} />
				)}
				{post.postType === 'link' && (
					<LinkPreview
						title={post.title}
						url={post.postLink}
						preview={post.linkPreview}
					/>
				)}
			</ContentContainer>

			<ActionContainer pinned={pinned}>
				<Comment>
					<CommentSVG as={FaCommentAlt} />
					{'  ' + commentCount}{' '}
					{commentCount === 1 ? 'comment' : 'comments'}
				</Comment>
				<Share>share</Share>
			</ActionContainer>
		</React.Fragment>
	);
});
