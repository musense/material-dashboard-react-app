import React, { MouseEventHandler, useEffect } from 'react';
import  {
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

import { SelectProps } from './../../data';

function arrayMove<T>(array: readonly T[], from: number, to: number) {
  const slicedArray = array.slice();
  slicedArray.splice( to < 0 ? array.length + to : to, 0, slicedArray.splice(from, 1)[0] );
  return slicedArray;
}

const SortableMultiValue = SortableElement(
  (props: MultiValueProps<SelectProps>) => {
    // this prevents the menu from being opened/closed when the user clicks
    // on a value to begin dragging it. ideally, detecting a click (instead of
    // a drag) would still focus the control and toggle the menu, but that
    // requires some magic with refs that are out of scope for this example
    const onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
    const innerProps = { ...props.innerProps, onMouseDown };
    return <components.MultiValue {...props} innerProps={innerProps} />;
  }
);

const SortableMultiValueLabel = SortableHandle(
  (props: MultiValueGenericProps) => <components.MultiValueLabel {...props} />
);

const SortableSelect = SortableContainer(Createable) as React.ComponentClass<
  Props<SelectProps, true> & SortableContainerProps
>;

export default function MultiSelectSortTest({ 
  options,
  selectedArrayRef
    })  {
      console.log("🚀 ~ file: MultiSelectSortTest.tsx:53 ~ selectedArrayRef:", selectedArrayRef)
    const [selected, setSelected] = React.useState<readonly SelectProps[]>();

    useEffect(() => {
      setSelected(selectedArrayRef.current)
    }, [selectedArrayRef.current]);

    const onChange = (
      selectedOptions: OnChangeValue<SelectProps, true>
      ) => {
      setSelected(selectedOptions)
      selectedArrayRef.current = selectedOptions
    };

    const onSortEnd: SortEndHandler = ({ oldIndex, newIndex }) => {
      const newValue = arrayMove(selected, oldIndex, newIndex);
      setSelected(newValue);
      selectedArrayRef.current = newValue
      // console.log('Values sorted:',newValue.map((i) => i.value));
    };
    const styles = {
      control: (base) => ({
        ...base,
        borderColor: 'black',
        boxShadow: 'none',
        '&:hover':{
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
    return(  <SortableSelect
        isMulti
        useDragHandle
        // react-sortable-hoc props:
        axis='xy'
        onSortEnd = { onSortEnd }
        distance={4}
        // small fix for https://github.com/clauderic/react-sortable-hoc/pull/352:
        getHelperDimensions={({ node }) => node.getBoundingClientRect()}
        // react-select props:
        options={options}
        value         = { selected }
        onChange      = { onChange }
        styles={styles}
        components={{
          // @ts-ignore We're failing to provide a required index prop to SortableElement
          MultiValue: SortableMultiValue,
          // @ts-ignore We're failing to provide a required index prop to SortableElement
          MultiValueLabel: SortableMultiValueLabel,
        }}
        closeMenuOnSelect={false}
      />)
}
