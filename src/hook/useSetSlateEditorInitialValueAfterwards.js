import { useEffect } from "react";
import { Transforms } from 'slate'

export default function useSetSlateEditorInitialValueAfterwards(slateEditor, initialValue) {


    useEffect(() => {
        if (!initialValue) return
        if (initialValue.length <= 0) return
        setValue(initialValue)
        const totalNodes = slateEditor.children.length;
        const savedDefaultNodes = initialValue;
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

    }, [slateEditor, initialValue]);

}
