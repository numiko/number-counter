var l = Object.defineProperty;
var p = (o, e, t) => e in o ? l(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t;
var a = (o, e, t) => p(o, typeof e != "symbol" ? e + "" : e, t);
import { gsap as m } from "gsap";
class T {
  /**
   * @param {String|HTMLElement|NodeList} elements
   * @param {Object} options
   */
  constructor(e, t) {
    // Match number containing `.` and `,` characters
    a(this, "integerAndDecimalRegex", /\b\d[\d,.]*\b/g);
    a(this, "prefersReducedMotion", window.matchMedia("(prefers-reduced-motion: reduce)"));
    a(this, "NUMBER_WRAPPER_ATTRIBUTE", "data-js-animate-number");
    a(this, "DEFAULT_OPTIONS", {
      runOnce: !0,
      /**
       * Configuration used for the number observer.
       * @type {Object}
       */
      intersectionOptions: {
        threshold: 0.25,
        rootMargin: "5% 0% 5% 0%"
      },
      duration: 2,
      startValue: 0
    });
    this.options = { ...this.DEFAULT_OPTIONS, ...t }, this.numberItemsEl = this.resolveElements(e), this.intersectionOptions = this.options.intersectionOptions, this.init();
  }
  /**
   * Convert elements property to Array or NodeList so it's iterable
   *
   * @param {String|HTMLElement|NodeList|Array} elements
   * @returns {Array|NodeList}
   */
  resolveElements(e) {
    if (typeof e == "string")
      return document.querySelectorAll(e);
    if (e instanceof HTMLElement)
      return [e];
    if (e instanceof NodeList || Array.isArray(e))
      return e;
    throw new Error("Invalid elements option provided");
  }
  /**
   *
   * @param {String} value
   * @returns {String}
   */
  wrapNumbers(e) {
    return e.split(/(<[^ >][^>]*>)/g).map((r) => r.startsWith("<") ? r : r.replace(this.integerAndDecimalRegex, `<span ${this.NUMBER_WRAPPER_ATTRIBUTE}>$&</span>`)).join("");
  }
  /**
   *
   * @param {Number} value
   * @returns {Number}
   */
  countDecimalPlaces(e) {
    var t;
    return ((t = e.toString().split(".")[1]) == null ? void 0 : t.length) || 0;
  }
  /**
   *
   * @param {(Number|String)} value
   * @param {Number} decimalPlaces
   * @param {Boolean} hasCommaSeparators
   * @returns {String}
   */
  formatNumber(e, t, s) {
    const r = ".", i = s ? "," : "", n = Number(e).toFixed(t).split(".");
    return n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, i), n.join(r);
  }
  /**
   *
   * @param {HTMLElement} numberElement
   * @param {Number} startValue
   * @param {Number} duration
   */
  createNumberTween(e, t = this.options.startValue, s = this.options.duration) {
    const r = {
      val: e.innerText.replaceAll(",", "")
    }, i = this.countDecimalPlaces(r.val), n = e.innerText.includes(",");
    m.from(r, {
      duration: s,
      ease: "expo.out",
      val: t,
      stagger: {
        each: 1,
        onUpdate: () => {
          e.innerText = this.formatNumber(r.val, i, n);
        }
      }
    });
  }
  /**
   * @type {IntersectionObserverCallback}
   * @param {IntersectionObserverEntry} entries
   * @param {IntersectionObserver} observer
   */
  onNumberIntersecting(e, t) {
    e.forEach((s) => {
      if (!s.isIntersecting) return;
      const i = s.target;
      let n = parseFloat(i.getAttribute("data-js-number-counter-start-value") || this.options.startValue);
      isNaN(n) && (n = 0);
      const c = this.wrapNumbers(i.innerHTML);
      i.innerHTML = c, i.querySelectorAll(`[${this.NUMBER_WRAPPER_ATTRIBUTE}]`).forEach((u) => {
        this.createNumberTween(u, n);
      }), this.options.runOnce && t.unobserve(s.target);
    });
  }
  init() {
    if (this.prefersReducedMotion.matches) return;
    const e = new IntersectionObserver(this.onNumberIntersecting.bind(this), this.options.intersectionOptions);
    this.numberItemsEl.forEach((t) => {
      e.observe(t);
    });
  }
}
export {
  T as NumberCounter
};
