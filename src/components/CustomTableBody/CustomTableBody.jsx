import React, { useState, useRef, useEffect } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

function CustomTableBody({ ...props }) {
  const { showList, handleRowClick, selectedID } = props;
  // console.group("CustomTableBody props");
  // console.log(showList);
  // console.groupEnd("CustomTableBody props");
  // const rowRef = useRef();
  useEffect(() => {}, []);
  return (
    <TableBody>
      {Object.keys(showList).map((row) => {
        return (
          <TableRow
            key={row}
            onClick={handleRowClick}
            id={row}
            hover={true}
            selected={row == selectedID}
          >
            {Object.keys(showList[row]).map((key, index) => {
              if (key === "_id") return;
              // if (key === "id") rowRef.current = showList[row][key];
              return (
                <TableCell key={`${row}_${key}`}>
                  {[showList[row][key]]}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
}

export default CustomTableBody;
