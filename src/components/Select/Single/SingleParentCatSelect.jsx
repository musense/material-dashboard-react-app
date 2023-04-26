import React, { useEffect, useMemo, useState } from 'react';
import SingleSelector from './base/SingleSelectorTest';

import { useDispatch, useSelector } from 'react-redux';
import * as GetClassAction from '../../../actions/GetClassAction';

//* parentClassRef: parent form get selected value
export default function SingleParentCatSelect({ parentClassRef }) {

  const editorClass = useSelector((state) => state.getClassReducer.editorClass);
  const classList = useSelector((state) => state.getClassReducer.classList);
  const parentClassOptions = useSelector((state) => state.getClassReducer.parentClassOptions);
  const reset = useSelector((state) => state.getClassReducer.reset);

  const [selected, setSelected] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (reset === '--reset-all') {
      setSelected(null)
      //* reset [上層分類] 選擇
      dispatch({
        type: GetClassAction.RESET_SELECTED_CLASS,
        payload: null
      });
      //* reset [分類名稱] 名單
      dispatch({
        type: GetClassAction.REQUEST_CLASS,
        payload: null
      })
    }
  }, [reset]);

  //* 選擇[上層分類]預設值
  useMemo(() => {
    if (editorClass) {
      const parentOption = parentClassOptions.find(options => {
        return options.label === editorClass.parentClass
      })
      setSelected(parentOption)

      console.log("🚀 ~ SingleParentCatSelectTest.jsx:46 ~ parentOption ~ parentOption:", parentOption)
    }
  }, [editorClass])


  //* dispatch: 選擇[分類名稱]名單
  useEffect(() => {
    console.log("🚀 ~ file: SingleParentCatSelectTest.jsx:46 ~ SingleParentCatSelectTest ~ selected:", selected)
    if (!selected) return
    //* reset [分類名稱] 選擇
    //! waiting for implementation
    // dispatch({
    //   type: GetClassAction.RESET_SELECTED_CLASS,
    //   payload: '--reset-class'
    // })
    dispatch({
      type: GetClassAction.REQUEST_CLASS,
      payload: selected.label
    })
  }, [selected]);

  //* 選擇[上層分類]名單
  const classOptions = useMemo(() => {
    let tempList = [],
      counter = 0;
    for (const name of classList.keys()) {
      const tempObj = {
        value: counter++,
        label: name,
      };
      tempList.push(tempObj);
    }

    return tempList;
  }, [classList]);


  useEffect(() => {
    //* 暫存[上層分類]名單
    dispatch({
      type: GetClassAction.SET_PARENT_CLASS_OPTIONS,
      payload: classOptions,
    });
  }, [classOptions])

  return <SingleSelector
    parentSelected={selected}
    parentSetSelected={setSelected}
    selectedArrayRef={parentClassRef}
    options={classOptions}
  />;
}
