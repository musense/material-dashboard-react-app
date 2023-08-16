import React, { useState, useRef, useMemo } from 'react'
// import EditorManagerHelperFunc from './EditorManagerHelperFunc'
import styles from "./EditorManager.module.css";

import DraggableList from "./DraggableList";


function EditorManagerNews() {


  const defaultList = [
    { _id: "A", serialNumber: '0', title: "aaaaa", createDate: "2023-04-17", newsSorting: 4 },
    { _id: "B", serialNumber: '1', title: "bbbbb", createDate: "2023-04-18" },
    { _id: "C", serialNumber: '2', title: "ccccc", createDate: "2023-04-11" },
    { _id: "D", serialNumber: '3', title: "ddddd", createDate: "2023-04-01" },
    { _id: "E", serialNumber: '4', title: "eeeee", createDate: "2023-03-12" }
  ];


  const setRowItem = (props, rowIndex) => {
    const divElement = document.createElement('div');
    divElement.setAttribute('key', rowIndex)
    for (const key in props) {

      if (Object.hasOwnProperty.call(props, key)) {
        const element = document.createElement('div');
        element.innerText = props[key]

        divElement.appendChild(element)
      }
    }
    return divElement
  }


  const itemList = useMemo(() => {

    const newsSortingList = defaultList
      .filter(item => item['newsSorting'] !== undefined)
      .sort((a, b) => a.newsSorting - b.newsSorting)

    const notNewSortingList = defaultList
      .filter(item => newsSortingList.every(i => i._id !== item._id))
    notNewSortingList.length > 0 && notNewSortingList.sort((a, b) => new Date(b.createDate) - new Date(a.createDate))

    newsSortingList.map(newsItem => {
      notNewSortingList.splice(newsItem.newsSorting, 0, newsItem)
    })

    const sortingList = [...notNewSortingList]
    return sortingList.map((item, index) => {
      return {
        key: item._id,
        serialNumber: item.serialNumber,
        title: item.title,
        createDate: item.createDate,
        isSorting: item.newsSorting
      }
    })
  }, [defaultList])


  return (
    <article>
      <h1>Editor Manager News</h1>
      <DraggableList defaultList={itemList} />
    </article>
  )

}

export default EditorManagerNews
