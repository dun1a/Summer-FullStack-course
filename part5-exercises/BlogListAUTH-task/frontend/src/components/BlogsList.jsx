import Blog from './Blog.jsx'

const BlogList = ({ blogs, updateLike }) => {

    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes) 

    return (
        <div>

            <h2> Blogs </h2>

            {sortedBlogs.map(blog => (
                <Blog 
                    key = {blog.id} 
                    blog = {blog} 
                    updateLike = {updateLike} /> // passing the updateLike function to each Blog component
            ))}
        </div>
    )
}

export default BlogList