import React, { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import MultiSelectSort, { SelectProps } from './MultiSelectSort';
import { SET_PARENT_CLASS_OPTIONS } from './../../actions/GetClassAction';

export default function SingleParentCatSelectSort({
  setSelectedItems,
  selectedItems,
}) {
  const dispatch = useDispatch();
  const classList = useSelector(
    (state: { getClassReducer: { classList: Map<any, any> } }) =>
      state.getClassReducer.classList
  );
  // console.log(
  //   '🚀 ~ file: SingleParentCatSelectSort.tsx:18 ~ SingleParentCatSelectSort ~ classList:',
  //   classList
  // );
  const [classOptions, setClassOptions] = useState<SelectProps[]>();
  const defaultOptions = useMemo(() => {
    let tempList = [],
      counter = 0;
    for (const name of classList.keys()) {
      const tempObj = {
        value: counter++,
        label: name,
      };
      tempList.push(tempObj);
    }

    return tempList;
  }, [classList]);
 
  useEffect(() => {
    setClassOptions(defaultOptions);
    dispatch({
      type: SET_PARENT_CLASS_OPTIONS,
      payload: defaultOptions,
    });
  }, [defaultOptions]);

  return (
    <MultiSelectSort
      isMulti={false}
      options={classOptions}
      setSelectedItems={setSelectedItems}
      selectedItems={selectedItems}
    />
  );
}
