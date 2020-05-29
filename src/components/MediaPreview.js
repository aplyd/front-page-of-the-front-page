import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Title } from './PostPreview';

const Container = styled.div``;

const Image = styled.img`
	max-height: 512px;
	max-width: 640px;
`;

const Video = styled.video``;

export default function MediaPreview({ title, media }) {
	const [mediaType, setMediaType] = useState(null);
	const [mediaFormat, setMediaFormat] = useState(null);

	useEffect(() => {
		console.log(media);
	}, []);

	return (
		<Container>
			<Title>{title}</Title>
			{mediaType === 'image' && <Image src={media} alt={title} />}
			{mediaType === 'video' && (
				<Video controls autoplay={false}>
					<source src={media} type={mediaFormat && mediaFormat} />
				</Video>
			)}
		</Container>
	);
}
