// import {test, describe} from 'node:test'
// import assert from 'node:assert'
// import {dummy, totalLikes, favoriteBlog} from '../utils/list_helper.js'

// describe('dummy', () => {
//     test('dummy returns one', () => {
//         const blogs = []
//         const result = dummy(blogs)
//         assert.strictEqual(result, 1)
//     })
// })

// describe('totalLikes', () => {
//     test('totalLikes returns the correct total', () => {
//         const blogs = [
//             { title: 'Blog 1', likes: 5 },
//             { title: 'Blog 2', likes: 10 },
//         ]

//         const result = totalLikes(blogs)
//         assert.strictEqual(result, 15)
//     })

//     test('totalLikes returns 5 ', () => { 
//         const blogs = [
//             {title: 'Blog 1', likes: 1},
//             {title: 'Blog 2', likes: 2},
//             {title: 'Blog 3', likes: 2}
//         ]

//         const result = totalLikes(blogs)
//         assert.strictEqual(result, 5)
//     })

//     test('totalLikes returns 0 for empty array', () => {
//         const blogs = []

//         const result = totalLikes(blogs)
//         assert.strictEqual(result, 0)
//     })
// })

// describe('favorite blog', () => {
//     test('favourite blog returns the one with most likes', () => {
//         const blogs = [
//             {title: 'Blog 1', likes: 5},
//             {title: 'Blog 2', likes: 10},
//             {title: 'Blog 3', likes: 2},
//             {title: 'Blog 4', likes: 15}
//         ]

//         const result = favoriteBlog(blogs)
//         assert.deepStrictEqual(result, {title: 'Blog 4', likes: 15})
//     })

//     test('favourite blog returns either one of the blogs with most likes', () => {
//         const blogs = [
//             {title: 'Blog 1', likes: 5},
//             {title: 'Blog 2', likes: 10},
//             {title: 'Blog 3', likes: 2},
//             {title: 'Blog 4', likes: 10}
//         ]

//         const result = favoriteBlog(blogs)
//         assert.deepStrictEqual(result.likes, 10)
//     })
// })