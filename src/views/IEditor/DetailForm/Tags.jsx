import React, { useCallback } from "react";
import MultiTagSelectSort from '../../../components/Select/MultiTagSelectSort';

export default function Tags({ tags, onPropertyChange }) {

    const onTagsChange = useCallback((value) => {
        onPropertyChange(value, "tags", null);
    }, [onPropertyChange])

    return <section id="tags">
        <div>
            <label htmlFor='tags'>新增標籤</label>
            <MultiTagSelectSort
                creatable
                defaultSelected={tags}
                setState={onTagsChange}
            />
        </div>
    </section>;
}
