import { SortableContainer } from 'react-sortable-hoc';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

export default function useCreateSortableSelector() {
    const SortableSelect = SortableContainer(Select)
    const SortableCreatable = SortableContainer(CreatableSelect)

    const SortableCreatableSelectProps = (props) => <SortableCreatable {...props} />
    const SortableSelectProps = (props) => <SortableSelect {...props} />
    const CreatableSelectProps = (props) => <CreatableSelect {...props} />
    const SelectProps = (props) => <Select {...props} />

    return {
        SortableCreatableSelectProps,
        SortableSelectProps,
        CreatableSelectProps,
        SelectProps,
    }
}
