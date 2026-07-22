import Blog from '../model/blogModel.js'

const initialBlogs = [
    {
        title: 'First Blog',
        author: 'John Doe',
        url: 'http://example.com/first-blog',
        likes: 5
    },
    {
        title: 'Second Blog',
        author: 'Jane Smith',
        url: 'http://example.com/second-blog',
        likes: 10
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

export default { initialBlogs, blogsInDb }