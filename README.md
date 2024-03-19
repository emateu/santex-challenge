# Santex RBI Team - Front End Training Challenge

Quick challenge to help candidates to join RBI Team to catch up with currently used technologies

## Goals

- Get familiar with Styled Components as styling strategy
- Get a good understanding of Apollo Client and how to integrate Graphql to a React front end application
- Use Graphql Fragments
- Acquire good practices with Jest and testing both components and hooks
- Review React hooks concepts and develop custom hooks

## Requirements

- Implement a home page with a grid of products that includes product picture, description and price (from any product variant). Hint: use Graphql query.
- Create a "Buy" button for each product in the grid and implement a mutation to update an order everytime a user clicks on that button.
  The mutation is called `addItemToOrder`. Hint: look into the API documentation section of this document
- Implement app header component that includes the subtotal of the current order and persists through page refresh. Hint: use Graphql mutation and Context API
- Add custom hook named `useStateWithStorage` with same API as `useState` hook but adding local storage capabilities. Can be used for header subtotal
- Create tests for grid UI item and other components

## API documentation

Even thought the app is already connected to a graphql endpoint, the trainee can find here all required information about `queries`, `mutations` and Graphql types.

- https://www.vendure.io/docs/graphql-api/shop/

---

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

1. Clone the repo

```bash
git clone git@github.com:emateu/santex-challenge.git
```

2. Install the dependencies

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

4. Run the tests:

```bash
pnpm test
```

Then, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
