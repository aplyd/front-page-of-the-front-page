import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import styled from 'styled-components';
import { FaExternalLinkAlt } from 'react-icons/fa';

const Container = styled.div``;

const ImageContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding-top: 12px;
`;

const MediaTitle = styled.h2`
	font-size: 20px;
`;

const Image = styled.img`
	max-height: 512px;
	max-width: 640px;
	padding-right: 40px;
`;

const Video = styled.iframe`
	overflow: hidden;
	width: 100%;
	margin: 0 auto;
	position: absolute;
	height: 100%;
	border: none;
`;

const VideoContainer = styled.div`
	width: 100%;
	position: relative;
	padding-bottom: 56.25%;
	padding-top: 12px 0 16px 0;
`;

const LinkContainer = styled.div`
	cursor: pointer;
	padding-bottom: 12px;
	&& > a {
		color: ${(props) => props.theme.colors.blue};
		font-size: 12px;
	}
	&& > a:visited {
		color: ${(props) => props.theme.colors.blue};
	}
	&& > svg {
		font-size: 10px;
		color: ${(props) => props.theme.colors.blue};
	}
`;

const MediaPreview = ({ title, media }) => {
	const mediaUrl = useRef(media.url);
	const shortenedUrl = media.url
		.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '')
		.split('/')[0];

	return (
		<Container>
			<MediaTitle>{title}</MediaTitle>

			{media.mediaType === 'image' && (
				<ImageContainer>
					<Image src={mediaUrl.current} alt={title} />
				</ImageContainer>
			)}
			{media.mediaType === 'video' && (
				<React.Fragment>
					<LinkContainer>
						<a href={mediaUrl.current}>{shortenedUrl} </a>
						<FaExternalLinkAlt />
					</LinkContainer>
					<VideoContainer>
						<Video
							src={mediaUrl.current}
							width="100%"
							padding-top="100%"
							scrolling="no"
							frameborder="0"
							allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
							allowfullScreen
						></Video>
					</VideoContainer>
				</React.Fragment>
			)}
		</Container>
	);
};

MediaPreview.propTypes = {
	media: PropTypes.shape({
		mediaType: PropTypes.string,
		url: PropTypes.string,
	}),
	title: PropTypes.string,
};

export default MediaPreview;
