import React from 'react';
import styled from 'styled-components';
import SideBarAboutProject from '../components/SidebarAboutProject';

const Container = styled.div`
	grid-column: 2;
	grid-row: 1 / 3;
`;

export default function Sidebar() {
	return (
		<Container>
			<SideBarAboutProject />
		</Container>
	);
}
