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

	return (
		<Container>
			<Title>{title}</Title>
			{media.mediaType === 'image' && (
				<ImageContainer>
					<Image src={media.url} alt={title} />
				</ImageContainer>
			)}
			{media.mediaType === 'video' && (
				<Video controls autoplay={false}>
					<source
						src={media.url}
						// type={mediaFormat ? mediaFormat : null}
					/>
				</Video>
			)}
		</Container>
	);
}
