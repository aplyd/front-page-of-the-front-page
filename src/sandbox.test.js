import { getParentObject } from './sandbox';
import { waitForElementToBeRemoved } from '@testing-library/react';

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
	comments: [zero, one],
};

const secondaryTempPost = {
	id: 1,
	title: '',
	username: '',
	vote: 0,
	timestamp: '',
	postText: '',
	comments: [zeroA1, zeroA2],
};

test('test the test', () => {
	console.log(tempPost);
	expect(getParentObject(tempPost, 6)).toStrictEqual(zeroA1);
});

test.only('test function to use recursively', () => {
	expect(getParentObject(secondaryTempPost, 7)).toBe(true);
});
