import React
    from "react";
import { css, cx } from '@emotion/css';

export default function ImageSelector({ 
    styles, 
    onRemoveClick, 
    onMediaAltTextChange, 
    isError, 
    altText,
    mediaHelperFunc 
}) {

    return <div className={`${styles['upload-wrapper']}`}>
        <div>
            <label htmlFor='altText'>選取圖片</label>
            <span className={isError
                ? css`
                                            display:block;
                                            color: red;
                                            font-size: 12px;`
                : css`display:none`}>請選取圖片!!! (jpeg, png, gif)</span>
            <input
                type='text' 
                name='altText'
                value={altText}
                onChange={e => onMediaAltTextChange(e.target.value)}
                placeholder={'替代文字'}
                className={cx(
                    'image-group',
                    css`
                                        ::placeholder{
                                            color: lightgray;
                                        }`)}

            />
        </div>
        <div>
            <label htmlFor='uploadImage'>
                上傳圖片
                <input
                    id='uploadImage'
                    type='file'
                    name='uploadImage'
                    accept='image/png, image/jpeg'
                    onChange={(e) => mediaHelperFunc.previewImage(e)}
                    className='image-group' />
            </label>
            <input
                type='button'
                name='remove-image'
                value='刪除圖片'
                onClick={onRemoveClick}
                className='image-group' />
        </div>
    </div>;
}