import React, { useMemo, useState } from 'react';

import { useSelector } from 'react-redux';

import { CategoryProps, SelectProps } from '../data';
import MultiSelectSort from './base/MultiSelectSort';

export default function MultiClassificationSelectSort({
  setSelectedItems,
  selectedItems,
}) {
  const classifications = useSelector(
    (state: { getClassReducer: { classifications: CategoryProps[] } }) =>
      state.getClassReducer.classifications
  );
  // console.log("🚀 ~ file: MultiClassificationSelectSort.tsx:16 ~ classifications:", classifications)

  const [classOptions, setClassOptions] = useState<SelectProps[]>();
  useMemo(() => {
    const classList =
      classifications &&
      classifications.map((item) => ({
        value: item._id,
        label: item.name,
      }));
    setClassOptions(classList);
  }, [classifications]);

  return (
    <MultiSelectSort
      options={classOptions}
      setSelectedItems={setSelectedItems}
      selectedItems={selectedItems}
    />
  );
}
