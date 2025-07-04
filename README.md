# 📚 Nano_Library

A modern and interactive full-stack library management system built with **React 19**, **TypeScript**, **Tailwind CSS v4**, **React Router v7**, and **Redux Toolkit**. Nano_Library allows users to manage books and borrowing records efficiently through a sleek and user-friendly UI.

---

## 🚀 Live Demo

- 🔗 Frontend: [https://nano-library.vercel.app](https://nano-library.vercel.app)
- 🔗 Backend API: [https://librarymanagementassigment.vercel.app/api/books](https://librarymanagementassigment.vercel.app/api/books)

---

## 📑 Pages & Routes

| Path              | Description                                                                                  |
| ----------------- | -------------------------------------------------------------------------------------------- |
| `/books`          | Displays a list of all books with options to **view**, **edit**, **delete**, and **borrow**. |
| `/create-book`    | Form interface to **add a new book** to the system.                                          |
| `/books/:id`      | Detailed view of a **single book's information**.                                            |
| `/edit-book/:id`  | Interface to **update book details**.                                                        |
| `/borrow/:bookId` | Borrow form for a **specific book**.                                                         |
| `/borrow-summary` | View an **aggregated summary** of borrowed books.                                            |

## SetUp Project

- Make an .env file put VITE_API_URL="your server url"
- Just clone it and use command **run npm i**

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
