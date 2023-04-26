import React, { MouseEventHandler } from 'react';
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

import { SelectProps } from '../../data';

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

export default function MultiSelectSort({ 
  options,
  setSelectedItems,
  selectedItems
    })  {
    console.log("🚀 ~ file: MultiSelectSort.tsx:54 ~ options:", options)
    const [selected, setSelected] = React.useState<readonly SelectProps[]>(selectedItems);

    const onChange = (
      selectedOptions: OnChangeValue<SelectProps, true>
      ) => {
      setSelected(selectedOptions)
      setSelectedItems(selectedOptions)
    };

    const onSortEnd: SortEndHandler = ({ oldIndex, newIndex }) => {
      const newValue = arrayMove(selected, oldIndex, newIndex);
      setSelected(newValue);
      setSelectedItems(newValue)
      // console.log('Values sorted:',newValue.map((i) => i.value));
    };

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
        styles={{
           menuPortal: base => ({ ...base, zIndex: 9999 }),
           menu: base => ({...base, zIndex: 99999 }),
        }}
        components={{
          // @ts-ignore We're failing to provide a required index prop to SortableElement
          MultiValue: SortableMultiValue,
          // @ts-ignore We're failing to provide a required index prop to SortableElement
          MultiValueLabel: SortableMultiValueLabel,
        }}
        closeMenuOnSelect={false}
      />)
}
