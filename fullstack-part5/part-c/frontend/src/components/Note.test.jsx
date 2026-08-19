import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note.jsx'

test('renders content', () => {
    const note = {
        content: 'Component testing is done wiht react-testing-library',
        important: true
    }

    render(<Note note={note} />)

    screen.debug()

    // this way it tries to find the element that has the EXACT content of the note (not good)
    ////const element = screen.getByText('Component testing is done wiht react-testing-library')
    // 'sscreen' helps access the rendered component
    // 'getByText' is a screen method that searches for an element that has the note content and ensure it exists
    
    // instead: 
    const element = screen.findByText('Does not work anymore :(',) // this way it tries to find the element that has the content of the note (not necessarily the exact content)
    
    expect(element).toBeDefined() // checking the existence of an element
    // expect generates an assertion for its argument 
    }
)

// testing using CSS-selectors, using querySelector of the object container
// not recommended...
test('renders content', () => {
    const note = {
        content: 'Component testing is done wiht react-testing-library',
        important: true
    }

    const { container } = render( <Note note = {note} /> )
    
    const div = container.querySelector('.note')
    expect(div).toHaveTextContent('Component testing is done wiht react-testing-library')
})

test('Does not render this', () => {
    const note = {
        content: 'This is a reminder',
        important: true
    }

    render( <Note note={note} />)

    // queryByText returns the element if it exists, and null if it does not exist
    const element = screen.queryByText('do not want this thing to be rendered')
    expect(element).toBeNull()
})

// getByTestId serches bsed on id fields specifically created for testing purposes

test('clicking the button calls event handler once', async () => {
    const note = {
        content: 'Component testing is done wiht react-testing-library',
        important: true
    }

    const mockHandler = vi.fn()

    render(
        <Note note = {note} toggleImportance = {mockHandler} />
    )

    const user = userEvent.setup()
    const button = screen.getByText('make not important')
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
})