import { v4 as uuidv4 } from 'uuid';

export const SORT_OPTIONS = {
	TIME_ASC: {
		column: 'timestamp',
		direction: 'asc',
		column2: 'vote',
		direction2: 'asc',
	},
	TIME_DESC: {
		column: 'timestamp',
		direction: 'desc',
		column2: 'vote',
		direction2: 'asc',
	},
	VOTE_ASC: {
		column: 'vote',
		direction: 'asc',
		column2: 'timestamp',
		direction2: 'asc',
	},
};

export const Comment = ({
	commentInput = '',
	timestamp = Date.now(),
	username = '',
	points = 1,
	replies = [],
	id = uuidv4(),
	depth = 0,
	deleted = false,
} = {}) => ({
	commentInput,
	timestamp,
	points,
	replies,
	username,
	id,
	depth,
	deleted,
});

export const setCommentAsDeleted = (object, targetId) => {
	if (object.id === targetId) {
		object.deleted = true;
	} else {
		object.replies.forEach((obj) => {
			setCommentAsDeleted(obj, targetId);
		});
	}

	return object.replies;
};

export const withNewCommentVote = (object, targetId, newVoteCount) => {
	if (object.id === targetId) {
		object.points = newVoteCount;
	} else {
		object.replies.forEach((obj) => {
			withNewCommentVote(obj, targetId, newVoteCount);
		});
	}
	return object;
};

export const insertReply = (object, targetId, replyToAdd) => {
	if (object.id === targetId) {
		object.replies.push(replyToAdd);
	} else {
		object.replies.forEach((obj) => {
			insertReply(obj, targetId, replyToAdd);
		});
	}
	return object.replies;
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
export const validateMediaLink = (url) => {
	//validate image works
	function testImage(url, timeoutT) {
		return new Promise(function (resolve, reject) {
			var timeout = timeoutT || 5000;
			var timer,
				img = new Image();
			img.onerror = img.onabort = function () {
				clearTimeout(timer);
				resolve(false);
			};
			img.onload = function () {
				clearTimeout(timer);
				resolve({ mediaType: 'image', url });
			};
			timer = setTimeout(function () {
				//set .src to invalid jpg so it fails
				img.src = '//!!!!/test.jpg';
				resolve(false);
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
		return testImage(url).catch((err) => console.log(err));
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
			return Promise.resolve(false);
		}
	}
	return Promise.resolve(false);
};
