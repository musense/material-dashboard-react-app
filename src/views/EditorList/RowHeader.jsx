import React from "react";
import HeaderCell from '../../components/HeaderCell/HeaderCell'
import useSetMacOSCssReset from "hook/useMacOSCss";

export default function RowHeader({ headerConfig }) {
    const headerClass = useSetMacOSCssReset('view-header')
    return <div data-attr="data-header" className={headerClass}>
        <Header
            headerMap={headerConfig.headerRow}
            patchType={headerConfig.patchType}
            reducerName={headerConfig.reducerName}
        />
    </div>;
}

function Header({
    headerMap,
    patchType,
    reducerName
}) {
    return <div data-attr="data-header-row">
        {headerMap.map((cell, index) => {
            return cell.patchKey ? <HeaderCell
                key={index}
                className={cell.className}
                name={cell.name}
                patchKey={cell.patchKey}
                patchType={patchType}
                reducerName={reducerName}
            /> : <HeaderCell
                key={index}
                className={cell.className}
                name={cell.name}
                reducerName={reducerName}
            />
        })}
    </div>;
}