import React from 'react';
import styled from 'styled-components';
import SideBarAboutProject from '../components/SidebarAboutProject/SidebarAboutProject';

//to keep the S.Component naming convention for styled components consistent
const S = {};

S.Container = styled.div``;

export default function Sidebar() {
	return (
		<S.Container>
			<SideBarAboutProject />
		</S.Container>
	);
}
