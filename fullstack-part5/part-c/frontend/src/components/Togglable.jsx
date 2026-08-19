import {useState} from 'react'

const Togglable = (props) => {
    const [visible, setVisible] = useState(false)

    const hiddenWhenVisible = {display: visible ? 'none' : ''}
    const showWhenVisible = {display: visible ? '' : 'none'}

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style = {hiddenWhenVisible}>
                {props.buttonLabel}
            </div>
            <div style = {showWhenVisible}>
                {props.children} {/* props.children is used to reference the child components of the component (anything put inside the <Togglable> tags) */}
                <button onClick={toggleVisibility}> cancel </button>
            </div>
        </div>
    )
}

export default Togglable