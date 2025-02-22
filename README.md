# Lydio: CSS

Lydio: CSS is a structured CSS generator for JavaScript, designed to provide a fluent and efficient way to create styles programmatically. It enables a clean and expressive API that avoids messy string concatenation.

## Features
- Fluent API for defining CSS stylesheets.
- Supports global and component-scoped styles.
- Short-hand methods for efficiency: `.rule()`, `.select()`, `.prop()`.
- Explicit methods (`addRule()`, `addAndGetRule()`) available for clarity when needed.

## Installation
```sh
npm install @lydio/css
```

## Usage
```js
import { RuleCollection } from '@lydio/css';

const styles = new RuleCollection();
styles.rule()
    .select('body')
    .prop('color', 'var(--text)')
    .prop('background', 'var(--background)')
    .prop('font-family', 'var(--font-body)');

console.log(styles.toCss());
/* Output:
body {
  color: var(--text);
  background: var(--background);
  font-family: var(--font-body);
}
*/
```

## API
### Creating Rules
- `.rule()`: Starts a new CSS rule (`addAndGetRule()`).

### Selecting Elements
- `.select(selector)`: Adds a selector for the rule.

### Adding Properties
- `.prop(property, value)`: Sets a CSS property (`addProperty(property, value)`).

## Example Usage
```js
const layoutRules = new RuleCollection();
layoutRules.rule()
    .select(['html', 'body'])
    .prop('padding', 0)
    .prop('margin', 0);

layoutRules.rule()
    .select('.l-clamp-800')
    .prop('margin', '0 auto')
    .prop('width', '800px');

console.log(layoutRules.toCss());
/* Output:
html, body {
  padding: 0;
  margin: 0;
}
.l-clamp-800 {
  margin: 0 auto;
  width: 800px;
}
*/
```