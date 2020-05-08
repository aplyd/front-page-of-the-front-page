import React from 'react';
import styled from 'styled-components';
import SideBarAboutProject from '../components/SidebarAboutProject/SidebarAboutProject';

//to keep the S.Component naming convention for styled components consistent
const S = {};

S.Container = styled.div`
	grid-column: 2;
	grid-row: 1 / 3;
`;

export default function Sidebar() {
	//TODO - get user count and post count to display in sidebar
	// useEffect(() => {
	// 	let mounted = true;
	// 	const listOfUsers = [];
	// 	const getUserCount = () => {
	// 		firebase
	// 			.firestore()
	// 			.collection('users')
	// 			.get()
	// 			.then((querySnapshot) => {
	// 				querySnapshot.forEach((doc) =>
	// 					listOfUsers.push(doc.data())
	// 				);
	// 			});
	// 	};
	// 	if (mounted) {
	// 		getUserCount();
	// 		setUserCount(listOfUsers.length);
	// 	}
	// 	return () => (mounted = false);
	// }, []);

	return (
		<S.Container>
			<SideBarAboutProject />
		</S.Container>
	);
}
