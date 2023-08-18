import React from "react";
import HeaderCell from '../../components/HeaderCell/HeaderCell'

export default function RowHeader({ headerConfig, selectedPatchKey }) {
    return <div data-attr="data-header" className='view-header'>
        <Header
            headerMap={headerConfig.headerRow}
            patchType={headerConfig.patchType}
            reducerName={headerConfig.reducerName}
            selectedPatchKey={selectedPatchKey}
        />
    </div>;
}

function Header({
    headerMap,
    patchType,
    reducerName,
    selectedPatchKey
}) {
    return <div data-attr="data-header-row">
        {headerMap.map((cell, index) => {
            return <HeaderCell
                key={index}
                className={cell.className}
                name={cell.name}
                patchKey={cell.patchKey}
                patchType={patchType}
                reducerName={reducerName}
                selectedPatchKey={selectedPatchKey}
            />
        })}
    </div>;
}