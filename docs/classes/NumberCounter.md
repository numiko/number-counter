[**@numiko/number-counter**](../README.md)

***

[@numiko/number-counter](../globals.md) / NumberCounter

# Class: NumberCounter

Defined in: [NumberCounter.ts:14](https://bitbucket.org/numiko/number-counter/src/cfbb39fd3b02e8dbe9752d5a164e22ee0766f476/lib/NumberCounter.ts#lines-14)

## Constructors

### Constructor

> **new NumberCounter**(`elements`, `options?`): `NumberCounter`

Defined in: [NumberCounter.ts:40](https://bitbucket.org/numiko/number-counter/src/cfbb39fd3b02e8dbe9752d5a164e22ee0766f476/lib/NumberCounter.ts#lines-40)

#### Parameters

##### elements

`NumberCounterElementsParam`

##### options?

[`NumberCounterOptions`](../type-aliases/NumberCounterOptions.md)

#### Returns

`NumberCounter`

## Properties

### DEFAULT\_OPTIONS

> **DEFAULT\_OPTIONS**: `RequiredNumberCounterOptions`

Defined in: [NumberCounter.ts:22](https://bitbucket.org/numiko/number-counter/src/cfbb39fd3b02e8dbe9752d5a164e22ee0766f476/lib/NumberCounter.ts#lines-22)

***

### integerAndDecimalRegex

> **integerAndDecimalRegex**: `RegExp`

Defined in: [NumberCounter.ts:16](https://bitbucket.org/numiko/number-counter/src/cfbb39fd3b02e8dbe9752d5a164e22ee0766f476/lib/NumberCounter.ts#lines-16)

***

### intersectionOptions

> **intersectionOptions**: `IntersectionObserverInit`

Defined in: [NumberCounter.ts:34](https://bitbucket.org/numiko/number-counter/src/cfbb39fd3b02e8dbe9752d5a164e22ee0766f476/lib/NumberCounter.ts#lines-34)

***

### NUMBER\_WRAPPER\_ATTRIBUTE

> **NUMBER\_WRAPPER\_ATTRIBUTE**: `string` = `'data-js-animate-number'`

Defined in: [NumberCounter.ts:20](https://bitbucket.org/numiko/number-counter/src/cfbb39fd3b02e8dbe9752d5a164e22ee0766f476/lib/NumberCounter.ts#lines-20)

***

### numberItemsEl

> **numberItemsEl**: `NodeListOf`\<`HTMLElement`\> \| `HTMLElement`[]

Defined in: [NumberCounter.ts:33](https://bitbucket.org/numiko/number-counter/src/cfbb39fd3b02e8dbe9752d5a164e22ee0766f476/lib/NumberCounter.ts#lines-33)

***

### options

> **options**: `RequiredNumberCounterOptions`

Defined in: [NumberCounter.ts:32](https://bitbucket.org/numiko/number-counter/src/cfbb39fd3b02e8dbe9752d5a164e22ee0766f476/lib/NumberCounter.ts#lines-32)

***

### prefersReducedMotion

> **prefersReducedMotion**: `MediaQueryList`

Defined in: [NumberCounter.ts:18](https://bitbucket.org/numiko/number-counter/src/cfbb39fd3b02e8dbe9752d5a164e22ee0766f476/lib/NumberCounter.ts#lines-18)

## Methods

### countDecimalPlaces()

> **countDecimalPlaces**(`value`): `number`

Defined in: [NumberCounter.ts:85](https://bitbucket.org/numiko/number-counter/src/cfbb39fd3b02e8dbe9752d5a164e22ee0766f476/lib/NumberCounter.ts#lines-85)

#### Parameters

##### value

`string`

#### Returns

`number`

***

### createNumberTween()

> **createNumberTween**(`numberElement`, `startValue`, `duration`): `void`

Defined in: [NumberCounter.ts:108](https://bitbucket.org/numiko/number-counter/src/cfbb39fd3b02e8dbe9752d5a164e22ee0766f476/lib/NumberCounter.ts#lines-108)

Creates a GSAP tween for the number element.

#### Parameters

##### numberElement

`HTMLElement`

##### startValue

`number` = `...`

##### duration

`number` = `...`

#### Returns

`void`

***

### formatNumber()

> **formatNumber**(`value`, `decimalPlaces`, `hasCommaSeparators`): `string`

Defined in: [NumberCounter.ts:92](https://bitbucket.org/numiko/number-counter/src/cfbb39fd3b02e8dbe9752d5a164e22ee0766f476/lib/NumberCounter.ts#lines-92)

Formats a number with the specified decimal places and optional comma separators.

#### Parameters

##### value

`string` | `number`

##### decimalPlaces

`number`

##### hasCommaSeparators

`boolean`

#### Returns

`string`

***

### init()

> **init**(): `void`

Defined in: [NumberCounter.ts:161](https://bitbucket.org/numiko/number-counter/src/cfbb39fd3b02e8dbe9752d5a164e22ee0766f476/lib/NumberCounter.ts#lines-161)

#### Returns

`void`

***

### onNumberIntersecting()

> **onNumberIntersecting**(`entries`, `observer`): `void`

Defined in: [NumberCounter.ts:130](https://bitbucket.org/numiko/number-counter/src/cfbb39fd3b02e8dbe9752d5a164e22ee0766f476/lib/NumberCounter.ts#lines-130)

#### Parameters

##### entries

`IntersectionObserverEntry`[]

##### observer

`IntersectionObserver`

#### Returns

`void`

***

### resolveElements()

> **resolveElements**(`elements`): `NodeListOf`\<`HTMLElement`\> \| `HTMLElement`[]

Defined in: [NumberCounter.ts:48](https://bitbucket.org/numiko/number-counter/src/cfbb39fd3b02e8dbe9752d5a164e22ee0766f476/lib/NumberCounter.ts#lines-48)

#### Parameters

##### elements

`NumberCounterElementsParam`

#### Returns

`NodeListOf`\<`HTMLElement`\> \| `HTMLElement`[]

***

### wrapNumbers()

> **wrapNumbers**(`value`): `string`

Defined in: [NumberCounter.ts:68](https://bitbucket.org/numiko/number-counter/src/cfbb39fd3b02e8dbe9752d5a164e22ee0766f476/lib/NumberCounter.ts#lines-68)

Wraps the numbers in the string with a span element.
It does not wrap numbers that are within HTML tags.

#### Parameters

##### value

`string`

#### Returns

`string`
