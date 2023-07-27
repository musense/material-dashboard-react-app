import React, { useCallback} from "react";
import SingleClassificationSelect from "../../../components/Select/SingleClassificationSelect";
import useSetDefaultRef from "../../../hook/useSetDefaultRef";

export default function Classification({ categories, onPropertyChange }) {
    const onClassificationChange = useCallback((value) => {
        onPropertyChange(value, "categories", null);
    }, [onPropertyChange])

    const {ref: classRef} = useSetDefaultRef(categories);
    
    return <section id="categories">
        <div>
            <label htmlFor='categories'>分類</label>
            <SingleClassificationSelect
                classRef={classRef}
                setState={onClassificationChange}
            />
        </div>
    </section>;


}
