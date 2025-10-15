# Number Counter

A package to animate numbers — most predominantly used on our statistics slice.

## Features

Automatically detects and animates numbers in text when they scroll into view. Customizable duration and starting values for smooth counting animations.

## Installation

The package can be installed using the semantic version.

`npm install ssh://git@bitbucket.org:numiko/number-counter.git##semver:<VERSION>`

## Usage

```js
const numberCounterItems = document.querySelectorAll('[data-js-number-counter]');
new NumberCounter(numberCounterItems);
```
