import React, { useEffect, useMemo, useState } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

const SingleSelectorTest = ({
  creatable = false,
  parentSelected,
  parentSetSelected,
  options: defaultOptions,
  selectedRef
}) => {
  console.log("🚀 ~ file: SingleSelectorTest.jsx:12 ~ defaultOptions:", defaultOptions)

  const [options, setOptions] = useState(defaultOptions);

  // const [selected, setSelected] = useState(parentSelected);
  const [selected, setSelected] = useState();

  const optionsLabel = useMemo(() => {
    if (!defaultOptions || defaultOptions.length === 0) return;
    return defaultOptions[0].label;
  }, [defaultOptions]);

  useEffect(() => {
    setOptions(defaultOptions);
  }, [optionsLabel]);

  useEffect(() => {
    setSelected(selectedRef.current)
  }, [selectedRef.current]);

  const onChange = (newValue, actionMeta) => {
    setSelected(newValue);
    // parentSetSelected(newValue)
    selectedRef.current = newValue;
  };

  const styles = {
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    menu: (base) => ({
      ...base,
      zIndex: 99999,
      color: 'black',
      backgroundColor: 'white',
      border: '1px solid black'
    }),
  }

  const props = useMemo(() => {
    return {
      options: options,
      isClearable: true,
      isSearchable: true,
      value: selected,
      onChange: onChange,
      styles: { styles }
    }
  }, [options, selected, onChange, styles]);

  const CreatableSelectProps = (props) => {
    return <CreatableSelect
      {...props}
    />
  }
  const SelectProps = (props) => {
    return <Select
      {...props}
    />
  }

  return creatable
    ? CreatableSelectProps(props)
    : SelectProps(props);
};

export default SingleSelectorTest;
