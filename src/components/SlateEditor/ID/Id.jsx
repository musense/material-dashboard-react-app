import { Range, Editor, Transforms } from 'slate';
import React, { useRef, useState } from 'react';
import Button from './../components/Button'
// import Button from '../../common/Button'
import Icon from 'views/Icons/Icon'
import usePopup from '../customHooks/usePopup';
import { CustomEditor } from '../utils/CustomEditor';
import { useCallback } from 'react';

const Id = ({ editor, title }) => {
    const type = "id"

    const idInputRef = useRef(null);
    const [showInput, setShowInput] = usePopup(idInputRef);
    const [selection, setSelection] = useState()
    const [id, setId] = useState('');
    const toggleId = () => {
        setSelection(editor.selection);
        setShowInput(prev => !prev);
    }
    const handleId = useCallback(() => {
        // selection && Transforms.select(editor,selection);
        if (!selection || !id) return;
        Transforms.setNodes(editor, {
            attr: { id }
        }, {
            at: selection,
        })
        setShowInput(false);
        setId('')
    }, [setId])
    return (
        <div className='popup-wrapper' ref={idInputRef}>
            {/* <Button className={showInput ? 'clicked' : ''} format={'add Id'} onClick={toggleId}>
                <Icon icon='addId' />
            </Button> */}
            <Button
                title={title}
                active={CustomEditor.isMarkActive(editor, type)}
                // onMouseDown={toggleId}
                onMouseDown={toggleId}
            >
                <Icon icon={'addId'} />
            </Button>
            {
                showInput &&
                <div className='popup' style={{
                    display: 'flex',
                    gap: '4px',
                    flexWrap: 'nowrap',
                    alignItems: 'center',
                }}>
                    <input type="text" placeholder='Enter an unique ID' value={id} onChange={(e) => setId(e.target.value)} />
                    <Button onClick={handleId}><Icon icon='add' /></Button>
                </div>
            }
        </div>
    )
}

export default Id;