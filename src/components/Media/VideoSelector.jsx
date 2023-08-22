import React, { useCallback } from "react";
import { css, cx } from '@emotion/css';
import { fetchYoutubeInfo } from './youtube';

export default function VideoSelector({
    styles,
    onRemoveClick,
    onVideoChange
}) {

    const previewFilm = useCallback(async () => {
        onRemoveClick()

        const filmUrl = document.getElementsByName('filmUrl')[0].value;

        // https://www.youtube.com/watch?v=n-WbAWqZ7t4
        const youtubeID = filmUrl.substring(
            filmUrl.indexOf('?v=') + 3,
            filmUrl.length
        );
        const youtubeInfo = await fetchYoutubeInfo(youtubeID);
        if (youtubeInfo) {
            onVideoChange({
                iframeUrl: youtubeInfo.html,
                imageUrl: youtubeInfo.thumbnail_url
            })
        }
    }, [onRemoveClick, onVideoChange])

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
            <input
                type='button'
                name='remove-image'
                value='刪除影片'
                onClick={onRemoveClick}
                className='film-group'
            />
            <label htmlFor='film-url-preview'>
                選取影片
                <input
                    id='film-url-preview'
                    type='button'
                    name='film-url-preview'
                    onClick={previewFilm}
                    className='film-group' />
            </label>
        </div>
    </div>;
}
