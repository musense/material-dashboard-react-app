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
    { _id: 0, name: '已排程' },
    { _id: 1, name: '進行中' },
    { _id: 2, name: '下架' },
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
