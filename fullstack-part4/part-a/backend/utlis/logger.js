// So far we have been using console.log and console.error
// to print different information from the code.
// However, this is not a very good way to do things.
// Let's separate all printing to the console to its own module utils/logger.js:

const info = (...params) => {
  console.log(...params)
}

const error = (...params) => {
  console.error(...params)
}

export default {
  info, error
}