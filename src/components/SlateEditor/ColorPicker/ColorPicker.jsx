import React, { useRef, useState } from 'react';
import './ColorPicker.css'
import { colors } from './defaultColors.js'
import { CustomEditor } from '../utils/CustomEditor'
import { Transforms } from 'slate';
import usePopup from '../customHooks/usePopup'
import { ReactEditor } from 'slate-react';
import Icon from 'views/Icons/Icon';
import Button from '../components/Button'

const ColorPicker = ({ format, title, editor }) => {
    const iconName = format === 'color' ? 'colorPicker' : 'backgroundColorPicker';
    const [selection, setSelection] = useState()
    const [hexValue, setHexValue] = useState('')
    const [validHex, setValidHex] = useState();
    const colorPickerRef = useRef(null);
    const [showOptions, setShowOptions] = usePopup(colorPickerRef)

    const isValidateHexSix = new RegExp('^#[0-9A-Za-z]{6}')
    const isValidateHexThree = new RegExp('^#[0-9A-Za-z]{3}')

    const changeColor = (e) => {
        const clickedColor = e.target.getAttribute("data-value");
        selection && Transforms.select(editor, selection)
        selection && ReactEditor.focus(editor);

        CustomEditor.addMarkData(editor, { format, value: clickedColor })
        setShowOptions(false);
    }

    const toggleOption = (e) => {
        e.preventDefault()
        setSelection(editor.selection);
        selection && ReactEditor.focus(editor);
        setShowOptions(prev => !prev)
    }

    const handleClickButton = () => {
        if (!validHex) return;
        selection && Transforms.select(editor, selection)

        CustomEditor.addMarkData(editor, { format, value: hexValue })
        setShowOptions(false);
        setValidHex('');
        setHexValue('');
        selection && ReactEditor.focus(editor);
    }

    const handleHexChange = (e) => {
        e.preventDefault();
        const newHex = e.target.value;
        setValidHex(isValidateHexSix.test(newHex) || isValidateHexThree.test(newHex));
        setHexValue(newHex);
    }

    return (
        <div className='color-picker popup-wrapper' ref={colorPickerRef}>
            <Button
                style={{ color: CustomEditor.isMarkActive(editor, format) }}
                title={title}
                onMouseDown={toggleOption}>
                <Icon icon={iconName} />
            </Button>
            {showOptions &&
                <div className='popup'>
                    <div className='color-options'>
                        {
                            colors.map((color, index) => {
                                return <div key={index} data-value={color} onClick={changeColor} className='option' style={{ background: color }}></div>
                            })
                        }
                    </div>
                    <p style={{ textAlign: 'center', opacity: '0.7', width: '100%' }}>OR</p>
                    <section>
                        <div className='hexPreview' style={{ background: validHex ? hexValue : '#000000' }}></div>
                        <input type="text" placeholder='#000000' value={hexValue} onChange={handleHexChange} style={{ border: validHex === false ? '1px solid red' : '1px solid lightgray' }} />
                        <Button
                            style={{ color: validHex ? 'green' : '' }}
                            onMouseDown={handleClickButton}>
                            <Icon icon={'check'} />
                        </Button>
                    </section>
                </div>
            }
        </div>
    )
}

export default ColorPicker;
