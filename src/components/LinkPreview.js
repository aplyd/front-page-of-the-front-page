import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { RiLinksLine } from 'react-icons/ri';

const Container = styled.div`
	padding: 4px 164px 20px 8px;
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
`;

const PreviewImageFallback = styled(PreviewImage)`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const LinkTitle = styled.h2`
	font-size: 20px;
`;

const SVG = styled.svg`
	font-size: 24px;
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

export default function LinkPreview({ title, url, preview }) {
	const [img, setImg] = useState(null);

	useEffect(() => {
		console.log(preview);
		if (preview !== null || preview !== undefined) {
			setImg(preview);
		}
	}, [preview]);

	return (
		<Container>
			<LinkTitle>{title}</LinkTitle>
			{preview ? (
				<PreviewImage img={img}></PreviewImage>
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
		</Container>
	);
}
