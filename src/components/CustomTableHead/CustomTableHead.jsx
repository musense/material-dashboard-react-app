import React, { useState } from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

function CustomTableHead({ ...props }) {
  const { tableHead } = props;
  return (
    <TableHead>
      <TableRow>
        {tableHead.map((prop, key) => (
          <TableCell key={key}>{prop}</TableCell>
        ))}
        <TableCell />
      </TableRow>
    </TableHead>
  );
}

export default CustomTableHead;