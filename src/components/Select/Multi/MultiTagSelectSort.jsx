import React, { useMemo, useState } from 'react';

import { useSelector } from 'react-redux';
import MultiSelectSortTest from './base/MultiSelectSortTest';

export default function MultiTagSelectSort({ tagArrayRef }) {
  
  const tagList = useSelector((state) => state.getTagsReducer.tagList);
  // console.log(
  //   '🚀 ~ file: MultiTagSelectSort.tsx:18 ~ MultiTagSelectSort ~ tagList:',
  //   tagList
  // );
  const tagOptions = useMemo(() => {
    if (!tagList) return;
    return tagList.map((tag) => ({
      value: tag._id,
      label: tag.name,
    }));
  }, [tagList]);

  return (
    <MultiSelectSortTest options={tagOptions} selectedArrayRef={tagArrayRef} />
  );
}
