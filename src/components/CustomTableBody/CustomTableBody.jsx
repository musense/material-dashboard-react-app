import React, { useState } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

function CustomTableBody({ ...props }) {
  // console.group("CustomTableBody props");
  // console.table(props);
  // console.groupEnd("CustomTableBody props ");
  return (
    <TableBody>
      {props.tagList.map((tag, rowIndex) => (
        <TableRow
          key={rowIndex}
          onClick={props.handleRowClick}
          id={rowIndex + "_Row"}
          hover={true}
          selected={tag.id == props.selectedID}
        >
          <TableCell key={`${rowIndex}_tagID`}>{tag.id}</TableCell>
          <TableCell key={`${rowIndex}_tagName`}>{tag.name}</TableCell>
          <TableCell key={`${rowIndex}_tagShowOnPage`}>
            {tag.showOnPage}
          </TableCell>
          <TableCell key={`${rowIndex}_tagTaggedNumber`}>
            {tag.taggedNumber}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default CustomTableBody;
