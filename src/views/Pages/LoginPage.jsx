import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import MessageDialog from '../../components/Modal/MessageDialog';

import * as GetUserAction from 'actions/GetUserAction';
import useModalResult from 'hook/useModalResult';
import useRememberMe from 'hook/useRememberMe';

function LoginPage(props) {
  const { classes } = props;

  const loginFormRef = useRef(null);
  const [rememberMeChecked, setRememberMeChecked] = useState(false);
  const errors = {};
  const navigate = useNavigate()
  const dispatch = new useDispatch();
  const returnMessage = useSelector((state) => state.getUserReducer.errorMessage);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);

  const { rememberMeChecked: defaultRememberMeChecked } = useRememberMe(loginFormRef)
  const {
    title,
    content,
    success
  } = useModalResult({
    message: returnMessage
  })

  useEffect(() => {
    if (title) handleClickOpen()
  }, [title]);

  const login = (e) => {
    e.preventDefault();

    const fields = ['username', 'password'];
    const formElements = e.target.elements;
    if (rememberMeChecked) {
      localStorage.setItem('username', formElements.username.value);
    }
    const formValues = fields
      .map((field) => ({
        [field]: formElements.namedItem(field).value,
      }))
      .reduce((current, next) => ({ ...current, ...next }));

    dispatch({
      type: GetUserAction.LOGIN_USER,
      payload: {
        username: formValues.username,
        password: formValues.password,
      },
    });
  };

  const handleClose = () => {
    setOpen(false);
    dispatch({
      type: GetUserAction.REGISTER_USER_ERROR_RESET
    })
    if (success) {
      navigate('/admin/editorList', { replace: true })
    }
  };

  return (
    <div className={classes.container}>
      <GridContainer justify='center'>
        <GridItem xs={12} sm={6} md={4}>
          <form ref={loginFormRef} onSubmit={login}>
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
                  // onInputChange={onInputChange}
                  inputProps={{
                    type: 'password',
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
                      checked={defaultRememberMeChecked}
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
        dialogTitle={title}
        dialogContent={content}
        open={open}
        setClose={handleClose}
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
