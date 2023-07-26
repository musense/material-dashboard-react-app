import React, { useCallback} from "react";
import SingleClassificationSelect from "../../../components/Select/SingleClassificationSelect";
import useSetDefaultRef from "../../../hook/useSetDefaultRef";

export default function Classification({ classifications, onPropertyChange }) {
    const onClassificationChange = useCallback((value) => {
        onPropertyChange(value, "classifications", null);
    }, [onPropertyChange])

    const {ref: classRef} = useSetDefaultRef(classifications);
    
    return <section id="classifications">
        <div>
            <label htmlFor='classifications'>分類</label>
            <SingleClassificationSelect
                classRef={classRef}
                setState={onClassificationChange}
            />
        </div>
    </section>;


}
