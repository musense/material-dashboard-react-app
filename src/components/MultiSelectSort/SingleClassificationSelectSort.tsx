import React, { useMemo, useState } from 'react';

import { useSelector } from 'react-redux';

import MultiSelectSort, { CategoryProps, SelectProps } from './MultiSelectSort';

export default function SingleClassificationSelectSort({
  setSelectedItems,
  selectedItems,
}) {
  const classifications = useSelector(
    (state: { getClassReducer: { classifications: CategoryProps[] } }) =>
      state.getClassReducer.classifications
  );
  // console.log("🚀 ~ file: SingleClassificationSelectSort.tsx:16 ~ classifications:", classifications)

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
      isMulti={false}
      options={classOptions}
      setSelectedItems={setSelectedItems}
      selectedItems={selectedItems}
    />
  );
}
