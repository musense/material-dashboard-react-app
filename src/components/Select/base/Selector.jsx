import useSetSelectorValue from 'hook/useSetSelectorValue';
import useSetSelectorOption from 'hook/useSetSelectorOption';
import useSelectorStyle from 'hook/useSelectorStyle';
import useSelectorProps from 'hook/useSelectorProps';
import useCreateSortableSelector from 'hook/useCreateSortableSelector';

const Selector = ({
  isMulti = false,
  creatable = false,
  options: defaultOptions,
  controlWidth = null,
  controlHeight = null,
  setState = null,
  defaultSelected = null
}) => {

  const options = useSetSelectorOption(defaultOptions)
  const {
    selected,
    setSelected,
    setTransform
  } = useSetSelectorValue(defaultSelected, isMulti)

  const styles = useSelectorStyle(controlWidth, controlHeight)
  const props = useSelectorProps({
    options,
    selected,
    setSelected,
    setTransform,
    setState,
    styles,
    isMulti
  })

  const {
    SortableCreatableSelectProps,
    SortableSelectProps,
    CreatableSelectProps,
    SelectProps,
  } = useCreateSortableSelector()

  return isMulti ? (
    creatable
      ? SortableCreatableSelectProps(props)
      : SortableSelectProps(props)
  ) : creatable
    ? CreatableSelectProps(props)
    : SelectProps(props)
}

export default Selector;
