# my-component-library

A web component library built with [ElenaJS](https://elenajs.com) and design tokens from [Tokens Studio for Figma](https://tokens.studio).

---

## Project structure

```
my-component-library/
├── tokens/
│   └── tokens.json          ← Your Tokens Studio JSON export (edit this)
├── scripts/
│   └── build-tokens.mjs     ← Style Dictionary config: JSON → CSS vars
├── src/
│   ├── index.js             ← Library entry point (re-exports all components)
│   └── components/
│       ├── button/
│       │   ├── button.js    ← Elena component (Primitive — has render())
│       │   └── button.css   ← Scoped styles via @scope
│       ├── card/
│       │   ├── card.js      ← Elena component (Composite — no render())
│       │   └── card.css
│       └── stack/
│           ├── stack.js     ← Elena component (Composite)
│           └── stack.css
├── elena.config.mjs         ← Bundler config
├── demo.html                ← Open in browser to preview components
└── package.json
```

---

## Quick start

### 1. Install dependencies

```bash
npm install
```

### 2. Replace the example tokens

Open `tokens/tokens.json` and paste your own Tokens Studio export.
The JSON structure should match the Tokens Studio format:

```json
{
  "color": {
    "brand": {
      "blue": { "value": "#3b82f6", "type": "color" }
    }
  }
}
```

### 3. Build tokens → CSS variables

```bash
npm run build:tokens
```

This runs Style Dictionary and outputs `dist/tokens/tokens.css`.
All CSS variable names are prefixed with `--filo-` (change the prefix in `scripts/build-tokens.mjs`).

### 4. Build the component library

```bash
npm run build:components
```

Or run both in one go:

```bash
npm run build
```

### 5. Preview

Open `demo.html` in a browser (the demo uses the ElenaJS CDN so it works before you build).
Once you've run `npm run build`, switch `demo.html` to load from `dist/` instead.

---

## Development workflow

```bash
npm run dev
```

Builds tokens once, then watches your component source files for changes.

---

## Key concepts

### Design tokens flow

```
Figma (Tokens Studio plugin)
  → export JSON to tokens/tokens.json
  → npm run build:tokens
  → dist/tokens/tokens.css  (CSS custom properties)
  → components reference var(--filo-*) in their .css files
```

Never hardcode values in component CSS. Always use a token variable.

### Component types (Elena)

| Type | Has render()? | When to use |
|------|:---:|---|
| **Composite** | ✗ | Layout wrappers (`<my-stack>`, `<my-grid>`). Styles slotted content. |
| **Primitive** | ✓ | Leaf components (`<my-button>`, `<my-badge>`). Owns its inner HTML. |
| **Declarative** | ✓ | Needs Shadow DOM isolation (use sparingly). |

### Adding a new component

1. Create `src/components/my-thing/my-thing.js`
2. Create `src/components/my-thing/my-thing.css`
3. Export it from `src/index.js`

Minimal component template:

```js
// src/components/my-badge/my-badge.js
import { Elena, html } from "@elenajs/core";

export default class MyBadge extends Elena(HTMLElement) {
  static tagName = "my-badge";
  static props = ["variant"];
  variant = "default";

  render() {
    return html`<span class="badge badge--${this.variant}"><slot></slot></span>`;
  }
}

MyBadge.define();
```

```css
/* src/components/my-badge/my-badge.css */
@scope (my-badge) {
  :scope .badge {
    display: inline-flex;
    padding: var(--filo-spacing-1) var(--filo-spacing-2);
    border-radius: var(--filo-border-radius-full);
    font-size: var(--filo-font-size-xs);
    font-weight: var(--filo-font-weight-medium);
    background: var(--filo-color-semantic-primary-subtle);
    color: var(--filo-color-semantic-primary);
  }
}
```

Then add to `src/index.js`:
```js
export { default as MyBadge } from "./components/my-badge/my-badge.js";
```

### React differences to keep in mind

| React | Web Components / Elena |
|---|---|
| `useState` | Mutate `this.propName` directly |
| Props via JSX `<Btn color="red">` | HTML attributes `<my-btn color="red">` |
| Callback props `onClick={fn}` | Custom DOM events `addEventListener` |
| `className` | `class` (it's real HTML) |
| `{children}` | `<slot>` |
| Named children | `<slot name="...">` + `slot="..."` attribute |
| `useEffect` cleanup | `disconnectedCallback` |

---

## Publishing to npm

1. `npm run build`
2. Update `version` in `package.json`
3. `npm publish`

Consumers install and use:

```bash
npm install my-component-library
```

```html
<!-- Load tokens globally (once, in your HTML or CSS entry) -->
<link rel="stylesheet" href="node_modules/my-component-library/dist/tokens/tokens.css" />

<!-- Register components -->
<script type="module" src="node_modules/my-component-library/dist/index.js"></script>

<!-- Use them -->
<my-button variant="primary">Hello</my-button>
<my-stack direction="row" gap="4">
  <my-card>...</my-card>
</my-stack>
```

---

## Resources

- [ElenaJS docs](https://elenajs.com)
- [Tokens Studio docs](https://docs.tokens.studio)
- [Style Dictionary](https://styledictionary.com)
- [@tokens-studio/sd-transforms](https://github.com/tokens-studio/sd-transforms)
- [MDN: Custom Elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)
