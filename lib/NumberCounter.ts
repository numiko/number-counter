import { gsap } from 'gsap';

type NumberCounterOptions = {
  runOnce: boolean;
  intersectionOptions: IntersectionObserverInit;
  duration: number;
  startValue: number;
}

type NumberCounterElementsParam = string | HTMLElement | NodeListOf<HTMLElement> | Array<HTMLElement>;
class NumberCounter {
  // Match number containing `.` and `,` characters
  integerAndDecimalRegex = /\b\d[\d,.]*\b/g;

  prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  NUMBER_WRAPPER_ATTRIBUTE = 'data-js-animate-number';

  DEFAULT_OPTIONS: NumberCounterOptions = {
    runOnce: true,
    intersectionOptions: {
      rootMargin: '5% 0% 5% 0%',
      threshold: 0.25,
    },
    duration: 2,
    startValue: 0
  };

  options: NumberCounterOptions;
  numberItemsEl: NodeListOf<HTMLElement> | HTMLElement[];
  intersectionOptions: IntersectionObserverInit;

  /**
   * @param {String|HTMLElement|NodeList} elements
   * @param {Object} options
   */
  constructor(elements: NumberCounterElementsParam, options?: Partial<NumberCounterOptions>) {
    this.options = { ...this.DEFAULT_OPTIONS, ...options };
    this.numberItemsEl = this.resolveElements(elements);
    this.intersectionOptions = this.options.intersectionOptions;

    this.init();
  }

  resolveElements(elements: NumberCounterElementsParam) {
    if (typeof elements === 'string') {
      return document.querySelectorAll<HTMLElement>(elements);
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
   * Wraps the numbers in the string with a span element.
   * It does not wrap numbers that are within HTML tags.
   */
  wrapNumbers(value: string) {
    // Split by HTML tags to work only with content between tags
    const parts = value.split(/(<[^ >][^>]*>)/g);

    const wrappedValue = parts.map(part => {
    // Check if the part is an HTML tag and return it as is
      if (part.startsWith('<')) {
        return part;
      }

      // Wrap the numbers in the content with a span element
      return part.replace(this.integerAndDecimalRegex, `<span ${this.NUMBER_WRAPPER_ATTRIBUTE}>$&</span>`);
    }).join('');

    return wrappedValue;
  }

  countDecimalPlaces(value: string) {
    return value.toString().split('.')[1]?.length || 0;
  }

  /**
   * Formats a number with the specified decimal places and optional comma separators.
   */
  formatNumber(value: number | string, decimalPlaces: number, hasCommaSeparators: boolean) {
    const decimalPoint = '.';
    const thousandsSeparator = hasCommaSeparators ? ',' : '';
    const parts = Number(value).toFixed(decimalPlaces).split('.');

    // Add the `thousandsSeparator` at every full thousand value
    if(parts[0]) {
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
    }

    return parts.join(decimalPoint);
  }

  /**
   * Creates a GSAP tween for the number element.
   */
  createNumberTween(numberElement: HTMLElement, startValue = this.options.startValue, duration = this.options.duration) {
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

  onNumberIntersecting(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    entries.forEach((entry) => {

      if (!entry.isIntersecting) return;

      const element = entry.target;

      const numberValue = element;

      let startValue = parseFloat(numberValue.getAttribute('data-js-number-counter-start-value') || String(this.options.startValue));

      if (isNaN(startValue)) {
        startValue = 0;
      }

      const wrappedValuesHTML = this.wrapNumbers(numberValue.innerHTML);

      numberValue.innerHTML = wrappedValuesHTML;

      const numberElements = numberValue.querySelectorAll<HTMLElement>(`[${this.NUMBER_WRAPPER_ATTRIBUTE}]`);

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
