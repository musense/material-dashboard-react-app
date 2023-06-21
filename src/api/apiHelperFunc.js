const bend2FendMap = new Map([
    ['_id', '_id'],
    ['headTitle', 'webHeader.title'],
    ['headKeyword', 'webHeader.keywords'],
    ['headDescription', 'webHeader.description'],
    ['manualUrl', 'webHeader.manualUrl'],
    ['sitemapUrl', 'webHeader.customUrl'],
    ['title', 'content.title'],
    ['content', 'content.content'],
    ['categories', 'classifications'],
    ['tags', 'tags'],
    ['media.altText', 'media.altText'],
    ['contentImagePath', 'media.banner'],
    ['homeImagePath', 'media.thumbnail'],
    ['hidden', 'hide'],
    ['scheduledAt', 'scheduleTime'],
])

const fend2BendMap = new Map([
    ['_id', '_id'],
    ['webHeader.title', 'headTitle'],
    ['webHeader.keywords', 'headKeyword'],
    ['webHeader.description', 'headDescription'],
    ['webHeader.manualUrl', 'manualUrl'],
    ['webHeader.customUrl', 'sitemapUrl'],
    ['content.title', 'title'],
    ['content.content', 'content'],
    ['classifications', 'categories'],
    ['tags', 'tags'],
    ['media.altText', 'altText'],
    ['media.banner', 'contentImagePath'],
    ['media.thumbnail', 'homeImagePath'],
    ['hide', 'hidden'],
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
            classifications: item.categories ? {
                value: item.categories._id,
                label: item.categories.name,
            } : null,
            webHeader: {
                title: item.headTitle || '',
                description: item.headDescription || '',
                keywords: item.headKeyword || '',
                manualUrl: item.manualUrl || '',
                customUrl: item.sitemapUrl || '',
            },
            media: {
                banner: item.contentImagePath || '',
                thumbnail: item.homeImagePath || '',
                altText: item.altText || '',
            },
            pageView: item.pageView,
            hide: item.hidden || false,
            createDate: item.createdAt,
            updateDate: item.updatedAt,
            sitemapUrl: item.sitemapUrl,
            isScheduled: item.scheduledAt ? true : false,
            scheduleTime: item.scheduledAt,
            status: item.status,
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
            classifications: responseData.categories ? {
                value: responseData.categories._id,
                label: responseData.categories.name,
            } : null,
            webHeader: {
                title: responseData.headTitle || '',
                description: responseData.headDescription || '',
                keywords: responseData.headKeyword || '',
                manualUrl: responseData.manualUrl || '',
                customUrl: responseData.sitemapUrl || '',
            },
            media: {
                banner: responseData.contentImagePath || '',
                thumbnail: responseData.homeImagePath || '',
                altText: responseData.altText || '',
            },
            pageView  : responseData.pageView,
            hide      : responseData.hidden || false,
            createDate: responseData.createdAt,
            updateDate: responseData.updatedAt,
            sitemapUrl: responseData.sitemapUrl,
            isScheduled: responseData.scheduledAt ? true : false,
            scheduleTime: responseData.scheduledAt,
            status: responseData.status,
        }
    }
}

export function toBackendData(requestData) {
    return {
        headTitle: requestData.webHeader.title,
        headKeyword: requestData.webHeader.keywords,
        headDescription: requestData.webHeader.description,
        title: requestData.content.title,
        content: requestData.content.content,
        categories: requestData.classifications,
        manualUrl: requestData.webHeader.href,
        altText: requestData.media.altText,
        tags: requestData.tags,
        // top: requestData.setTop,
        hidden: requestData.hide,
        // homeImagePath: requestData.media.banner,
    }
}

export function toBackendFormData(requestData) {
    console.group('toBackendFormData');
    console.log("🚀 ~ file: apiHelperFunc.js:128 ~ toBackendFormData ~ requestData:", requestData)
    const requestForm = new FormData();

    requestData.forEach((value, key) => {
        if (Array.isArray(value)) {
            requestForm.append(fend2BendMap.get(`${key}`), JSON.stringify(value))
        } else if (value && typeof value === 'object') {
            value.forEach((v, k) => {
                if (`${key}.${k}` === `media.banner`) {
                    typeof v === 'object' && requestForm.append(fend2BendMap.get(`${key}.${k}`), v)
                    typeof v === 'string' && requestForm.append(fend2BendMap.get(`${key}.${k}`), new Blob([v], { type: 'text/plain' }))
                } else if (`${key}.${k}` === `media.thumbnail`) {
                    console.log(`🚀 ~ file: apiHelperFunc.js:179 ~ value.forEach ~ v === null ?:`, v === null)
                    v !== null && requestForm.append(fend2BendMap.get(`${key}.${k}`), new Blob([v], { type: 'text/plain' }))
                } else {
                    requestForm.append(fend2BendMap.get(`${key}.${k}`), JSON.stringify(v))
                }
            })
        } else {
            requestForm.append(fend2BendMap.get(`${key}`), JSON.stringify(value))
        }
    })

    // console.log("🚀 ~ file: apiHelperFunc.js:170 ~ toBackendFormData ~ requestForm:", requestForm)
    const formDataObject = Object.fromEntries(requestForm)
    console.log("🚀 ~ file: apiHelperFunc.js:172 ~ toBackendFormData ~ formDataObject:", formDataObject)

    console.groupEnd('toBackendFormData');
    return requestForm
}
