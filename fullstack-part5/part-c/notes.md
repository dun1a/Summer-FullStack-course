For frontend, testing components:
- installing Vitest and the jsdom library simulating a web browser
command: npm install --save-dev vitest jsdom

- in addintion, we need another tesitng library that helps render components for testing purposes
-> react-testing-library
command: npm install --save-dev @testing-library/react @testing-library/jest-dom


In vite.config.js (frontend):
export default defineConfig({
  // ...
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './testSetup.js', 
  }
})
- with 'globals: true' -> no need to import keywords like 'describe', 'test' and 'expect'
