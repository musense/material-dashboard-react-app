import React from 'react';
import { useSelector } from 'react-redux';
import Selector from './base/Selector';

export default function SingleClassificationSelect({
  creatable,
  defaultSelected,
  width = null,
  height = null,
  setState = null
}) {
  console.log("🚀 ~ file: SingleClassificationSelect.jsx:14 ~ defaultSelected:", defaultSelected)
  console.log("🚀 ~ file: SingleClassificationSelect.jsx:10 ~ SingleClassificationSelect ~ width:", width)

  const classOptions = useSelector((state) => state.getClassReducer.editorClassList);

  return (
    <Selector
      creatable={creatable}
      options={classOptions}
      controlWidth={width}
      controlHeight={height}
      setState={setState}
      defaultSelected={defaultSelected}
    />
  );
}
