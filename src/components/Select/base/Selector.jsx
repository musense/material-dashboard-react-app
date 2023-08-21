import useSetSelectorValue from '../customHook/useSetSelectorValue';
import useSetSelectorOption from '../customHook/useSetSelectorOption';
import useSelectorStyle from '../customHook/useSelectorStyle';
import useSelectorProps from '../customHook/useSelectorProps';
import useSelectorCreatableProps from '../customHook/useSelectorCreatableProps';
import useCreateSortableSelector from '../customHook/useCreateSortableSelector';

const Selector = ({
  isMulti = false,
  creatable = false,
  options: defaultOptions,
  controlWidth = null,
  controlHeight = null,
  setState = null,
  defaultSelected = null,
  name = ''
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
  const creatableProps = useSelectorCreatableProps({
    name,
  })

  const {
    SortableCreatableSelectProps,
    SortableSelectProps,
    CreatableSelectProps,
    SelectProps,
  } = useCreateSortableSelector()

  return isMulti ? (
    creatable
      ? SortableCreatableSelectProps({ ...props, ...creatableProps })
      : SortableSelectProps(props)
  ) : creatable
    ? CreatableSelectProps({ ...props, ...creatableProps })
    : SelectProps(props)
}

export default Selector;
