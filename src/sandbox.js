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
