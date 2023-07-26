import { useMemo } from "react";
import withCorrectVoidBehavior from "../components/SlateEditor/withCorrectVoidBehavior";
import { CustomEditor } from "../components/SlateEditor/CustomEditor";
import { withHistory } from "slate-history";
import { withReact } from "slate-react";
import { createEditor } from "slate";

export default function useCreateSlateEditor() {

    const slateEditor = useMemo(() =>
        withCorrectVoidBehavior(
            CustomEditor.withInlines(
                CustomEditor.withImages(
                    withHistory(
                        withReact(createEditor())
                    )
                ))
        ), [])

    return slateEditor
}
