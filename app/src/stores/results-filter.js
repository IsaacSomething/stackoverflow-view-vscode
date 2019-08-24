import { writable } from 'svelte/store';

/**
 * label: Refers to the reference from the extension.
 * languageReference: matches object key in i18n.js
 * apiSort: used in the api call ?sort=
 * apiOrder: used in the api call ?order=
 */
export const resultFilters = [
  { label: 'Relevance', languageReference: 'relevance', apiSort: 'relevance', apiOrder: 'desc' },
  { label: 'Newest', languageReference: 'newest', apiSort: 'creation', apiOrder: 'desc' },
  { label: 'Active', languageReference: 'active', apiSort: 'activity', apiOrder: 'desc' },
  { label: 'Oldest', languageReference: 'oldest', apiSort: 'creation', apiOrder: 'asc' },
  { label: 'Votes', languageReference: 'votes', apiSort: 'votes', apiOrder: 'desc' },
];

export const selectedSearchFilter = writable();
export const selectedAnswerFilter = writable(resultFilters[4]);