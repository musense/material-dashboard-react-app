import React from 'react';

import { useSelector } from 'react-redux';
import Selector from './base/Selector';

//* classRef: parent form get selected value
export default function SingleStatusSelect({
  creatable,
  defaultSelected,
  width = null,
  height = null,
  setState
}) {
  console.log("🚀 ~ file: SingleStatusSelect.jsx:16 ~ defaultSelected:", defaultSelected)
  console.log("🚀 ~ file: SingleStatusSelect.jsx:10 ~ SingleStatusSelect ~ width:", width)

  const statusOptions = useSelector((state) => state.getClassReducer.editorStatus);

  return (
    <Selector
      creatable={creatable}
      options={statusOptions}
      controlWidth={width}
      controlHeight={height}
      setState={setState}
      defaultSelected={defaultSelected}
    />
  );
}
