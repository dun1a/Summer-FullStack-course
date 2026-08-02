import Blog from './Blog.jsx'

const BlogList = ({ blogs, updateLike }) => {


    return (
        <div>

            <h2> Blogs </h2>

            {blogs.map(blog => (
                <Blog 
                    key = {blog.id} 
                    blog = {blog} 
                    updateLike = {updateLike} /> // passing the updateLike function to each Blog component
            ))}
        </div>
    )
}

export default BlogList