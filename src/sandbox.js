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

export const sortReplies = (postObj) => {
	function compare(a, b) {
		if (a.vote < b.vote) {
			return 1;
		}
		if (a.vote > b.vote) {
			return -1;
		}
		return 0;
	}

	// const sorted = postObj.replies.sort(compare).map((post) => post)

	return { ...postObj }.replies
		.sort((a, b) => (a.vote < b.vote ? 1 : -1))
		.map((post) => post);
};

export const validateMediaLink = (url) => {
	//validate image works
	function testImage(url, timeoutT) {
		return new Promise(function (resolve, reject) {
			console.log('in promise');
			var timeout = timeoutT || 5000;
			var timer,
				img = new Image();
			img.onerror = img.onabort = function () {
				clearTimeout(timer);
				reject('error');
			};
			img.onload = function () {
				clearTimeout(timer);
				resolve({ mediaType: 'image', url });
			};
			timer = setTimeout(function () {
				//set .src to invalid jpg so it fails
				img.src = '//!!!!/test.jpg';
				reject('timeout');
			}, timeout);
			img.src = url;
		});
	}

	function getYoutubeId(url) {
		const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
		const match = url.match(regExp);

		return match && match[2].length === 11 ? match[2] : null;
	}

	//check if image
	if (url.match(/\.(jpeg|jpg|gif|png)$/) !== null) {
		console.log('is image');
		return testImage(url)
			.then((url) => url)
			.catch((err) => console.log(err));
	}

	//if video, check it's youtube and then return with embed link
	if (url.includes('youtube') || url.includes('youtu.be')) {
		const id = getYoutubeId(url);

		if (id) {
			return Promise.resolve({
				mediaType: 'video',
				url: 'https://www.youtube.com/embed/' + id,
			});
		} else {
			console.log('bad');
			return Promise.resolve(false);
		}
	}
	return Promise.resolve(false);
};
