import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import tasksStyle from 'assets/jss/material-dashboard-react/components/tasksStyle.jsx';
function CustomEditorTableBody({ ...props }) {
  const {
    showList,
    handleRowClick,
    selectedID,
    isRowLink,
  } = props;

  

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
            component={isRowLink ? Link : TableRow} // props.rowComponent
            to={`/admin/editorList/edit/${showList[row]['_id']}`}
          >
            {Object.keys(showList[row]).map((key, index) => {
              if (key === '_id') return;

              if (key === 'updatedAt') {
                return (
                  <TableCell align='center' key={`${row}_${key}`}>
                    {new Date([showList[row][key]]).toLocaleDateString() +
                      ' ' +
                      new Date([showList[row][key]]).toLocaleTimeString()}
                  </TableCell>
                );
              }
              return (
                <TableCell align='center' key={`${row}_${key}`}>
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

export default withStyles(tasksStyle)(CustomEditorTableBody);
