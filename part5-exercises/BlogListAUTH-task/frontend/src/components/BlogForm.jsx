const BlogForm = ({ onSubmit, value1, value2, value3, handleChange1, handleChange2, handleChange3 }) => {

    return (
        <div>
            <form onSubmit = {onSubmit}>
                <div>
                    <label>title:
                    <input value = {value1} onChange = {handleChange1} />
                    </label>
                </div>
                <div>
                    <label>author:
                    <input value = {value2} onChange = {handleChange2} />
                    </label>
                </div>
                <div>
                    <label>url:
                    <input value = {value3} onChange = {handleChange3} />
                    </label>
                </div>
               <button type = 'submit'> save </button>
            </form>
        </div>
    )
}

export default BlogForm