import React from "react";

export default function WebHeader({ headTitle, onPropertyChange, headDescription, headKeyword, manualUrl, customUrl }) {
    return <section id="webHeader">
        <div >
            <label htmlFor='headTitle'>headTitle</label>
            <input type='text' name='headTitle'
                value={headTitle} onChange={e => onPropertyChange(e.target.value, 'headTitle', 'webHeader')} />
        </div>
        <div >
            <label htmlFor='headDescription'>headDescription</label>
            <input type='text' name='headDescription'
                value={headDescription} onChange={e => onPropertyChange(e.target.value, 'headDescription', 'webHeader')} />
        </div>
        <div >
            <label htmlFor='headKeyword'>headKeyword</label>
            <input type='text' name='headKeyword'
                value={headKeyword} onChange={e => onPropertyChange(e.target.value, 'headKeyword', 'webHeader')} />
        </div>
        <div >
            <label htmlFor='custom-url'>自訂網址</label>
            <input type='text' name='manualUrl'
                value={manualUrl} onChange={e => onPropertyChange(e.target.value, 'manualUrl', 'webHeader')} />
        </div>
        <div >
            <label htmlFor='real-url'>前台顯示網址</label>
            {manualUrl && manualUrl.length > 0
                ? <div><input readOnly disabled
                    value={`p_${manualUrl}.html`}
                /></div>
                : <div><a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={customUrl}
                >{customUrl}</a></div>}

        </div>
    </section>;
}