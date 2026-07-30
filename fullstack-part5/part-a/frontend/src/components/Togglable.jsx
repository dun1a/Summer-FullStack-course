import { useState } from 'react'

const Togglable = (props) => {
    const [visible, setVisible] = useState(false) // for tracking whethere the content is shown or hidden

    // CSS style object, when visible is 'true', sets display to none (hides the div), applied to the 'show' button
    const hideWhenVisible = {
        display: visible ? 'none' : ''
    }

    // another CSS style object, when visible is 'false', sets display to none, applied to the content and cancel button
    const showWhenVisible = {
        display: visible ? '' : 'none'
    }

    // function for toggling the 'visible' state between true and false
    const toggleVisibility = () => {
        setVisible(!visible)
    }
    return (

        <div>
            <div style = {hideWhenVisible}>
                <button onClick={toggleVisibility}> {props.buttonLabel} </button>
            </div>
            <div style = {showWhenVisible}>
                {props.children} {/* used for referencing chil components of this component */}
                <button onClick={toggleVisibility}>Cancel</button>
            </div>
        </div>
    )
}

export default Togglable