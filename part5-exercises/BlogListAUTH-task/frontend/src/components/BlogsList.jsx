import Blog from './Blog.jsx'

const BlogList = ({ blogs, updateLike, deleteBlog }) => {

    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes) 

    return (
        <div>
            <h2> Blogs </h2>

            {sortedBlogs.map(blog => (
                <Blog 
                    key = {blog.id} 
                    blog = {blog} 
                    updateLike = {updateLike}
                    deleteBlog = {deleteBlog} /> // passing the updateLike function to each Blog component
            ))}
        </div>
    )
}

export default BlogList