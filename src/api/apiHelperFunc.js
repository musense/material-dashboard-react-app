import { put } from 'redux-saga/effects';

const bend2FendMap = new Map([
    ['_id', '_id'],
    ['headTitle', 'webHeader.headTitle'],
    ['headKeyword', 'webHeader.headKeyword'],
    ['headDescription', 'webHeader.headDescription'],
    ['manualUrl', 'webHeader.manualUrl'],
    ['sitemapUrl', 'webHeader.customUrl'],
    ['title', 'content.title'],
    ['content', 'content.content'],
    ['categories', 'categories'],
    ['tags', 'tags'],
    ['media.altText', 'media.altText'],
    ['contentImagePath', 'media.contentImagePath'],
    ['homeImagePath', 'media.homeImagePath'],
    ['hide', 'hide'],
    ['scheduledAt', 'scheduleTime'],
])

const fend2BendMap = new Map([
    ['_id', '_id'],
    ['webHeader.headTitle', 'headTitle'],
    ['webHeader.headKeyword', 'headKeyword'],
    ['webHeader.headDescription', 'headDescription'],
    ['webHeader.manualUrl', 'manualUrl'],
    ['webHeader.customUrl', 'sitemapUrl'],
    ['content.title', 'title'],
    ['content.content', 'content'],
    ['categories', 'categories'],
    ['tags', 'tags'],
    ['media.altText', 'altText'],
    ['media.contentImagePath', 'contentImagePath'],
    ['media.homeImagePath', 'homeImagePath'],
    ['hide', 'hide'],
    ['scheduleTime', 'scheduledAt'],
    ['draft', 'draft'],
])

export function toFrontendData(responseData) {
    console.log("🚀 ~ file: apiHelperFunc.js:34 ~ toFrontendData ~ responseData:", responseData)
    if (Array.isArray(responseData)) {
        return responseData.map(item => ({
            _id: item._id,
            serialNumber: item.serialNumber,
            content: {
                title: item.title,
                content: item.content
            },
            sorting: {
                isNews: {
                    get: () => item.topSorting ? true : false,
                    newsSorting: item.topSorting,
                },
                isHot: {
                    get: () => item.popularSorting ? true : false,
                    hotSorting: item.popularSorting,
                },
                isRecommend: {
                    get: () => item.recommendSorting ? true : false,
                    recommendSorting: item.recommendSorting,
                },
            },
            tags: item.tags && item.tags.length > 0
                ? item.tags.map(tag => ({
                    value: tag._id,
                    label: tag.name,
                }
                ))
                : [],
            categories: item.categories ? {
                value: item.categories._id,
                label: item.categories.name,
            } : null,
            webHeader: {
                headTitle: item.headTitle || '',
                headDescription: item.headDescription || '',
                headKeyword: item.headKeyword || '',
                manualUrl: item.manualUrl || '',
                customUrl: item.sitemapUrl || '',
            },
            media: {
                contentImagePath: item.contentImagePath || '',
                homeImagePath: item.homeImagePath || '',
                altText: item.altText || '',
            },
            pageView: item.pageView,
            hide: item.hide || false,
            createDate: item.createdAt,
            updateDate: item.updatedAt,
            sitemapUrl: item.sitemapUrl,
            isScheduled: item.scheduledAt ? true : false,
            scheduleTime: item.scheduledAt,
            status: item.status,
            publishDate: item.publishedAt,
            isPublished: item.publishedAt ? true : false,
        })

        )
    }
    else {
        return {
            _id: responseData._id,
            serialNumber: responseData.serialNumber,
            content: {
                title: responseData.title,
                content: responseData.content
            },
            sorting: {
                isNews: {
                    get: () => responseData.topSorting ? true : false,
                    newsSorting: responseData.topSorting,
                },
                isHot: {
                    get: () => responseData.popularSorting ? true : false,
                    hotSorting: responseData.popularSorting,
                },
                isRecommend: {
                    get: () => responseData.recommendSorting ? true : false,
                    recommendSorting: responseData.recommendSorting,
                },
            },
            tags: responseData.tags && responseData.tags.length > 0
                ? responseData.tags.map(tag => ({
                    value: tag._id,
                    label: tag.name,
                }
                ))
                : [],
            categories: responseData.categories ? {
                value: responseData.categories._id,
                label: responseData.categories.name,
            } : null,
            webHeader: {
                headTitle: responseData.headTitle || '',
                headDescription: responseData.headDescription || '',
                headKeyword: responseData.headKeyword || '',
                manualUrl: responseData.manualUrl || '',
                customUrl: responseData.sitemapUrl || '',
            },
            media: {
                contentImagePath: responseData.contentImagePath || '',
                homeImagePath: responseData.homeImagePath || '',
                altText: responseData.altText || '',
            },
            pageView: responseData.pageView,
            hide: responseData.hide || false,
            createDate: responseData.createdAt,
            updateDate: responseData.updatedAt,
            sitemapUrl: responseData.sitemapUrl,
            isScheduled: responseData.scheduledAt ? true : false,
            scheduleTime: responseData.scheduledAt,
            status: responseData.status,
            publishDate: responseData.publishedAt,
            isPublished: responseData.publishedAt ? true : false,
        }
    }
}

