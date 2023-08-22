import React, { useRef } from "react";
import { css, cx } from '@emotion/css';
import useUploadImage from "hook/useUploadImage";

export default function ImageSelector({
    styles,
    altText,
    onRemoveClick,
    onImageChange,
    onMediaAltTextChange,
    alt = true
}) {

    const imageUploadRef = useRef(null)
    const { isError } = useUploadImage(imageUploadRef, onImageChange)

    return <div className={`${styles['upload-wrapper']}`}>
        <div>
            <label htmlFor='altText'>選取圖片</label>
            <span className={isError
                ? css`
                                            display:block;
                                            color: red;
                                            font-size: 12px;`
                : css`display:none`}>請選取圖片!!! (jpeg, png, gif)</span>
            {alt && <input
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

            />}
        </div>
        <div>
            <input
                type='button'
                name='remove-image'
                value='刪除圖片'
                onClick={onRemoveClick}
                className='image-group'
            />
            <label htmlFor='uploadImage'>
                上傳圖片
                <input
                    ref={imageUploadRef}
                    id='uploadImage'
                    type='file'
                    name='uploadImage'
                    accept='image/png, image/jpeg'
                    // onChange={previewImage}
                    className='image-group' />
            </label>
        </div>
    </div>;
}