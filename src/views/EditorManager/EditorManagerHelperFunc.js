import {useRef} from "react";


export default EditorManagerHelperFunc = {
  
    serialNumberSortingRef: useRef('asc'),
    titleSortingRef: useRef('asc'),
    createAtSortingRef: useRef('asc'),
  
    onSerialNumberClick() {
        const tempViewList = [...titleViewList]
        if (serialNumberSortingRef.current === 'asc') {
            serialNumberSortingRef.current = 'desc'
            setTitleViewList(tempViewList.sort((t1, t2) => parseInt(t2.serialNumber) - parseInt(t1.serialNumber)))
        } else {
            serialNumberSortingRef.current = 'asc'
            setTitleViewList(tempViewList.sort((t1, t2) => parseInt(t1.serialNumber) - parseInt(t2.serialNumber)))
        }
    },
    onTitleClick() {
        const tempViewList = [...titleViewList]
        if (titleSortingRef.current === 'asc') {
            titleSortingRef.current = 'desc'
            setTitleViewList(tempViewList.sort((t1, t2) => t2.content.title.localeCompare(t1.content.title)))
        } else {
            titleSortingRef.current = 'asc'
            setTitleViewList(tempViewList.sort((t1, t2) => t1.content.title.localeCompare(t2.content.title)))
        }
    },

    onCreateAtClick() {
        const tempViewList = [...titleViewList]
        if (createAtSortingRef.current === 'asc') {
            createAtSortingRef.current = 'desc'
            setTitleViewList(tempViewList.sort((t1, t2) => (new Date(t2.createDate)).getTime() - (new Date(t1.createDate)).getTime()))
        } else {
            createAtSortingRef.current = 'asc'
            setTitleViewList(tempViewList.sort((t1, t2) => (new Date(t1.createDate)).getTime() - (new Date(t2.createDate)).getTime()))
        }
    },
}