
export default function SortingHelperFunc(defaultViewList) {
    const titleViewList=[]

    function set(defaultViewList) {
        setTitleViewList(defaultViewList)
    }
    function get() {
        return titleViewList
    }

    function setTitleViewList(titleList) {
        titleViewList = [...titleList]
        return titleViewList
    }

    const serialNumberSortingRef = useRef('asc')
    const titleSortingRef = useRef('asc')
    const classificationSortingRef = useRef('asc')
    const createAtSortingRef = useRef('asc')

    function onSerialNumberClick() {
        const tempViewList = [...defaultViewList]
        if (serialNumberSortingRef.current === 'asc') {
            serialNumberSortingRef.current = 'desc'
            setTitleViewList(tempViewList.sort((t1, t2) => parseInt(t2.serialNumber) - parseInt(t1.serialNumber)))
        } else {
            serialNumberSortingRef.current = 'asc'
            setTitleViewList(tempViewList.sort((t1, t2) => parseInt(t1.serialNumber) - parseInt(t2.serialNumber)))
        }
    }
    function onTitleClick() {
        console.log('onTitleClick');

        const tempViewList = [...defaultViewList]
        if (titleSortingRef.current === 'asc') {
            titleSortingRef.current = 'desc'
            setTitleViewList(tempViewList.sort((t1, t2) => t2.content.title.localeCompare(t1.content.title)))
        } else {
            titleSortingRef.current = 'asc'
            setTitleViewList(tempViewList.sort((t1, t2) => t1.content.title.localeCompare(t2.content.title)))
        }
    }
    // onClassificationClick() {
    //     const tempViewList = [...titleViewList]
    //     if (classificationSortingRef.current === 'asc') {
    //         classificationSortingRef.current = 'desc'
    //         setTitleViewList(tempViewList.sort((t1, t2) => t2.classification.localeCompare(t1.classification)))
    //     } else {
    //         classificationSortingRef.current = 'asc'
    //         setTitleViewList(tempViewList.sort((t1, t2) => t1.classification.localeCompare(t2.classification)))
    //     }
    // },
    function onCreateAtClick() {
        const tempViewList = [...defaultViewList]
        if (createAtSortingRef.current === 'asc') {
            createAtSortingRef.current = 'desc'
            setTitleViewList(tempViewList.sort((t1, t2) => (new Date(t2.createDate)).getTime() - (new Date(t1.createDate)).getTime()))
        } else {
            createAtSortingRef.current = 'asc'
            setTitleViewList(tempViewList.sort((t1, t2) => (new Date(t1.createDate)).getTime() - (new Date(t2.createDate)).getTime()))
        }
    }
}