import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";

function CustomTableHead({ ...props }) {
  const { tableHead } = props;
  return (
    <TableHead>
      <TableRow>
        {tableHead.map((prop, key) => (
          <TableCell align="center" key={key}>{prop}</TableCell>
        ))}
        <TableCell />
      </TableRow>
    </TableHead>
  );
}

export default CustomTableHead;