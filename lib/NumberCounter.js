import { gsap } from 'gsap';


// Match number containing `.` and `,` characters
const integerAndDecimalRegex = /\b\d[\d,.]*\b/g;

const numberWrapperAttribute = 'data-js-animate-number';

const defaults = {
  runOnce: true,
  /**
   * Configuration used for the number observer.
   * @type {Object}
   */
  intersectionOptions: {
    threshold: 0.25,
    rootMargin: '5% 0% 5% 0%'
  },
  duration: 2,
  startValue: 0,
};

class NumberCounter {

  prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /**
   * @param {String|HTMLElement|NodeList} elements
   * @param {Object} options
   */
  constructor(elements, options) {
    this.options = { ...defaults, ...options };
    this.numberItemsEl = this.resolveElements(elements);
    this.intersectionOptions = this.options.intersectionOptions;
    this.init();
  }

  /**
   * Convert elements property to Array or NodeList so it's iterable
   *
   * @param {String|HTMLElement|NodeList|Array} elements
   * @returns {Array|NodeList}
   */
  resolveElements(elements) {
    if (typeof elements === 'string') {
      return document.querySelectorAll(elements);
    }

    if (elements instanceof HTMLElement) {
      return [elements];
    }

    if (elements instanceof NodeList || Array.isArray(elements)) {
      return elements;
    }

    throw new Error('Invalid elements option provided');

  }

  /**
   *
   * @param {String} value
   * @returns {String}
   */
  wrapNumbers(value) {
    // Split by HTML tags to work only with content between tags
    const parts = value.split(/(<[^ >][^>]*>)/g);

    const wrappedValue = parts.map(part => {
    // Check if the part is an HTML tag and return it as is
      if (part.startsWith('<')) {
        return part;
      }

      // Wrap the numbers in the content with a span element
      return part.replace(integerAndDecimalRegex, `<span ${numberWrapperAttribute}>$&</span>`);
    }).join('');

    return wrappedValue;
  }


  /**
   *
   * @param {Number} value
   * @returns {Number}
   */
  countDecimalPlaces(value) {
    return value.toString().split('.')[1]?.length || 0;
  }

  /**
   *
   * @param {(Number|String)} value
   * @param {Number} decimalPlaces
   * @param {Boolean} hasCommaSeparators
   * @returns {String}
   */
  formatNumber(value, decimalPlaces, hasCommaSeparators) {
    const decimalPoint = '.';
    const thousandsSeparator = hasCommaSeparators ? ',' : '';
    const parts = Number(value).toFixed(decimalPlaces).split('.');

    // Add the `thousandsSeparator` at every full thousand value
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);

    return parts.join(decimalPoint);
  }

  /**
   *
   * @param {HTMLElement} numberElement
   * @param {Number} startValue
   * @param {Number} duration
   */
  createNumberTween(numberElement, startValue = this.options.startValue, duration = this.options.duration) {
    const numberToIncrement = {
      val: numberElement.innerText.replaceAll(',', '')
    };

    const decimalPlaces = this.countDecimalPlaces(numberToIncrement.val);

    const hasCommaSeparators = numberElement.innerText.includes(',');

    gsap.from(numberToIncrement, {
      duration,
      ease: 'expo.out',
      val: startValue,
      stagger: {
        each: 1.0,
        onUpdate: () => {
          numberElement.innerText = this.formatNumber(numberToIncrement.val, decimalPlaces, hasCommaSeparators);
        },
      },
    });
  }

  /**
   * @type {IntersectionObserverCallback}
   * @param {IntersectionObserverEntry} entries
   * @param {IntersectionObserver} observer
   */
  onNumberIntersecting(entries, observer) {
    entries.forEach((entry) => {

      if (!entry.isIntersecting) return;

      const element = entry.target;

      const numberValue = element;

      let startValue = parseFloat(numberValue.getAttribute('data-js-number-counter-start-value') || this.options.startValue);

      if (isNaN(startValue)) {
        startValue = 0;
      }

      const wrappedValuesHTML = this.wrapNumbers(numberValue.innerHTML);

      numberValue.innerHTML = wrappedValuesHTML;

      const numberElements = numberValue.querySelectorAll(`[${numberWrapperAttribute}]`);

      numberElements.forEach((numberElement) => {
        this.createNumberTween(numberElement, startValue);
      });

      if (this.options.runOnce) {
        observer.unobserve(entry.target);
      }
    });
  }

  init() {
    if (this.prefersReducedMotion.matches) return;

    /**
     * The observer for watching counter items
     * @type {IntersectionObserver}
     */
    const numberObserver = new IntersectionObserver(this.onNumberIntersecting.bind(this), this.options.intersectionOptions);

    this.numberItemsEl.forEach((number) => {
      numberObserver.observe(number);
    });
  }
}

export { NumberCounter };
