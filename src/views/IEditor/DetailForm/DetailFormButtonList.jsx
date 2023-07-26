import React, { useState } from "react";

export default function DetailFormButtonList({ styles }) {
    const [preview, setPreview] = useState(false);
    return <section id="button">
        <div className={styles['button-wrapper']}>
            <input type='submit' onClick={() => setPreview(false)} value='確認' />
            <input type='submit' onClick={() => setPreview(true)} value='預覽' />
        </div>
    </section>;
}