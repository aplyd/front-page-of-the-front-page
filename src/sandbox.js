//recursively searches post comments to find which comment to reply to

// let targetObject = false;
// export const getParentObject = (object, targetId, replyToAdd) => {
// 	for (let i = 0; i < object.replies.length; i++) {
// 		console.log(object.replies[i].id);
// 		if (object.replies[i].id === targetId) {
// 			object.replies[i].push(replyToAdd);
// 			targetObject = true;
// 		}
// 		if (object.replies[i].replies.length > 0 && !targetObject) {
// 			getParentObject(object.replies[i], targetId, replyToAdd);
// 		}
// 	}
// };

export const insertReply = (object, targetId, replyToAdd) => {
	if (object.id === targetId) {
		object.replies.push(replyToAdd);
		console.log(replyToAdd);
	} else {
		object.replies.forEach((obj) => {
			insertReply(obj, targetId, replyToAdd);
		});
	}
	return object;
};

export const countReplies = (object) => {
	let counter = 0;

	const count = (object) => {
		for (let i = 0; i < object.replies.length; i++) {
			counter++;
			if (object.replies[i].replies.length > 0) {
				count(object.replies[i]);
			}
		}
	};

	count(object);
	return counter;
};

export const filterPosts = (postsArr, search) => {
	const results = postsArr.filter((post) => {
		console.log(post.title);
		if (
			post.title.indexOf(search) !== -1 ||
			post.postText.indexOf(search) !== -1
		) {
			return true;
		}
		return false;
	});

	return results;
};
