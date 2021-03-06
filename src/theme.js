import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
	colors: {
		red: 'rgb(255, 69, 0)',
		blue: '#0079d3',
		black: '#000',
		gray: '#707070',
		grey: '#707070',
		veryLightGray: 'rgb(230, 230,230)',
		veryLightGrey: 'rgb(230, 230,230)',
		lightGray: 'rgb(215, 215, 215)',
		lightGrey: 'rgb(215, 215, 215)',
		backgroundBlue: '#dae0e6',
		lightBlue: '#3394dc',
	},
	font: {
		family: ['"IBM Plex Sans", sans-serif'],
		size: {
			xs: '12px',
			s: '16px',
			m: '18px',
			l: '20px',
		},
	},
};

const Theme = ({ children }) => (
	<ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
