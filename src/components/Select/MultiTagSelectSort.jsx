import React from 'react';
import { useSelector } from 'react-redux';
import Selector from './base/Selector';

export default function MultiTagSelectSort({
  defaultSelected,
  creatable = false,
  width = null,
  setState = null
}) {

  const tagOptions = useSelector((state) => state.getTagsReducer.tagList);

  return (
    <Selector
      isMulti
      creatable={creatable}
      options={tagOptions}
      controlWidth={width}
      setState={setState}
      defaultSelected={defaultSelected}
      name="標籤"
    />
  );
}
