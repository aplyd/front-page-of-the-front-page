import {
	insertReply,
	countReplies,
	filterPosts,
	sortReplies,
	validateMediaLink,
} from './sandbox';

const zeroA2 = {
	id: 7,
	username: 'RookyNumbs',
	points: 4,
	commentInput:
		'Fugiat amet velit ad proident laborum sunt velit mollit adipisicing pariatur aliquip ad aliqua ipsum.',
	timestamp: Date.now(),
	replies: [],
	depth: 2,
};

const zeroA1 = {
	id: 6,
	username: 'RookyNumbs',
	points: 4,
	commentInput:
		'Fugiat amet velit ad proident laborum sunt velit mollit adipisicing pariatur aliquip ad aliqua ipsum.',
	timestamp: Date.now(),
	replies: [],
	depth: 2,
};

const zeroB = {
	id: 5,
	username: 'RookyNumbs',
	points: 4,
	commentInput:
		'Fugiat amet velit ad proident laborum sunt velit mollit adipisicing pariatur aliquip ad aliqua ipsum.',
	timestamp: Date.now(),
	replies: [],
	depth: 1,
};

const zeroA = {
	id: 4,
	username: 'RookyNumbs',
	points: 4,
	commentInput:
		'Fugiat amet velit ad proident laborum sunt velit mollit adipisicing pariatur aliquip ad aliqua ipsum.',
	timestamp: Date.now(),
	replies: [zeroA1, zeroA2],
	depth: 1,
};

const zero = {
	id: 3,
	username: 'RookyNumbs',
	points: 4,
	commentInput:
		'Laborum excepteur veniam eiusmod consequat minim sunt ea ullamco. Sit dolore tempor incididunt est cillum aliquip incididunt est commodo labore. Labore est amet et sint eiusmod Lorem adipisicing. Ad reprehenderit eu ex aliqua. Nisi ea excepteur veniam ea deserunt quis minim eu do dolor. Ad aliqua aliquip et ea elit culpa irure non voluptate ut non.',
	timestamp: Date.now(),
	replies: [zeroA, zeroB],
	depth: 0,
};

const one = {
	id: 2,
	username: 'RookyNumbs',
	points: 4,
	commentInput:
		'Fugiat amet velit ad proident laborum sunt velit mollit adipisicing pariatur aliquip ad aliqua ipsum.',
	timestamp: Date.now(),
	replies: [],
	depth: 0,
};

const tempPost = {
	id: 1,
	title: '',
	username: '',
	vote: 0,
	timestamp: '',
	postText: '',
	replies: [zero, one],
};

///////////////////////////

// test('test the test', () => {
// 	const added = insertReply(tempPost, 5, NEWREPLY);

// 	expect(added).toStrictEqual(tempPost2);
// });

test('check counting', () => {
	expect(countReplies(tempPost)).toBe(6);
});

const postsArr = [
	{
		id: 'abc0a514-8b99-4907-b3e7-fe8f9760affe',
		vote: 1,
		username: 'austin',
		title:
			'this is a super long title to see how it displays on the front page lmaooooo lets goo my dudes',
		timestamp: 1588632983733,
		postText: 'I thought this was optional ya ho',
	},
	{
		id: '89d2d96e-4fff-4da5-b3c2-13ed975db2fc',
		replies: [],
		postText: 'what r u waiting for',
		vote: 1,
		username: 'austin',
		timestamp: 1588631863098,
		title: 'something dumb',
	},
	{
		id: '26e0da6b-9044-493c-845e-9e0be467f48a',
		vote: 1,
		username: 'austin',
		timestamp: 1588631622400,
		title: 'new posterb',
		replies: [],
		postText: 'sarah jean michellle late',
	},
	{
		id: '12658748-8aed-44c2-a207-1375ff29a338',
		replies: [],
		postText: 'watcha know about it son',
		vote: 1,
		username: 'austin',
		title: 'beans in jeans',
		timestamp: 1588628609982,
	},
	{
		id: 'eea3a24e-352c-4cff-b3c9-f25086e4a88a',
		postText: 'its not too late, its never too late',
		vote: 1,
		username: 'austin',
		title: 'sk8 or die late',
		timestamp: 1588627523841,
	},
	{
		id: '6421785e-8bcd-4cd4-8b85-77d25d603f13',
		vote: 4,
		username: 'austin',
		title: 'cheesebrgg late',
		timestamp: 1588215356657,
		postText: 'in pants',
	},
];

const filteredArr = [
	{
		id: '26e0da6b-9044-493c-845e-9e0be467f48a',
		vote: 1,
		username: 'austin',
		timestamp: 1588631622400,
		title: 'new posterb',
		replies: [],
		postText: 'sarah jean michellle late',
	},
	{
		id: 'eea3a24e-352c-4cff-b3c9-f25086e4a88a',
		postText: 'its not too late, its never too late',
		vote: 1,
		username: 'austin',
		title: 'sk8 or die late',
		timestamp: 1588627523841,
	},
	{
		id: '6421785e-8bcd-4cd4-8b85-77d25d603f13',
		vote: 4,
		username: 'austin',
		title: 'cheesebrgg late',
		timestamp: 1588215356657,
		postText: 'in pants',
	},
];

test('hello its me', () => {
	expect(filterPosts(postsArr, 'late')).toStrictEqual(filteredArr);
});

const postObj = {
	replies: [
		{ id: 1, vote: 9 },
		{ id: 2, vote: 12 },
		{ id: 3, vote: 21 },
		{ id: 4, vote: 4 },
		{ id: 5, vote: 46 },
	],
};

const sortedPostObj = {
	replies: [
		{ id: 5, vote: 46 },
		{ id: 3, vote: 21 },
		{ id: 2, vote: 12 },
		{ id: 1, vote: 9 },
		{ id: 4, vote: 4 },
	],
};

test('should sort', () => {
	expect(sortReplies(postObj)).toStrictEqual(sortedPostObj.replies);
});

test('standard', () => {
	const url = 'https://youtu.be/yVpbFMhOAwE';
	const response = validateMediaLink(url);
	expect(response).toBeTruthy();
});

test('variant', () => {
	const url = 'https://www.youtube.com/watch?v=8Z5EjAmZS1o';
	const response = validateMediaLink(url);
	expect(response).toBeTruthy();
});

test('embed', () => {
	const url = 'https://www.youtube.com/embed/yVpbFMhOAwE';
	const response = validateMediaLink(url);
	expect(response).toBeTruthy();
});

test('shouldnt return iframe', () => {
	const url =
		'<iframe width="560" height="315" src="https://www.youtube.com/embed/Tlf00NT6mig" frameborder="0" allowfullscreen></iframe>';
	expect.assertions(1);
	return validateMediaLink(url).then((res) => res);
});

test('valid image', () => {
	const url = 'https://i.redd.it/w4y5n0m5e7p41.png';
	const response = validateMediaLink(url).then((res) => res);
	console.log(response);
	expect(response).toBeTruthy();
});
