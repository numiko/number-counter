export declare class NumberCounter {
    private integerAndDecimalRegex;
    private prefersReducedMotion;
    private NUMBER_WRAPPER_ATTRIBUTE;
    private DEFAULT_OPTIONS;
    private options;
    private numberItemsEl;
    private intersectionOptions;
    /**
     * @param {String|HTMLElement|NodeList} elements
     * @param {Object} options
     */
    constructor(elements: NumberCounterElementsParam, options?: NumberCounterOptions);
    private resolveElements;
    /**
     * Wraps the numbers in the string with a span element.
     * It does not wrap numbers that are within HTML tags.
     */
    private wrapNumbers;
    private countDecimalPlaces;
    /**
     * Formats a number with the specified decimal places and optional comma separators.
     */
    private formatNumber;
    /**
     * Creates a GSAP tween for the number element.
     */
    private createNumberTween;
    private onNumberIntersecting;
    init(): void;
}

export declare type NumberCounterElementsParam = string | HTMLElement | NodeListOf<HTMLElement> | Array<HTMLElement>;

export declare type NumberCounterOptions = {
    runOnce?: boolean;
    intersectionOptions?: IntersectionObserverInit;
    duration?: number;
    startValue?: number;
};

export { }
