import { gsap } from 'gsap';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

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
  /**
   * @param {String|HTMLElement|NodeList} elements
   * @param {Object} options
   */
  constructor(elements, options) {
    this.options = { ...defaults, ...options };
    this.numberItemsEl = typeof elements === 'string' ? document.querySelectorAll(elements) : elements;
    this.intersectionOptions = this.options.intersectionOptions;
    this.init();
  }

  /**
   *
   * @param {String} value
   * @returns {String}
   */
  wrapNumbers(value) {
    const wrappedValue = value.replace(integerAndDecimalRegex, `<span ${numberWrapperAttribute}>$&</span>`);
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
    if (prefersReducedMotion.matches) return;

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
