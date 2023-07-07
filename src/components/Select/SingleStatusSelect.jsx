import React, { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import SingleSelector from './base/Selector';

import { RESET_SELECTED_CLASS } from 'actions/GetClassAction';

//* classRef: parent form get selected value
export default function SingleStatusSelect({
  creatable,
  statusRef,
  width = null
}) {
  console.log("🚀 ~ file: SingleStatusSelect.jsx:10 ~ SingleStatusSelect ~ width:", width)

  const editorStatus = useSelector((state) => state.getClassReducer.editorStatus);
  const reset = useSelector((state) => state.getClassReducer.reset);

  // const [selected, setSelected] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    switch (reset) {
      case '--reset-all': {
        statusRef.current = null
        //* reset [文章狀態] 選擇
        dispatch({
          type: RESET_SELECTED_CLASS,
          payload: null
        });
        break;
      }
    }
  }, [reset]);

  //* 選擇[文章狀態]名單
  const statusOptions = useMemo(() => {
    console.log("🚀 ~ file: SingleStatusSelect.jsx:45 ~ SingleStatusSelect ~ editorStatus:", editorStatus)
    if (!editorStatus) return;
    return editorStatus.map((item) => ({
      value: item._id,
      label: item.name,
    }));
  }, [editorStatus]);

  return (
    <SingleSelector
      creatable={creatable}
      selectedRef={statusRef}
      options={statusOptions}
      controlWidth={width}
    />
  );
}
