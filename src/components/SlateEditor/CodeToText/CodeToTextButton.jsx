import React from 'react';
import Button from '../components/Button';
import Icon from 'views/Icons/Icon'
const CodeToTextButton = (props) => {
    const { handleButtonClick, title } = props

    return (
        <Button
            title={title}
            onMouseDown={() => handleButtonClick({ showInput: true, action: 'insert' })}>
            <Icon icon='insertHtml' />
        </Button>
    )
}

export default CodeToTextButton