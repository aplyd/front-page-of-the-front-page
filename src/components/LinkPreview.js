import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { RiLinksLine } from 'react-icons/ri';
import { FaExternalLinkAlt } from 'react-icons/fa';

const Container = styled.div`
	padding: 4px 0px 24px 8px;
	display: flex;
	flex-direction: column;
`;

const PreviewImage = styled.div`
	position: absolute;
	right: 8px;
	top: 16px;
	width: 142px;
	height: 98px;
	border-radius: 4px;
	color: ${(props) => props.theme.colors.blue};
	border: solid 0.5px ${(props) => props.theme.colors.blue};
	background-image: ${(props) => 'url(' + props.img + ')'};
	background-size: contain;
	background-position: center;
	cursor: pointer;
`;

const PreviewImageFallback = styled(PreviewImage)`
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
`;

const LinkTitle = styled.h2`
	font-size: 20px;
`;

const LinkIcon = styled.svg`
	font-size: 24px;
`;

const GoToIcon = styled.svg`
	background-color: ${(props) => props.theme.colors.blue};
	padding: 5px;
	color: white;
	font-size: 9px;
	border-top-left-radius: 4px;
	position: absolute;
	bottom: 0;
	right: 0;
`;

const Link = styled.a`
	font-size: 12px;
	justify-self: flex-end;
	padding-top: 4px;
	color: ${(props) => props.theme.colors.blue};
	&&:visited {
		color: ${(props) => props.theme.colors.blue};
	}
`;

const LinkContainer = styled.div`
	cursor: pointer;
	&& > svg {
		font-size: 10px;
		color: ${(props) => props.theme.colors.blue};
	}
	&& > p {
		font-size: 12px;
		color: ${(props) => props.theme.colors.blue};
		display: inline;
	}
`;

export default function LinkPreview({ title, url, preview }) {
	const [img, setImg] = useState(null);
	const shortenedUrl = url
		.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '')
		.split('/')[0];

	useEffect(() => {
		if (preview !== null || preview !== undefined) {
			setImg(preview);
		}
	}, [preview]);

	return (
		<Container>
			<LinkTitle>{title}</LinkTitle>
			{preview ? (
				<PreviewImage
					img={img}
					onClick={(e) => {
						e.stopPropagation();
						window.open(url, '_blank');
					}}
				>
					<GoToIcon as={FaExternalLinkAlt}></GoToIcon>
				</PreviewImage>
			) : (
				<PreviewImageFallback
					onClick={(e) => {
						e.stopPropagation();
						window.open(url, '_blank');
					}}
				>
					<GoToIcon as={FaExternalLinkAlt}></GoToIcon>
					<LinkIcon as={RiLinksLine} />{' '}
				</PreviewImageFallback>
			)}
			<LinkContainer>
				<Link
					href={url}
					target="_blank"
					onClick={(e) => e.stopPropagation()}
				>
					{shortenedUrl}
				</Link>
				<p>/... </p>
				<FaExternalLinkAlt />
			</LinkContainer>
		</Container>
	);
}

LinkPreview.propTypes = {
	preview: PropTypes.string,
	title: PropTypes.string,
	url: PropTypes.string,
};
