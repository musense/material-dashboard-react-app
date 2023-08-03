import React, { useCallback } from "react";
import SingleClassificationSelect from "../../../components/Select/SingleClassificationSelect";

export default function Classification({ categories, onPropertyChange }) {
    console.log("🚀 ~ file: Classification.jsx:5 ~ Classification ~ categories:", categories)
    const onClassificationChange = useCallback((value) => {
        onPropertyChange(value, "categories", null);
    }, [onPropertyChange])

    return <section id="categories">
        <div>
            <label htmlFor='categories'>分類</label>
            <SingleClassificationSelect
                defaultSelected={categories}
                setState={onClassificationChange}
            />
        </div>
    </section>;


}
