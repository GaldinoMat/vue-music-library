# Vue Music Player

This application was created with the intention of learning about the Vue framework and its implementations. It serves as a practical exploration of both the older Options API and the newer Composition API. By initially building the app using the Options API and later updating it to utilize the Composition API, the project serves as a valuable learning resource for developers interested in understanding the transition between these two approaches.

## Key Technologies Used

- **Vite**: The app is compiled and bundled using Vite, which provides a fast and efficient development experience.
- **Vue Test Utils**: Unit tests for the application are implemented using the Vue Test Utils framework.
- **Cypress**: Cypress is utilized as the end-to-end (e2e) testing environment for comprehensive testing of the application.
- **Howler**: Howler, a powerful audio library, handles all media playing requirements within the app.
- **Firebase** and **Firestore**: The backend solution for this app is built on Firebase, with Firestore serving as the database technology of choice.
- **Pinia**: For global state management, Pinia is used due to its simplicity and ease of maintenance.

## Conclusion

Although very powerful, the Composition API seems to be in its early stages of implementation for many Vue libraries available on the web. Resources like Vue Test Utils still do not handle it very well, and the documentation is not updated to conform to this new approach to Vue, hence why some of the tests I created were skipped. Nevertheless, the Composition API is a powerful architecture that can help developers coming from other frameworks, like React, to quickly adapt and learn the Vue ecosystem. It provides an agile way to leverage their existing knowledge and skills.

## Disclaimer

**This is not a commercial project.** It is important to note that this application was created solely for educational purposes and should be used as such. The inclusion of music and audio media as primary assets within the app further emphasizes its educational focus.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
