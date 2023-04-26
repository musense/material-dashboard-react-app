import React, { useEffect, useMemo, useState } from 'react';
import Select, { ActionMeta } from 'react-select';
import { SelectProps } from '../../data';

export default function SingleSelector({
  options: defaultOptions,
  setSelectedItem,
  selectedItem,
}) {
  console.log('🚀 ~ file: SingleSelector.tsx:10 ~ defaultOptions:', defaultOptions);

  const [options, setOptions] = useState(defaultOptions);

  const [selected, setSelected] = useState<SelectProps>();

  const optionsLabel = useMemo(() => {
    if (!defaultOptions || defaultOptions.length === 0) return;
    return defaultOptions[0].label;
  }, [defaultOptions]);

  useEffect(() => {
    setOptions(defaultOptions);
  }, [optionsLabel]);

  useEffect(() => {
    setSelected(selectedItem);
  }, [selectedItem]);

  const onChange = (
    newValue: SelectProps,
    actionMeta: ActionMeta<SelectProps>
  ) => {
    setSelected(newValue);
    setSelectedItem(newValue);
  };
  return (
    <Select
      options={options}
      isClearable={true}
      isSearchable={true}
      value={selected}
      onChange={onChange}
      styles={{
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        menu: (base) => ({
          ...base,
          zIndex: 99999,
          color: 'black',
        }),
      }}
    />
  );
}
