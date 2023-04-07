import React from 'react';

import { useSelector } from 'react-redux';
import { EditorClass } from '../../reducers/GetEditorClassReducer';

import MultiSelectSort, { SelectProps } from './MultiSelectSort';

export default function MultiClassSelectSort({ setSelectedItems }) {
  const editorClassList = useSelector(
    (state: {
      getEditorClassReducer: {
        editorClassList: EditorClass[];
        editorClass: EditorClass;
        errorMessage: String | null;
      };
    }) => state.getEditorClassReducer.editorClassList
  );

  const classOptions: SelectProps[] =
    editorClassList &&
    editorClassList.map((editorClass) => {
      let returnObject: SelectProps = {
        value: editorClass._id,
        label: editorClass.classification,
      };

      if (editorClass.classification === 'uncategorized') {
        returnObject = { ...returnObject, isDisabled: true };
      }

      return returnObject;
    });

  return (
    <MultiSelectSort
      options={classOptions}
      setSelectedItems={setSelectedItems}
    />
  );
}
