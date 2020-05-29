import React from 'react';
import styled from 'styled-components';
import { RiLinksLine } from 'react-icons/ri';

const PreviewImage = styled.div`
	position: absolute;
	right: 0;
	top: 0;
	width: 142px;
	height: 98px;
	border-radius: 4px;
	background-image: ${(props) => `url('${props.img}')`};
	color: ${(props) => props.theme.colors.blue};
	border: solid 0.5px ${(props) => props.theme.colors.blue};
`;

const PreviewImageFallback = styled(PreviewImage)`
	background: ${(props) => props.theme.colors.lightGray};
	display: flex;
	align-items: center;
	justify-content: center;
`;

const LinkTitle = styled.h2`
	padding: 4px 134px 20px 8px;
	font-size: 20px;
`;

const SVG = styled.svg``;

const Link = styled.a``;

export default function LinkPreview({ title, url, preview }) {
	return (
		<div>
			<LinkTitle>{title}</LinkTitle>
			{preview ? (
				<PreviewImage>
					<img alt={`link to: ${url}`} src={url}></img>
				</PreviewImage>
			) : (
				<PreviewImageFallback>
					<SVG as={RiLinksLine} />{' '}
				</PreviewImageFallback>
			)}
			<Link
				href={url}
				target="_blank"
				onClick={(e) => e.stopPropagation()}
			>
				{url}
			</Link>
		</div>
	);
}
