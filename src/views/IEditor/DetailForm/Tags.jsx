import React, { useCallback } from "react";
import MultiTagSelectSort from '../../../components/Select/MultiTagSelectSort';
import useSetDefaultRef from "../../../hook/useSetDefaultRef";

export default function Tags({ tags, onPropertyChange }) {

    const onTagsChange = useCallback((value) => {
        onPropertyChange(value, "tags", null);
    }, [onPropertyChange])

    const { ref: tagArrayRef } = useSetDefaultRef(tags);

    return <section id="tags">
        <div>
            <label htmlFor='tags'>新增標籤</label>
            <MultiTagSelectSort
                creatable
                tagArrayRef={tagArrayRef}
                setState={onTagsChange}
            />
        </div>
    </section>;
}
