import React, { useMemo } from 'react';

import { useSelector } from 'react-redux';
import { EditorClass } from '../../../reducers/GetClassReducer';

import MultiSelectSortTest from './base/MultiSelectSortTest';

export default function MultiClassSelectSort({
  classArrayRef
}) {
  const editorClassList = useSelector(
    (state: {
      getClassReducer: {
        editorClassList: EditorClass[];
        editorClass: EditorClass;
        errorMessage: String | null;
      };
    }) => state.getClassReducer.editorClassList
  );
  // console.log(
  //   '🚀 ~ file: MultiClassSelectSort.tsx:18 ~ MultiClassSelectSort ~ editorClassList:',
  //   editorClassList
  // );

  const classOptions = useMemo(() => {
    if (!editorClassList) return;
    return editorClassList.map((editorClass) => ({
      value: editorClass._id,
      label: editorClass.name,
    }));
  }, [editorClassList]);

  // console.log(
  //   '🚀 ~ file: MultiClassSelectSort.tsx:39 ~ classOptions ~ classOptions:',
  //   classOptions
  // );

  return (
    <MultiSelectSortTest
      options={classOptions}
      selectedArrayRef={classArrayRef}
    />
  );
}
