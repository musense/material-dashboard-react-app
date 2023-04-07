import React from 'react';

import { useSelector } from 'react-redux';
import { Tag } from '../../reducers/GetTagsReducer';

import MultiSelectSort, { SelectProps } from './MultiSelectSort';

export default function MultiTagSelectSort({ setSelectedItems }) {
  const tagList = useSelector(
    (state: {
      getTagReducer: {
        tagList: Tag[];
        selectedTag: Tag | null;
        selectedIndex: number;
        errorMessage: string | null;
      };
    }) => state.getTagReducer.tagList
  );
  // console.log(
  //   '🚀 ~ file: MultiTagSelectSort.tsx:18 ~ MultiTagSelectSort ~ tagList:',
  //   tagList
  // );

  const tagOptions: SelectProps[] =
    tagList &&
    tagList.map((tag) => ({
      value: tag._id,
      label: tag.name,
    }));
  // console.log(
  //   '🚀 ~ file: MultiTagSelectSort.tsx:20 ~ MultiTagSelectSort ~ tagOptions:',
  //   tagOptions
  // );

  return (
    <MultiSelectSort options={tagOptions} setSelectedItems={setSelectedItems} />
  );
}
