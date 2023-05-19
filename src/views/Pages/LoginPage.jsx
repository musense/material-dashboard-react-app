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

// core components
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';

import loginPageStyle from 'assets/jss/material-dashboard-react/views/loginPageStyle.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_USER, REGISTER_USER_ERROR_RESET } from './../../actions/GetUserAction';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MessageDialog from './MessageDialog';

import * as GetClassAction from "actions/GetClassAction.js";
import * as GetTagsAction from "actions/GetTagsAction.js";

import Cookie from "js-cookie";

function LoginPage(props) {
  const { classes } = props;

  const loginFormRef = useRef(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [rememberMeChecked, setRememberMeChecked] = useState(false);
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const errors = {};
  const navigate = useNavigate()
  const dispatch = new useDispatch();
  const returnMessage = useSelector((state) => state.getUserReducer.errorMessage);
  useEffect(() => {
    if (loginFormRef.current === null) {
      return

    } else {
      const loginForm = loginFormRef.current;
      if (localStorage.getItem('username')) {
        loginForm.username.focus()
        loginForm.username.value = localStorage.getItem('username') || '';
        setRememberMeChecked(true);
      }
    }
    let title,
      content;
    console.log("🚀 ~ file: LoginPage.jsx:75 ~ LoginPage ~ returnMessage:", returnMessage)

    switch (returnMessage) {
      case "login failed": {
        title = '登入失敗'
        content = '帳號或密碼輸入錯誤'
        break
      }
      case "ERR_NETWORK": {
        title = '登入失敗'
        content = "連線錯誤！"
        break
      }
      case "login successfully": {
        title = "登入成功";
        content = "登入成功！"
        setLoginSuccess(true)
        break
      }
    }
    if (content) {
      handleClickOpen()
      setDialogTitle(title)
      setDialogContent(content)
    }

  }, [loginFormRef, returnMessage]);

  const login = (e) => {
    e.preventDefault();

    const fields = ['username', 'password'];
    const formElements = e.target.elements;
    console.log("🚀 ~ file: LoginPage.jsx:57 ~ login ~ checked:", rememberMeChecked)
    if (rememberMeChecked) {
      console.log("🚀 ~ file: LoginPage.jsx:58 ~ login ~ formElements.username.value:", formElements.username.value)
      localStorage.setItem('username', formElements.username.value);
    }
    const formValues = fields
      .map((field) => ({
        [field]: formElements.namedItem(field).value,
      }))
      .reduce((current, next) => ({ ...current, ...next }));

    dispatch({
      type: LOGIN_USER,
      payload: {
        username: formValues.username,
        // username,
        password: formValues.password,
      },
    });
  };
  const onInputChange = (e) => {
    setPassword(e.target.value);
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
    if (loginSuccess) {
      const sid = Cookie.get('sid')
      console.log("🚀 ~ file: LoginPage.jsx:135 ~ handleClose ~ sid:", sid)
      dispatch({ type: GetClassAction.REQUEST_CLASS_LIST });
      dispatch({ type: GetTagsAction.REQUEST_TAG })
      navigate('/admin/editorList', { replace: true })
    }
  };
  return (
    <div className={classes.container}>
      {/* <GridContainer justify="center">
        <GridItem xs={12} sm={8}>
          <h4 className={classes.textCenter} style={{ marginTop: 0 }}>
            Log in to see how you can speed up your web development with out of
            the box CRUD for #User Management and more.{" "}
          </h4>
        </GridItem>
      </GridContainer> */}
      <GridContainer justify='center'>
        <GridItem xs={12} sm={6} md={4}>
          <form ref={loginFormRef} onSubmit={login}>
            {/* <Card className={classes[this.state.cardAnimaton]}> */}
            <Card className={classes.cardAnimaton}>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color='primary'
              >
                <h4 className={classes.cardTitle}>登入</h4>
              </CardHeader>
              <CardBody>
                <CustomInput
                  labelText='Email...'
                  id='email'
                  error={errors.username || errors.invalidEmailOrPassword}
                  formControlProps={{
                    fullWidth: true,
                    className: classes.formControlClassName,
                  }}
                  inputProps={{
                    required: true,
                    name: 'username',
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Email className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    ),
                  }}
                />
                <CustomInput
                  labelText='Password'
                  id='password'
                  error={errors.password || errors.invalidEmailOrPassword}
                  formControlProps={{
                    fullWidth: true,
                    className: classes.formControlClassName,
                  }}
                  onInputChange={onInputChange}
                  inputProps={{
                    type: showPassword ? null : 'password',
                    required: true,
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Icon className={classes.inputAdornmentIcon}>
                          lock_outline
                        </Icon>
                      </InputAdornment>
                    ),
                  }}
                />
                <FormControlLabel
                  classes={{
                    root:
                      classes.checkboxLabelControl +
                      ' ' +
                      classes.checkboxLabelControlClassName,
                    label: classes.checkboxLabel,
                  }}
                  control={
                    <Checkbox
                      tabIndex={-1}
                      checked={rememberMeChecked}
                      onChange={(e) => setRememberMeChecked(e.target.checked)}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked,
                        root: classes.checkRoot,
                      }}
                    />
                  }
                  label={<span>記住我</span>}
                />
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                <Button type='submit' color='primary' simple size='lg' block>
                  登入
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

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object,
  errors: PropTypes.object,
};

export default withStyles(loginPageStyle)(LoginPage);
