## Introduction

🌞

## Contribute

1. Fork/Clone the project

2. Set API_KEY in environement variables (contact me to get an API_KEY).

`.env`:
```
NEXT_PUBLIC_VPP_API_KEY=<API_KEY>
```

3. Install dependencies:
```
npm i
```

4. Run :
```
npm run dev
```


## Tech Stack

Based on [Precedent](https://github.com/steven-tey/precedent) by Steven Tey ([@steventey](https://twitter.com/steventey))


### Frameworks

- [Next.js](https://nextjs.org/) – React framework for building performant apps with the best developer experience

### Platforms

- [Vercel](https://vercel.com/) – Easily preview & deploy changes with git

### UI

- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework for rapid UI development
- [Radix](https://www.radix-ui.com/) – Primitives like modal, popover, etc. to build a stellar user experience
- [Framer Motion](https://framer.com/motion) – Motion library for React to animate components with ease
- [Lucide](https://lucide.dev/) – Beautifully simple, pixel-perfect icons
- [`@next/font`](https://nextjs.org/docs/basic-features/font-optimization) – Optimize custom fonts and remove external network requests for improved performance
- [`@vercel/og`](https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation) – Generate dynamic Open Graph images on the edge
- [`react-wrap-balancer`](https://github.com/shuding/react-wrap-balancer) – Simple React component that makes titles more readable

### Hooks and Utilities

- `useIntersectionObserver` –  React hook to observe when an element enters or leaves the viewport
- `useLocalStorage` – Persist data in the browser's local storage
- `useScroll` – React hook to observe scroll position ([example](https://github.com/steven-tey/precedent/blob/main/components/layout/index.tsx#L25))
- `nFormatter` – Format numbers with suffixes like `1.2k` or `1.2M`
- `capitalize` – Capitalize the first letter of a string
- `truncate` – Truncate a string to a specified length
- [`use-debounce`](https://www.npmjs.com/package/use-debounce) – Debounce a function call / state update

### Code Quality

- [TypeScript](https://www.typescriptlang.org/) – Static type checker for end-to-end typesafety
- [Prettier](https://prettier.io/) – Opinionated code formatter for consistent code style
- [ESLint](https://eslint.org/) – Pluggable linter for Next.js and TypeScript

### Miscellaneous

- [Vercel Analytics](https://vercel.com/analytics) – Track unique visitors, pageviews, and more in a privacy-friendly way
