import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Title } from './PostPreview';

const Container = styled.div``;

const ImageContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Image = styled.img`
	max-height: 512px;
	max-width: 640px;
	padding-right: 40px;
`;

const Video = styled.video``;

export default function MediaPreview({ title, media }) {
	const [mediaType, setMediaType] = useState(null);
	const [mediaFormat, setMediaFormat] = useState(null);

	useEffect(() => {
		if (media.match(/\.(jpeg|jpg|gif|png)$/) !== null) {
			setMediaType('image');
		}
	}, [media]);

	return (
		<Container>
			<Title>{title}</Title>
			{mediaType === 'image' && (
				<ImageContainer>
					<Image src={media} alt={title} />
				</ImageContainer>
			)}
			{mediaType === 'video' && (
				<Video controls autoplay={false}>
					<source
						src={media}
						type={mediaFormat ? mediaFormat : null}
					/>
				</Video>
			)}
		</Container>
	);
}
