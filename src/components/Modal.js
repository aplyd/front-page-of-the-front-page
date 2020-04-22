import React, { useEffect } from 'react';
import styled from 'styled-components';

const Background = styled.div`
	height: 100%;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: space-around;
	align-items: center;
`;
const Foreground = styled.div`
	height: 550px;
	width: 750px;
	margin: auto;
	border-radius: 4px;
	background: white;
`;

const Container = styled.div`
	border-radius: 4px;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
`;

const Art = styled.div`
	height: 100%;
	width: 130px;
	background: rgba(0, 0, 0, 0);
	background-color: lightgrey;
	border-top-left-radius: 4px;
	border-bottom-left-radius: 4px;
`;

const Content = styled.div`
	height: 540px;
	width: 100%;
	margin: 5px 5px 5px 0;
	display: flex;
	flex-direction: column;
`;

const CloseContainer = styled.div`
	width: 100%;
	height: 240px;
`;

export default function Modal({ closeModal, children }) {
	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => (document.body.style.overflow = 'unset');
	}, []);

	return (
		<Background onClick={closeModal}>
			<Foreground onClick={(e) => e.stopPropagation()}>
				<Container>
					<Art />
					<Content>
						<CloseContainer />
						{children}
					</Content>
				</Container>
			</Foreground>
		</Background>
	);
}