export function toBackendFormData(requestData, createType) {
    const formData = new FormData()
    if (createType === 'add_new') {
        formData.append('title', JSON.stringify(requestData.title))
        formData.append('content', JSON.stringify(requestData.content))
    }
    if (requestData.webHeader) {
        Object.entries(requestData.webHeader).forEach(([key, value]) => {
            formData.append(key, JSON.stringify(value))
        })
    }
    if (requestData.tags) {
        formData.append('tags', JSON.stringify(requestData.tags))
    }
    if (requestData.categories) {
        formData.append('categories', JSON.stringify([requestData.categories]))
    }
    if (requestData.media) {
        Object.entries(requestData.media).forEach(([key, value]) => {
            if (key === 'contentImagePath') {
                if (value.indexOf('data:image') !== -1) {
                    const imageFile = generateImageFile(value);
                    formData.append('contentImagePath', imageFile)
                } else {
                    formData.append('contentImagePath', new Blob([value], { type: 'text/plain' }))
                }
            } else if (key === 'homeImagePath') {
                value !== null && formData.append('homeImagePath', new Blob([value], { type: 'text/plain' }))
            } else {
                formData.append('altText', JSON.stringify(value))
            }

        })
    }
    if (requestData.publishInfo) {
        Object.entries(requestData.publishInfo).forEach(([key, value]) => {
            formData.append(key, JSON.stringify(value))
        })
    }
    if (requestData.draft) {
        formData.append('draft', JSON.stringify(requestData.draft))
    }

    return formData
}


function generateImageFile(value) {
    const dataUrl = value;
    // Extract the base64-encoded data from the data URI
    const dataType = dataUrl.split(',')[0].split(':')[1].split(';')[0];
    const ext = dataType.split('/')[1];
    const base64Data = dataUrl.split(',')[1];
    // Decode the base64 data to binary data
    const binaryData = atob(base64Data);
    // Convert the binary data to a Uint8Array
    const uint8Array = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
    }
    // Create a new Blob using the Uint8Array
    const imageBlob = new Blob([uint8Array]);
    // Create a new File using the Blob
    const imageFile = new File([imageBlob], `imageFile.${ext}`, { type: dataType, lastModified: Date.now() });
    return imageFile;
}

export function* getErrorMessage(error, patchType) {
    console.log("🚀 ~ file: apiHelperFunc.js:213 ~ getErrorMessage ~ error:", error)
    console.log("🚀 ~ file: apiHelperFunc.js:213 ~ *getErrorMessage ~ patchType:", patchType)
    let errorMessage;
    if (error.response) {
        errorMessage = error.response.data.message || error.response.data.messages.join(',')
    } else {
        errorMessage = error.code
    }
    console.log("🚀 ~ file: apiHelperFunc.js:213 ~ *getErrorMessage ~ errorMessage:", errorMessage)

    if (error.response) {
        yield put({
            type: patchType,
            payload: {
                errorMessage: errorMessage
            }

        })
    }
}

export function* getGetErrorMessage(error, patchType) {
    console.log("🚀 ~ file: apiHelperFunc.js:235 ~ function*getGetErrorMessage ~ error:", error)
    console.log("🚀 ~ file: apiHelperFunc.js:235 ~ function*getGetErrorMessage ~ patchType:", patchType)
    yield put({
        type: patchType,
        payload: {
            errorMessage: error.message
        }
    })
}

