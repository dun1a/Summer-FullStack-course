import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

afterEach(() => {
    // after each test, the cleanup function is executed to reset jsdom that is simulating the browser
    cleanup()
})

const Note = ({ note, toggleImportance }) => {
    const label = note.important 
        ? 'make not important'
        : 'make important'

    return (
        <li className='note'>
            {note.content}
            <button onClick={toggleImportance}>{label}</button>
        </li>
    )
}