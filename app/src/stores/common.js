import { writable } from 'svelte/store';

const page = writable(1);
const section = writable();

function kFormatter(num) {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.sign(num) * Math.abs(num);
};

export { page, section, kFormatter }