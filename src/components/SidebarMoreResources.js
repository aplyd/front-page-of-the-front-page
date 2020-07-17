import React from 'react';
import {
	AboutContainer,
	AboutProjectDiv,
	Spacer,
	Description,
} from './SidebarAboutProject';

export default function SidebarMoreResources() {
	return (
		<AboutContainer>
			<AboutProjectDiv>
				<p>Development Tools</p>
			</AboutProjectDiv>
			<Spacer height={12} />
			<Description>
				&middot; React
				<br />
				&middot; Styled-components
				<br />
				&middot; Firebase Firestore
				<br />
			</Description>
		</AboutContainer>
	);
}
