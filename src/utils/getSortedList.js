function getSortedList(originalList, sortingKey, sortingMap) {
    const clonedList = [...originalList]
    let sortedList = clonedList.sort((item1, item2) => {
        let typeOf = typeof item1[sortingKey]
        let k1, k2, e1, e2
        if (sortingKey.indexOf('.') !== -1) {
            k1 = sortingKey.split('.')[0]
            k2 = sortingKey.split('.')[1]
            e1 = item1[k1][k2]
            e2 = item2[k1][k2]
            typeOf = typeof item1[k1][k2]
        } else {
            e1 = item1[sortingKey]
            e2 = item2[sortingKey]
            typeOf = typeof item1[sortingKey]
        }
        const testDateValue = new Date(e1)
        typeOf = testDateValue instanceof Date && !isNaN(testDateValue) ? 'date' : typeOf
        const sorting = sortingMap[sortingKey]
        switch (typeOf) {
            case 'string': {
                if (sorting === 'asc') {
                    return e1.localeCompare(e2)
                } else {
                    return e2.localeCompare(e1)
                }
            }
            case 'boolean': {
                if (sorting === 'asc') {
                    return e1.toString().localeCompare(e2.toString())
                } else {
                    return e2.toString().localeCompare(e1.toString())
                }
            }
            case 'number': {
                if (sorting === 'asc') {
                    return parseInt(e1) - parseInt(e2)
                } else {
                    return parseInt(e2) - parseInt(e1)
                }
            }
            case 'date': {
                if (sorting === 'asc') {
                    return (new Date(e1)).getTime() - (new Date(e2)).getTime()
                } else {
                    return (new Date(e2)).getTime() - (new Date(e1)).getTime()
                }
            }
        }
    })
    if (sortingKey === 'sorting') {
        const popularTagList = sortedList.filter(tag => tag.popular === true)
        const unpopularTagList = sortedList.filter(tag => tag.popular === false)
        sortedList = [
            ...popularTagList,
            ...unpopularTagList
        ]
    }

    return [...sortedList]

}

export default getSortedList