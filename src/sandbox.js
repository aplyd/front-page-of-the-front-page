export const getParentObject = (postObject, targetId) => {
	let targetObject = false;

	const checkComments = (comments) => {
		comments.forEach((comment) => {
			if (comment.id === targetId) {
				console.log('found');
				//found
				targetObject = true;
			}
		});
	};

	checkComments(postObject.comments);

	return targetObject;
};
