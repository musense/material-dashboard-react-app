import React, { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import {
  components,
  MultiValueGenericProps,
  MultiValueProps,
  OnChangeValue,
  Props
} from 'react-select';
import {
  SortableContainer,
  SortableContainerProps,
  SortableElement,
  SortableHandle,
  SortEndHandler,
} from 'react-sortable-hoc';
import Createable from 'react-select/creatable';

function arrayMove(array, from, to) {
  console.log("🚀 ~ file: Selector.jsx:21 ~ arrayMove ~ array:", array)
  const slicedArray = array.slice();
  slicedArray.splice(to < 0 ? array.length + to : to, 0, slicedArray.splice(from, 1)[0]);
  return slicedArray;
}
const SortableMultiValue = SortableElement(
  (props) => {
    const onMouseDown = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
    const innerProps = { ...props.innerProps, onMouseDown };
    return <components.MultiValue {...props} innerProps={innerProps} />;
  }
);

const SortableMultiValueLabel = SortableHandle(
  (props) => <components.MultiValueLabel {...props} />
);

// const SortableSelect = SortableContainer(Createable);
const SortableSelect = SortableContainer(Select)
const SortableCreatable = SortableContainer(Createable)

const Selector = ({
  isMulti = false,
  creatable = false,
  parentSelected,
  parentSetSelected,
  options: defaultOptions,
  selectedRef,
  controlWidth = null,
  controlHeight = null,
  setState = null
}) => {
  console.log("🚀 ~ file: Selector.jsx:14 ~ creatable:", creatable)
  console.log("🚀 ~ file: Selector.jsx:14 ~ isMulti:", isMulti)
  console.log("🚀 ~ file: Selector.jsx:14 ~ selectedRef:", selectedRef)
  console.log("🚀 ~ file: SingleSelectorTest.jsx:14 ~ defaultOptions:", defaultOptions)

  const [options, setOptions] = useState();
  // const [selected, setSelected] = useState(parentSelected);
  const [selected, setSelected] = useState();

  const optionsLabel = useMemo(() => {
    if (!defaultOptions || defaultOptions.length === 0) return;
    return defaultOptions[0].label;
  }, [defaultOptions]);

  // menu items
  useEffect(() => {
    setOptions(defaultOptions);
  }, [optionsLabel]);

  // default selected
  useEffect(() => {
    console.log("🚀 ~ file: Selector.jsx:33 ~ useEffect ~ selectedRef:", selectedRef)
    if (selectedRef) {
      setSelected(selectedRef.current)
    }
  }, [selectedRef.current]);

  const onChange = useCallback((newValue, actionMeta) => {
    setSelected(newValue);
    // parentSetSelected(newValue)
    selectedRef.current = newValue;
    setState && setState(newValue)
  }, [setState])

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newValue = arrayMove(selected, oldIndex, newIndex);
    setSelected(newValue);
    selectedRef.current = newValue
  };

  const styles = useMemo(() => {
    return {
      control: (base) => ({
        ...base,
        borderColor: 'black',
        boxShadow: 'none',
        width: controlWidth,
        '&:hover': {
          borderColor: 'black',
        }
      }),
      valueContainer: (base) => ({
        ...base,
        paddingTop: 'unset',
        paddingBottom: 'unset',
      }),
      input: (base) => ({
        ...base,
        paddingTop: 'unset',
        paddingBottom: 'unset',
        marginTop: 'unset',
        marginBottom: 'unset',
        height: controlHeight
      }),
      menuPortal: (base) => ({
        ...base,
        borderColor: 'black',
        border: '1px solid black',
        zIndex: 9999,
      }),
      menu: (base) => ({
        ...base,
        zIndex: 99999,
        color: 'black',
        backgroundColor: 'white',
        border: '1px solid black'
      }),
    }
  }, [controlWidth, controlHeight])

  const props = useMemo(() => {
    const returnProps = (isMulti) => {
      return isMulti ? {
        isMulti: true,
        useDragHandle: true,
        // react-sortable-hoc props:
        axis: 'xy',
        onSortEnd: onSortEnd,
        distance: 4,
        // small fix for https://github.com/clauderic/react-sortable-hoc/pull/352:
        getHelperDimensions: ({ node }) => node.getBoundingClientRect(),
        // react-select props:
        options: options,
        value: selected,
        onChange: onChange,
        styles: styles,
        components: {
          // @ts-ignore We're failing to provide a required index prop to SortableElement
          MultiValue: SortableMultiValue,
          // @ts-ignore We're failing to provide a required index prop to SortableElement
          MultiValueLabel: SortableMultiValueLabel,
        },
        closeMenuOnSelect: false,
      } : {
        options: options,
        isClearable: true,
        isSearchable: true,
        value: selected,
        onChange: onChange,
        styles: styles,
      }
    }
    return returnProps(isMulti)
  }, [options, selected, onChange, styles, isMulti]);

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

  const SortableSelectProps = (props) => {
    return <SortableSelect
      {...props}
    />
  }

  const SortableCreatableSelectProps = (props) => {
    return <SortableCreatable
      {...props}
    />
  }
  return isMulti ? (
    creatable
      ? SortableCreatableSelectProps(props)
      : SortableSelectProps(props)
  ) : creatable
    ? CreatableSelectProps(props)
    : SelectProps(props)
    ;
};

export default Selector;
