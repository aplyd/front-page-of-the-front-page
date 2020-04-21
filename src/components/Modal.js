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
	padding: 10px;
`;

export default function Modal({ closeModal }) {
	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => (document.body.style.overflow = 'unset');
	}, []);

	return (
		<Background onClick={closeModal}>
			<Foreground onClick={(e) => e.stopPropagation()}></Foreground>
		</Background>
	);
}
