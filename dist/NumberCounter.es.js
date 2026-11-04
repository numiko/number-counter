import { gsap as e } from "gsap";
// lib/NumberCounter.ts
var t = class {
	constructor(e, t) {
		this.integerAndDecimalRegex = /\b\d[\d,.]*\b/g, this.prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)"), this.NUMBER_WRAPPER_ATTRIBUTE = "data-js-animate-number", this.DEFAULT_OPTIONS = {
			runOnce: !0,
			intersectionOptions: {
				rootMargin: "5% 0% 5% 0%",
				threshold: .25
			},
			duration: 2,
			startValue: 0
		}, this.options = {
			...this.DEFAULT_OPTIONS,
			...t
		}, this.numberItemsEl = this.resolveElements(e), this.intersectionOptions = this.options.intersectionOptions, this.init();
	}
	resolveElements(e) {
		if (typeof e == "string") return document.querySelectorAll(e);
		if (e instanceof HTMLElement) return [e];
		if (e instanceof NodeList || Array.isArray(e)) return e;
		throw Error("Invalid elements option provided");
	}
	wrapNumbers(e) {
		return e.split(/(<[^ >][^>]*>)/g).map((e) => e.startsWith("<") ? e : e.replace(this.integerAndDecimalRegex, `<span ${this.NUMBER_WRAPPER_ATTRIBUTE}>$&</span>`)).join("");
	}
	countDecimalPlaces(e) {
		return e.split(".")[1]?.length || 0;
	}
	formatNumber(e, t, n) {
		let r = n ? "," : "", i = Number(e).toFixed(t).split(".");
		return i[0] &&= i[0].replace(/\B(?=(\d{3})+(?!\d))/g, r), i.join(".");
	}
	createNumberTween(t, n = this.options.startValue, r = this.options.duration) {
		let i = { val: t.innerText.replaceAll(",", "") }, a = this.countDecimalPlaces(i.val), o = t.innerText.includes(",");
		e.from(i, {
			duration: r,
			ease: "expo.out",
			val: n,
			stagger: {
				each: 1,
				onUpdate: () => {
					t.innerText = this.formatNumber(i.val, a, o);
				}
			}
		});
	}
	onNumberIntersecting(e, t) {
		e.forEach((e) => {
			if (!e.isIntersecting) return;
			let n = e.target, r = parseFloat(n.getAttribute("data-js-number-counter-start-value") || String(this.options.startValue));
			isNaN(r) && (r = 0), n.innerHTML = this.wrapNumbers(n.innerHTML), n.querySelectorAll(`[${this.NUMBER_WRAPPER_ATTRIBUTE}]`).forEach((e) => {
				this.createNumberTween(e, r);
			}), this.options.runOnce && t.unobserve(e.target);
		});
	}
	init() {
		if (this.prefersReducedMotion.matches) return;
		let e = new IntersectionObserver(this.onNumberIntersecting.bind(this), this.options.intersectionOptions);
		this.numberItemsEl.forEach((t) => {
			e.observe(t);
		});
	}
};
export { t as NumberCounter };
