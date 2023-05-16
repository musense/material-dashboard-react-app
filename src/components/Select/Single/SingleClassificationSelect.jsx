import React, { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import SingleSelector from './base/SingleSelectorTest';

import { RESET_SELECTED_CLASS } from '../../../actions/GetClassAction';

//* classRef: parent form get selected value
export default function SingleClassificationSelect({ creatable, classRef }) {

  const editorClass = useSelector((state) => state.getClassReducer.editorClass);
  const classifications = useSelector((state) => state.getClassReducer.classifications);
  const reset = useSelector((state) => state.getClassReducer.reset);

  const [selected, setSelected] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    switch (reset) {
      case '--reset-all': {
        setSelected(null)
        //* reset [分類名稱] 選擇
        dispatch({
          type: RESET_SELECTED_CLASS,
          payload: null
        });
        break;
      }
    }
  }, [reset]);

  //* 選擇[分類名稱]預設值
  useMemo(() => {
    if (editorClass) {
      const option = {
        value: editorClass._id,
        label: editorClass.name
      }
      setSelected(option)
      console.log("🚀 ~ file: EditorLeftWrapper.jsx:64 ~ option ~ option:", option)
    }
  }, [editorClass])

  //* 選擇[分類名稱]名單
  const classOptions = useMemo(() => {
    console.log("🚀 ~ file: SingleClassificationSelect.jsx:45 ~ SingleClassificationSelect ~ classifications:", classifications)
    if (!classifications) return;
    return classifications.map((item) => ({
      value: item._id,
      label: item.name,
    }));
  }, [classifications]);

  return (
    <SingleSelector
      creatable={creatable}
      parentSelected={selected}
      parentSetSelected={setSelected}
      selectedRef={classRef}
      options={classOptions}
    />
  );
}
