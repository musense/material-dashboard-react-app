import React from "react";
import { css, cx } from '@emotion/css';

export default function VideoSelector({ styles, onRemoveClick, mediaHelperFunc }) {

    return <div className={`${styles['upload-wrapper']} `}>
        <div>
            <label htmlFor='filmUrl'>影片連結</label>
            <input
                type='text'
                name='filmUrl'
                id='detail-form-film-url'
                placeholder={'影片連結'}
                className={cx(
                    'film-group',
                    css`
                                        ::placeholder{
                                            color: lightgray;
                                        }`)} />
        </div>
        <div>
            <label htmlFor='film-url-preview'>
                選取影片
                <input
                    id='film-url-preview'
                    type='button'
                    name='film-url-preview'
                    onClick={() => mediaHelperFunc.previewFilm()}
                    className='film-group' />
            </label>
            <input
                type='button'
                name='remove-image'
                value='刪除影片'
                onClick={onRemoveClick}
                className='film-group' />
        </div>
    </div>;
}
