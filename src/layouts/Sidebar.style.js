import styled from 'styled-components';

const Container = styled.div`
	grid-column: 2;
	grid-row: 1 / span 2;
	background: white;
	border: 1px solid lightgray;
	border-radius: 4px;
`;

const AboutCommunityDiv = styled.div`
	background: ${(props) => props.theme.colors.lightGray};
	border-top-right-radius: 4px;
	border-top-left-radius: 4px;

	&& > p {
		padding: 12px;
	}
`;

const Description = styled.p`
	padding: 16px 12px 12px 12px;
	color: black;
	font-size: 13px;
	line-height: 1.4em;
`;

export { Container, AboutCommunityDiv, Description };
