import { NumberCounter } from '../lib/NumberCounter';

const numberCounterItems = document.querySelectorAll<HTMLElement>('[data-js-number-counter]');

new NumberCounter(numberCounterItems);
