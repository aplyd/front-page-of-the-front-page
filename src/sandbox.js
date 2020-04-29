//recursively searches post comments to find which comment to reply to

//TODO - add ability to add reply under found parent

export const getParentObject = (object, targetId, objectToAddAsReply) => {
	let targetObject = false;

	for (let i = 0; i < object.replies.length; i++) {
		console.log(object.replies[i].id);
		if (object.replies[i].id === targetId) {
			console.log('found');
			targetObject = true;
		}
		if (object.replies[i].replies.length > 0 && !targetObject) {
			getParentObject(object.replies[i]);
		}
	}

	return targetObject;
};
