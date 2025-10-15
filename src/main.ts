import { NumberCounter } from '../lib/NumberCounter';

const numberCounterItems = document.querySelectorAll('[data-js-number-counter]');

new NumberCounter(numberCounterItems);
