import React, { useEffect, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import SingleSelector from './base/Selector';

import { RESET_SELECTED_CLASS } from 'actions/GetClassAction';

//* classRef: parent form get selected value
export default function SingleClassificationSelect({
  creatable,
  classRef,
  width = null,
  height = null,
  setState = null
}) {
  console.log("🚀 ~ file: SingleClassificationSelect.jsx:10 ~ SingleClassificationSelect ~ width:", width)

  const editorClass = useSelector((state) => state.getClassReducer.editorClass);
  const editorClassList = useSelector((state) => state.getClassReducer.editorClassList);
  const reset = useSelector((state) => state.getClassReducer.reset);

  // const [selected, setSelected] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    switch (reset) {
      case '--reset-all': {
        classRef.current = null
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
      classRef.current = option
      // setSelected(option)
      console.log("🚀 ~ file: EditorLeftWrapper.jsx:64 ~ option ~ option:", option)
    }
  }, [editorClass])

  //* 選擇[分類名稱]名單
  const classOptions = useMemo(() => {
    console.log("🚀 ~ file: SingleClassificationSelect.jsx:45 ~ SingleClassificationSelect ~ editorClassList:", editorClassList)
    if (!editorClassList) return;
    return editorClassList.map((item) => ({
      value: item._id,
      label: item.name,
    }));
  }, [editorClassList]);

  return (
    <SingleSelector
      creatable={creatable}
      selectedRef={classRef}
      options={classOptions}
      controlWidth={width}
      controlHeight={height}
      setState={setState}
    />
  );
}
