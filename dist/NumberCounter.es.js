import { gsap as c } from "gsap";
class h {
  /**
   * @param {String|HTMLElement|NodeList} elements
   * @param {Object} options
   */
  constructor(e, t) {
    this.integerAndDecimalRegex = /\b\d[\d,.]*\b/g, this.prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)"), this.NUMBER_WRAPPER_ATTRIBUTE = "data-js-animate-number", this.DEFAULT_OPTIONS = {
      runOnce: !0,
      intersectionOptions: {
        rootMargin: "5% 0% 5% 0%",
        threshold: 0.25
      },
      duration: 2,
      startValue: 0
    }, this.options = { ...this.DEFAULT_OPTIONS, ...t }, this.numberItemsEl = this.resolveElements(e), this.intersectionOptions = this.options.intersectionOptions, this.init();
  }
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
   * Wraps the numbers in the string with a span element.
   * It does not wrap numbers that are within HTML tags.
   */
  wrapNumbers(e) {
    return e.split(/(<[^ >][^>]*>)/g).map((r) => r.startsWith("<") ? r : r.replace(this.integerAndDecimalRegex, `<span ${this.NUMBER_WRAPPER_ATTRIBUTE}>$&</span>`)).join("");
  }
  countDecimalPlaces(e) {
    var t;
    return ((t = e.split(".")[1]) == null ? void 0 : t.length) || 0;
  }
  /**
   * Formats a number with the specified decimal places and optional comma separators.
   */
  formatNumber(e, t, s) {
    const r = ".", i = s ? "," : "", n = Number(e).toFixed(t).split(".");
    return n[0] && (n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, i)), n.join(r);
  }
  /**
   * Creates a GSAP tween for the number element.
   */
  createNumberTween(e, t = this.options.startValue, s = this.options.duration) {
    const r = {
      val: e.innerText.replaceAll(",", "")
    }, i = this.countDecimalPlaces(r.val), n = e.innerText.includes(",");
    c.from(r, {
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
  onNumberIntersecting(e, t) {
    e.forEach((s) => {
      if (!s.isIntersecting) return;
      const i = s.target;
      let n = parseFloat(i.getAttribute("data-js-number-counter-start-value") || String(this.options.startValue));
      isNaN(n) && (n = 0);
      const o = this.wrapNumbers(i.innerHTML);
      i.innerHTML = o, i.querySelectorAll(`[${this.NUMBER_WRAPPER_ATTRIBUTE}]`).forEach((a) => {
        this.createNumberTween(a, n);
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
  h as NumberCounter
};
