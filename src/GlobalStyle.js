import { createGlobalStyle, css } from 'styled-components';

export const roundedGreyBorder = (props) => css`
	background: white;
	border: 1px solid lightgray;
	border-radius: 4px;
`;

export const GlobalStyle = createGlobalStyle`

body, h1, h2, h3, h4, h5, h6, textarea {
    font-family: "IBM Plex Sans", sans-serif;

}

button {
    width: auto;
	height: auto;
	border-radius: 4px;
	padding: 4px 22px 4px 22px;
	font-size: 12px;
	text-align: center;
	text-transform: uppercase;
	margin: 0 4px;
	cursor: pointer;


input:not([type]), input[type="text"] {
	height: 36px;
	width: 100%;
	border-radius: 4px;
	font-size: 16px;
	text-indent: 10px;
	outline: none;
	border: none;
}

}

`;
