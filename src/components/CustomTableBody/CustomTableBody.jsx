import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CustomInput from '../CustomInput/CustomInput';
import styles from './../../assets/css/customTableBody.module.css';

function CustomTableBody({ ...props }) {
  // const id = useId();
  const { showList, handleRowClick, selectedID } = props;
  return (
    <TableBody>
      {showList.map((show, row) => {
        return (
          <TableRow
            key={row}
            onClick={handleRowClick}
            id={row}
            hover={true}
            selected={row == selectedID}
          >
            {Object.keys(show).map((key, i) => {
              if (key === '_id') return;
              if (show[key] === null) {
                return (
                  <td className={styles['custom-td']} key={i}>
                    <CustomInput
                      key={i}
                      labelText={key}
                      id={key}
                      // error={errors.name}
                      formControlProps={{
                        fullWidth: false,
                      }}
                      inputProps={{
                        required: true,
                        name: key,
                      }}
                    />
                  </td>
                );
              }
              return (
                <TableCell key={i} align='center'>
                  {show[key]}
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
