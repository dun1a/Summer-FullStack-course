// Variables

const x = 1
let y = 5

console.log(x, y)

y += 10

console.log(x, y)

y = 'sometext'

console.log(x, y)

// Arrays

const t = [1, 2, 3, 4]
console.log(t)

t.push(5)
console.log(t)

console.log('array length is: ' + t.length)
console.log('first array element is: ' + t[0])

t.forEach(value => {
    console.log(value)
})

// to ensure original array is not modified
// we can create a new array with the added element using 'concat'

const t2 = t.concat(6) // adds new item to new,copied array not the old one
console.log('array using concat')
console.log(t2)

// using 'map' to create a new array with modified values

const t3 = t.map(value => value * 2) // creates a new array with each value multiplied by 2
console.log('array using map')
console.log(t3)

const t4 = t.map(value => '<li>' + value + '</li>') // creates a new array of JSX list items
console.log('array using map to create JSX')
console.log(t4)

// destructuring arrays

const array = [1, 2, 3, 4, 5]
const [first, second, ...rest] = array // destructuring assignment to extract values from array

console.log('first element: ' + first, 'second element: ' + second)
console.log('rest of the array: ' + rest)

//////// objects
const object1 = {
    name: 'Hoshi',
    age: 29,
    profession: 'Idol',
    main_group: 'Seventeen',
    }

const object2 = {
    name: 'Hyunjin',
    education: ' Arts university',
    hobby: 'Dancing'
}

console.log(object1.name)
const profession = 'profession'
console.log(object1[profession]) // accessing object property using variable key
console.log(object1) 

////// functions
const sum = (a, b) => {
    console.log(a)
    console.log(b)
    return a + b
}
const result = sum(1,5)
console.log('result of sum: ' + result)


