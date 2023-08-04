import React from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Icon from './Icon';

export default function IconCell({
    iconName: name,
    iconTitle: title,
    callback,
    copy = false,
    copyText = null
}) {
    let inputProps = {
        title: title,
        className: "edit-icon-input",
        type: "button"
    }
    let content
        , iconCell = ({ inputProps, callback = null }) => {
            if (callback) {
                inputProps = {
                    ...inputProps,
                    onClick: callback
                }
            }
            return <div div className="edit-icon-wrapper" >
                <input {...inputProps} />
                < Icon iconName={name} />
            </div>
        }
        , copyTemplate = (
            <CopyToClipboard text={copyText} onCopy={callback}>
                {iconCell({ inputProps })}
            </CopyToClipboard>
        )
    if (!copy) {
        content = iconCell({ inputProps, callback })
    } else {
        content = copyTemplate
    }
    return content
}