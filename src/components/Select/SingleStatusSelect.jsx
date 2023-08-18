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

  const statusOptions = [
    { _id: 0, name: '全部' },
    { _id: 1, name: '草稿' },
    { _id: 2, name: '已排程' },
    { _id: 3, name: '隱藏文章' },
    { _id: 4, name: '已發布' },
  ]

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
