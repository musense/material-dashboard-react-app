import React, { useId }  from "react";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

function CustomTableBody({ ...props }) {
  // const id = useId();
  const { showList, handleRowClick, selectedID } = props;
  return (
    <TableBody>
      {showList.map((show, row) => {
        console.log(`CustomTableBody show: ${show}`)
        return (
          <TableRow
            key={row}
            onClick={handleRowClick}
            id={row}
            hover={true}
            selected={row == selectedID}
          >
            {Object.keys(show).map((key, i) => {
              if (key === "_id") return;
              return <TableCell> {[show[key]]}</TableCell>;
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
}

export default CustomTableBody;
