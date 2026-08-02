// const BlogForm = ({ onSubmit, value1, value2, value3, handleChange1, handleChange2, handleChange3 }) => {

//     return (
//         <div>
//             <form onSubmit = {onSubmit}>
//                 <div>
//                     <label>title:
//                     <input value = {value1} onChange = {handleChange1} />
//                     </label>
//                 </div>
//                 <div>
//                     <label>author:
//                     <input value = {value2} onChange = {handleChange2} />
//                     </label>
//                 </div>
//                 <div>
//                     <label>url:
//                     <input value = {value3} onChange = {handleChange3} />
//                     </label>
//                 </div>
//                <button type = 'submit'> save </button>
//             </form>
//         </div>
//     )
// }


// const BlogForm = ({
//     onSubmit,
//     title, handleTitleChange,
//     author, handleAuthorChange,
//     url, handleUrlChange
//  }) => {

//     return (
//         <div>
//             <form onSubmit = {onSubmit}>
//                 <div>
//                     <label>title:
//                     <input value = {title} onChange = {handleTitleChange} />
//                     </label>
//                 </div>
//                 <div>
//                     <label>author:
//                     <input value = {author} onChange = {handleAuthorChange} />
//                     </label>
//                 </div>
//                 <div>
//                     <label>url:
//                     <input value = {url} onChange = {handleUrlChange} />
//                     </label>
//                 </div>
//                <button type = 'submit'> save </button>
//             </form>
//         </div>
//     )
// }

import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleAddBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2> Create a new blog </h2>
      <form onSubmit = {handleAddBlog}>
        <div>
          <label>title:
            <input value = {title} onChange = {event => setTitle(event.target.value)} />
          </label>
        </div>
        <div>
          <label>author:
            <input value = {author} onChange = {event => setAuthor(event.target.value)} />
          </label>
        </div>
        <div>
          <label>url:
            <input value = {url} onChange = {event => setUrl(event.target.value)} />
          </label>
        </div>
        <button type = 'submit'> save </button>
      </form>
    </div>
  )
}



export default BlogForm