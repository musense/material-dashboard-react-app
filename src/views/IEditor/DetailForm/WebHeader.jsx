import React from "react";

export default function WebHeader({ title, onPropertyChange, description, keywords, manualUrl, customUrl }) {
    return <section id="webHeader">
        <div >
            <label htmlFor='title'>title</label>
            <input type='text' name='title' value={title} onChange={e => onPropertyChange(e.target.value, 'title', 'webHeader')} />
        </div>
        <div >
            <label htmlFor='description'>description</label>
            <input type='text' name='description' value={description} onChange={e => onPropertyChange(e.target.value, 'description', 'webHeader')} />
        </div>
        <div >
            <label htmlFor='keywords'>keywords</label>
            <input type='text' name='keywords' value={keywords} onChange={e => onPropertyChange(e.target.value, 'keywords', 'webHeader')} />
        </div>
        <div >
            <label htmlFor='custom-url'>自訂網址</label>
            <input type='text' name='manualUrl' value={manualUrl} onChange={e => onPropertyChange(e.target.value, 'manualUrl', 'webHeader')} />
        </div>
        <div >
            <label htmlFor='real-url'>前台顯示網址</label>
            {manualUrl && manualUrl.length > 0
                ? <input
                    type='text'
                    name='real-url'
                    value={`p_${manualUrl}.html`}
                    readOnly
                    disabled />
                : <div><a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={customUrl}
                >{customUrl}</a></div>}

        </div>
    </section>;
}