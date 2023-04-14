import React, { useMemo, useState } from 'react';

import { useSelector } from 'react-redux';
import { EditorClass } from '../../reducers/GetClassReducer';

import MultiSelectSort, { SelectProps } from './MultiSelectSort';

export default function MultiClassSelectSort({ setSelectedItems, selectedItems }) {
  const editorClassList = useSelector(
    (state: {
      getClassReducer: {
        editorClassList: EditorClass[];
        editorClass: EditorClass;
        errorMessage: String | null;
      };
    }) => state.getClassReducer.editorClassList
  );
  // console.log("🚀 ~ file: MultiClassSelectSort.tsx:18 ~ MultiClassSelectSort ~ editorClassList:", editorClassList)

  const [classOptions, setClassOptions] = useState<SelectProps[]>();
  useMemo(() => {
    const classList = editorClassList.map((editorClass) => ({
      value: editorClass._id,
      label: editorClass.classification,
    }));
    setClassOptions(classList);
  }, [editorClassList]);

  return (
    <MultiSelectSort
      options={classOptions}
      setSelectedItems={setSelectedItems}
      selectedItems={selectedItems}
    />
  );
}
