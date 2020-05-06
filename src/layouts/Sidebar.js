import React, { useEffect, useState } from 'react';
import * as S from './Sidebar.style';
import firebase from '../firebase';

export default function Sidebar() {
	const [userCount, setUserCount] = useState();

	// useEffect(() => {
	// 	firebase
	// 		.firestore()
	// 		.collection('user')
	// 		.get()
	// 		.then((x) => {
	// 			const users = x.map((user) => x.data());
	// 			console.log(users);
	// 		});
	// }, []);

	return (
		<S.Container>
			<S.AboutCommunityDiv>
				<p>About Community</p>
			</S.AboutCommunityDiv>
			<S.Description>
				Welcome to the front page of the front page! This was built by
				me, Austin Ftacnik, for my final project of The Odin Project
				JavaScript course. If you haven't figured it out yet, this is a
				simplified clone of popular website and was built for learning
				purposes, not to replace said site. If you have any questions or
				comments, feel free to contact via Github or Twitter. <br />
				<br />
				Cheers.
			</S.Description>
		</S.Container>
	);
}
