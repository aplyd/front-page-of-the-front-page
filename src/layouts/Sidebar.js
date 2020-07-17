import React from 'react';
import styled from 'styled-components';
import SidebarAboutProject from '../components/SidebarAboutProject';
import SidebarMoreResources from '../components/SidebarMoreResources';

const Container = styled.div`
	grid-column: 2;
	grid-row: 1 / 3;
`;

const Spacer = styled.div`
	height: 12px;
	width: 100%;
`;

export default function Sidebar() {
	return (
		<Container>
			<SidebarAboutProject />
			<Spacer />
			<SidebarMoreResources />
		</Container>
	);
}
