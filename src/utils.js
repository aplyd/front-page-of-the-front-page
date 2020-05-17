import { v4 as uuidv4 } from 'uuid';

export const SORT_OPTIONS = {
	TIME_ASC: { column: 'timestamp', direction: 'asc' },
	TIME_DESC: { column: 'timestamp', direction: 'desc' },
	VOTE_ASC: { column: 'vote', direction: 'asc' },
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
		console.log(object);
	} else {
		object.replies.forEach((obj) => {
			setCommentAsDeleted(obj, targetId);
		});
	}

	return object.replies;
};

export const insertReply = (object, targetId, replyToAdd) => {
	if (object.id === targetId) {
		object.replies.push(replyToAdd);
		console.log(replyToAdd);
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

export const getNewVoteCount = (votes, id, direction, vote) => {
	let newVoteCount;

	if (votes[id] === direction) {
		//do nothing - this block is to filter out double votes
	} else {
		if (votes[id] === 'up') {
			//this block is to vote down after previously voting up
			newVoteCount = vote - 2;
		} else if (votes[id] === 'down') {
			//this block is to vote up after previously voting down
			newVoteCount = vote + 2;
		} else {
			//this block gets the direction for first vote
			direction === 'up'
				? (newVoteCount = vote + 1)
				: (newVoteCount = vote - 1);
		}
	}
	return newVoteCount;
};
