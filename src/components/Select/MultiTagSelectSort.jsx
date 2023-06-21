import React, { useMemo, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Selector from './base/Selector';

import { RESET_SELECTED_CLASS } from 'actions/GetClassAction';


export default function MultiTagSelectSort({
  creatable = false,
  tagArrayRef,
  width = null
}) {
  console.log("🚀 ~ file: MultiTagSelectSort.jsx:9 ~ MultiTagSelectSort ~ tagArrayRef:", tagArrayRef)

  const tagList = useSelector((state) => state.getTagsReducer.tagList);
  const reset = useSelector((state) => state.getClassReducer.reset);
  // console.log(
  //   '🚀 ~ file: MultiTagSelectSort.tsx:18 ~ MultiTagSelectSort ~ tagList:',
  //   tagList
  // );
  const dispatch = useDispatch();
  useEffect(() => {
    switch (reset) {
      case '--reset-all': {
        tagArrayRef.current = []
        //* reset [分類名稱] 選擇
        dispatch({
          type: RESET_SELECTED_CLASS,
          payload: null
        });
        break;
      }
    }
  }, [reset]);

  const tagOptions = useMemo(() => {
    console.log("🚀 ~ file: MultiTagSelectSort.jsx:39 ~ tagOptions ~ tagList:", tagList)
    if (!tagList) return;
    return tagList.map((tag) => ({
      value: tag._id,
      label: tag.name,
    }));
  }, [tagList]);

  return (
    <Selector
      isMulti
      creatable={creatable}
      selectedRef={tagArrayRef}
      options={tagOptions}
      controlWidth={width}
    />
  );
}
