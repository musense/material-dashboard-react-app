import { useMemo } from "react";
import withCorrectVoidBehavior from "../utils/withCorrectVoidBehavior";
import { CustomEditor } from "../utils/CustomEditor";
import { withHistory } from "slate-history";
import { withReact } from "slate-react";
import { createEditor } from "slate";
import withTable from "../utils/withTable";

export default function useCreateSlateEditor() {

    const slateEditor = useMemo(() =>
        withTable(
            withCorrectVoidBehavior(
                CustomEditor.withInlines(
                    CustomEditor.withImages(
                        withHistory(
                            withReact(createEditor())
                        )
                    ))
            )
        ), [])

    return slateEditor
}
