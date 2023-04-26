import React, { useEffect, useMemo, useState } from 'react';
// import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

const SingleSelectorTest = ({
  parentSelected,
  parentSetSelected,
  options: defaultOptions,
  selectedArrayRef
}) => {

  const [options, setOptions] = useState(defaultOptions);

  const [selected, setSelected] = useState(parentSelected);

  const optionsLabel = useMemo(() => {
    if (!defaultOptions || defaultOptions.length === 0) return;
    return defaultOptions[0].label;
  }, [defaultOptions]);

  useEffect(() => {
    setOptions(defaultOptions);
  }, [optionsLabel]);

  useEffect(() => {
    setSelected(parentSelected);
    selectedArrayRef.current = parentSelected
  }, [parentSelected]);

  const onChange = (newValue, actionMeta) => {
    setSelected(newValue);
    parentSetSelected(newValue)
    selectedArrayRef.current = newValue;
  };
  return (
    <CreatableSelect
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
};

export default SingleSelectorTest;
