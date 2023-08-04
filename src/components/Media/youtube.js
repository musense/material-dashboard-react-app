import axios from 'axios';

export async function fetchYoutubeInfo(videoId) {
    return await axios.get(`https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${videoId}&format=json`)
        .then(response => response.data)
}
