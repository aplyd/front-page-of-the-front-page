import { createGlobalStyle, css } from 'styled-components';

export const roundedGreyBorder = (props) => css`
	background: white;
	border: 1px solid lightgray;
	border-radius: 4px;
`;

export const GlobalStyle = createGlobalStyle`

body {
    font-family: "IBM Plex Sans", sans-serif;
}

button {
    width: auto;
	height: auto;
	border-radius: 4px;
	padding: 3px 16px 3px 16px;
	font-size: 12px;
	text-align: center;
	text-transform: uppercase;
	margin: 0 4px;
	&&:hover {
		cursor: pointer;
	}


    input:not([type]), input[type="text"] {
    height: 36px;
	width: 100%;
	border-radius: 4px;
    font-size: 16px;
	text-indent: 10px;
}



}

`;
