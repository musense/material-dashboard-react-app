import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function CustomTableBody({ ...props }) {
  const { showList, handleRowClick, selectedID } = props;
  // TODO: add isRowLink, rowComponent, rowToUrl props
  // const { showList, handleRowClick, selectedID, isRowLink, rowComponent, rowToUrl } = props;

  // console.group("CustomTableBody props");
  // console.log(showList);
  // console.groupEnd("CustomTableBody props");
  const [isRowLink, setIsRowLink] = useState(true);
  return (
    <TableBody>
      {Object.keys(showList).map((row) => {
        if (isRowLink) {
          return (
            <TableRow
              key={row}
              onClick={handleRowClick}
              id={row}
              hover={true}
              selected={row == selectedID}
              component={Link} // props.rowComponent
              to={`/admin/ieditor?id=${showList[row]["_id"]}`} // props.rowToUrl
            >
              {Object.keys(showList[row]).map((key, index) => {
                if (key === "_id") return;
                return (
                  <TableCell align="center" key={`${row}_${key}`}>
                    {[showList[row][key]]}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        } else {
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
                return (
                  <TableCell align="center" key={`${row}_${key}`}>
                    {[showList[row][key]]}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        }
      })}
    </TableBody>
  );
}

export default CustomTableBody;
