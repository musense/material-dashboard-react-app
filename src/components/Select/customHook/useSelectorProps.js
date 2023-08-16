import { useCallback, useMemo } from "react";
import { components } from 'react-select';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';

const SortableMultiValueLabel = SortableHandle(
    (props) => <components.MultiValueLabel {...props} />
);

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
function arrayMove(array, from, to) {
    const slicedArray = array.slice();
    slicedArray.splice(to < 0 ? array.length + to : to, 0, slicedArray.splice(from, 1)[0]);
    return slicedArray;
}

export default function useSelectorProps({
    options,
    selected,
    setSelected,
    transformBack,
    setTransform,
    setState,
    styles,
    isMulti
}) {

    const onChange = useCallback((newValue, actionMeta) => {
        setSelected(newValue);
        setState && setState(setTransform(newValue))
    }, [setSelected, setState, transformBack, setTransform])

    const onSortEnd = useCallback(({ oldIndex, newIndex }) => {
        const newValue = arrayMove(selected, oldIndex, newIndex);
        setSelected(newValue);
    }, [setSelected]);

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
    }, [options, selected, onChange, onSortEnd, styles, isMulti]);

    return props
}
