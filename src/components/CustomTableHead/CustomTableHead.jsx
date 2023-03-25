import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";

function CustomTableHead({ ...props }) {
  const { tableHead } = props;
  return (
    <TableHead>
      <TableRow>
        {tableHead.map((head, key) => {
          if (head === '_id') return
          return <TableCell align="center" key={key}>{head}</TableCell>
        })}
        <TableCell />
      </TableRow>
    </TableHead>
  );
}

export default CustomTableHead;