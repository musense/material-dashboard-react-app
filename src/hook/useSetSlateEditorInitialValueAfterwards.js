import { useEffect, useState } from "react";
import { Transforms } from 'slate'

export default function useSetSlateEditorInitialValueAfterwards(slateEditor, value) {



    // const [selected, setSelected] = useState(initialValue);
    useEffect(() => {
        if (!value) return
        if (value.length <= 0) return
        // setSelected(value)

        const totalNodes = slateEditor.children.length;
        const savedDefaultNodes = value;
        if (totalNodes > 1) return

        for (let i = 0; i < totalNodes - 1; i++) {
            Transforms.removeNodes(slateEditor, {
                at: [totalNodes - i - 1],
            });
        }

        for (const value of savedDefaultNodes) {
            Transforms.insertNodes(slateEditor, value, {
                at: [slateEditor.children.length]
            })
        }

        Transforms.removeNodes(slateEditor, {
            at: [0],
        });

    }, [slateEditor, value]);    

    // return { selected, setSelected }
}
