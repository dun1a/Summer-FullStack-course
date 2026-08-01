import {useState} from 'react'

const Blog = ({ blog }) => {

    const [visible, setVisible] = useState(false)

     const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 2,
        marginBottom: 5
    }

    const hideWHenVisible = {display: visible ? 'none' : ''}
    const shoWhenVisible = {display: visible ? '' : 'none'}

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const viewHideButton = visible ? 'hide' : 'view'

    return (
        <div style = {blogStyle}>
            <p> {blog.title} <button onClick={toggleVisibility}> {viewHideButton} </button> </p>

            {visible && (
                <div style = {shoWhenVisible}>
                    <p> Author: {blog.author} </p>
                    <p> URL: {blog.url} </p>
                </div>
            )}
        
        </div>
    )

}

export default Blog