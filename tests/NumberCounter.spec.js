import { Window } from 'happy-dom';
import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { NumberCounter } from '../lib/NumberCounter.js';

// Utility to create a small delay
async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const IntersectionObserverMock = vi.fn((callback) => {

  const unobserve = vi.fn();

  // Simulate observing and immediately call the callback with the target element
  return {
    observe: (element) => {
      // Immediately call the callback simulating intersection
      callback([{ isIntersecting: true, target: element }], { unobserve });
    },
    disconnect: vi.fn(),
    takeRecords: vi.fn(),
    unobserve,
  };
});


vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

// Initialise Happy DOM
const window = new Window({
  url: 'http://localhost:3000' // A url is required for cookies to work.
});
const document = window.document;

// Make window and document global
global.window = window;
global.document = document;

// Make sure the document is in a clear state before each test.
beforeEach(() => {
  document.body.innerHTML = '';
});

afterEach(()=> {
  vi.restoreAllMocks();
});

describe('Tests for our packages', () => {
  it('should work', () => {
    expect(1).toBe(1);
  });
});

/**
     * The HTML used to assert our tests against.
     * @type {string}
     */
const basicTestMarkup = `
  <div data-js-number-counter>
    123456
  </div>
`;


describe('Number counter initialisation', () => {
  it('should work when passed a string as a selector to initialise', () => {
    document.body.innerHTML = basicTestMarkup;

    const selector = '[data-js-number-counter]';

    const counters = document.querySelectorAll(selector);

    new NumberCounter(selector);

    expect(selector).toBeTypeOf('string');

    counters.forEach(counter => {
      const wrappingElement = counter.querySelectorAll('span[data-js-animate-number]');

      expect(wrappingElement.length).toBeGreaterThan(0);
      expect(wrappingElement[0].textContent).toBe('123456');
    });

  });

  it('should work when passed an HTMLElement as a selector to initialise', () => {
    document.body.innerHTML = basicTestMarkup;

    const selector = document.querySelector('[data-js-number-counter]');
    const counters = document.querySelectorAll('[data-js-number-counter]');

    new NumberCounter(selector);

    expect(selector).toBeInstanceOf(HTMLElement);

    counters.forEach(counter => {
      const wrappingElement = counter.querySelectorAll('span[data-js-animate-number]');

      expect(wrappingElement.length).toBeGreaterThan(0);
      expect(wrappingElement[0].textContent).toBe('123456');
    });
  });

  it('should work when passed a NodeList as a selector to initialise', () => {
    document.body.innerHTML = basicTestMarkup;

    const selector = document.querySelectorAll('[data-js-number-counter]');
    const counters = document.querySelectorAll('[data-js-number-counter]');

    new NumberCounter(selector);

    counters.forEach(counter => {
      const wrappingElement = counter.querySelectorAll('span[data-js-animate-number]');

      expect(wrappingElement.length).toBeGreaterThan(0);
      expect(wrappingElement[0].textContent).toBe('123456');
    });
  });

  it('should throw an error when an invalid elements option is provided', () => {
    expect(() => new NumberCounter(1234)).toThrowError();
    expect(() => new NumberCounter('[data-valid-selector]')).not.toThrowError();
  });

  it('should do nothing when there are no numbers to animate', () => {
    document.body.innerHTML = '<div data-js-number-counter>This is a string of text without numbers to animate</div>';

    const counter = document.querySelector('[data-js-number-counter]');

    new NumberCounter(counter);

    const numberAnimateWrapper = counter.querySelectorAll('span[data-js-animate-number]');

    expect(numberAnimateWrapper.length).toBe(0);
  });

  it('should wrap each number with a span within the container individually', () => {
    document.body.innerHTML = '<div data-js-number-counter>This is a string of text with numbers to 2 animate 12345</div>';

    const counter = document.querySelector('[data-js-number-counter]');

    new NumberCounter(counter);

    const numberCounter = counter.querySelectorAll('span[data-js-animate-number]');

    expect(numberCounter.length).toBe(2);
  });

  it('should not wrap numbers within HTML mark up with a span', () => {
    document.body.innerHTML = '<div class="rotate-90" data-my-attribute="12345" data-js-number-counter>12345</div>';

    const counter = document.querySelector('[data-js-number-counter]');

    new NumberCounter(counter);

    expect(document.body.innerHTML).toBe('<div class="rotate-90" data-my-attribute="12345" data-js-number-counter=""><span data-js-animate-number="">12345</span></div>');

  });


});

describe('Number counter formatting', () => {

  it('should fix broken number formatting', async () => {
    document.body.innerHTML = '<div data-js-number-counter>1,23456</div>';

    new NumberCounter('[data-js-number-counter]');

    const counter = document.querySelector('[data-js-number-counter]');

    // Animation takes 2 seconds to complete
    await delay(2000);

    expect(counter.innerText).toBe('123,456');
  });
});

// it('should wrap numbers with element to animate', () => {

// });

// it('should ignore numbers that are part of an HTML element', () => {

// });
