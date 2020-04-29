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
} = {}) => ({
	commentInput,
	timestamp,
	points,
	replies,
	username,
	id,
	depth,
});

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
