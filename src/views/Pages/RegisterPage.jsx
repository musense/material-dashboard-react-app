import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
// import axios from "axios";

// @material-ui/core components
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import withStyles from '@material-ui/core/styles/withStyles';

// @material-ui/icons
import Check from '@material-ui/icons/Check';
import Email from '@material-ui/icons/Email';
import Face from '@material-ui/icons/Face';

// core components
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';

import registerPageStyle from 'assets/jss/material-dashboard-react/views/registerPageStyle.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { REGISTER_USER, REGISTER_USER_ERROR_RESET } from './../../actions/GetUserAction';
import { useNavigate } from 'react-router-dom';
import MessageDialog from './MessageDialog';



function RegisterPage(props) {
  const { classes } = props;

  const [registerSuccess, setRegisterSuccess] = useState(false);
  const errors = {};
  const navigate = useNavigate()
  const dispatch = new useDispatch();
  const returnMessage = useSelector((state) => state.getUserReducer.errorMessage);

  useEffect(() => {
    let title,
      content;
    console.log("🚀 ~ file: RegisterPage.jsx:44 ~ useEffect ~ returnMessage:", returnMessage)

    switch (returnMessage) {
      case "user validation failed: email: email not valid!":
      case "email has been used":
      case "username has been used":
      case "ERR_NETWORK": {
        title = "註冊失敗";
        content = "請重新檢查填入資訊";
        break;
      }
      case "ERR_NETWORK": {
        title = "註冊失敗";
        content = "連線錯誤！";
        break;
      }
      case "register successfully": {
        title = "註冊成功";
        content = "註冊成功！";
        setRegisterSuccess(true);
        break;
      }
    }
    if (content) {
      handleClickOpen()
      setDialogTitle(title)
      setDialogContent(content)
    }
  }, [returnMessage]);

  const register = (e) => {
    e.preventDefault();

    const fields = ['email', 'username', 'password'];
    const formElements = e.target.elements;

    const formValues = fields
      .map((field) => ({
        [field]: formElements.namedItem(field).value,
      }))
      .reduce((current, next) => ({ ...current, ...next }));

    console.group(`register!!!`);
    console.table(formValues);
    console.groupEnd(`register!!!`);
    dispatch({
      type: REGISTER_USER,
      payload: {
        username: formValues.username,
        email: formValues.email,
        password: formValues.password,
      },
    });
  };

  const [open, setOpen] = React.useState(false);
  const [dialogContent, setDialogContent] = useState(null);
  const [dialogTitle, setDialogTitle] = useState(null);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch({
      type: REGISTER_USER_ERROR_RESET
    })
    if (registerSuccess) {
      navigate('/auth/login-page')
    }
  };

  return (
    <div className={classes.container}>
      <GridContainer justify='center'>
        <GridItem xs={12} sm={6} md={4}>
          <form onSubmit={register}>
            <Card className={classes.cardAnimaton}>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color='primary'
              >
                <h4 className={classes.cardTitle}>註冊</h4>
              </CardHeader>
              <CardBody>
                <CustomInput
                  labelText='Name...'
                  id='name'
                  formControlProps={{
                    fullWidth: true,
                    className: classes.formControlClassName,
                  }}
                  inputProps={{
                    required: true,
                    type: 'text',
                    name: 'username',
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Face className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    ),
                  }}
                />
                <CustomInput
                  labelText='Email...'
                  id='email'
                  formControlProps={{
                    fullWidth: true,
                    className: classes.formControlClassName,
                  }}
                  error={errors.username}
                  inputProps={{
                    required: true,
                    type: 'email',
                    name: 'email',
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Email className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    ),
                  }}
                />
                <CustomInput
                  labelText='Password...'
                  id='password'
                  formControlProps={{
                    fullWidth: true,
                    className: classes.formControlClassName,
                  }}
                  error={errors.password}
                  inputProps={{
                    required: true,
                    name: 'password',
                    type: 'password',
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Icon className={classes.inputAdornmentIcon}>
                          lock_outline
                        </Icon>
                      </InputAdornment>
                    ),
                  }}
                />
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                <Button type='submit' color='primary' simple size='lg' block>
                  註冊
                </Button>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>


      <MessageDialog
        open={open}
        setClose={handleClose}
        dialogTitle={dialogTitle}
        dialogContent={dialogContent}
      />

    </div>
  );
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object,
};

export default withStyles(registerPageStyle)(RegisterPage);
// export default RegisterPage;
