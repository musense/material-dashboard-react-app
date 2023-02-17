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
import { REGISTER_USER } from './../../actions/GetUserAction';
import { useNavigate } from 'react-router-dom';

function RegisterPage(props) {
  const { classes } = props;
  const [checked, setChecked] = useState([]);
  const errors = {};
  const navigate = useNavigate()
  const dispatch = new useDispatch();
  const returnMessage =
    '' + useSelector((state) => state.getUserReducer.errorMessage);

  useEffect(() => {

    if (returnMessage.indexOf('upper case') > -1)
      console.log(`useEffect register 密碼最少需一碼為大寫字母!`);
    if (returnMessage.indexOf('lower case') > -1)
      console.log(`useEffect register 密碼最少需一碼為小寫字母!`);
    if (returnMessage.indexOf('at least 8 characters') > -1)
      console.log(`useEffect register 密碼最少為8碼!`);
    if (returnMessage.indexOf('email_1 dup') > -1)
      console.log(`useEffect register 此信箱已註冊過!`);
    if (returnMessage.indexOf('username_1 dup') > -1)
      console.log(`useEffect register 此名稱已註冊過!`);
    if (returnMessage.indexOf('register successfully') > -1) {
      navigate('/auth/login-page')
    }
  }, [returnMessage, checked]);

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

  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
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
                <h4 className={classes.cardTitle}>Register</h4>
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
                      onClick={() => handleToggle(1)}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      required
                      classes={{
                        checked: classes.checked,
                        root: classes.checkRoot,
                      }}
                    />
                  }
                  label={
                    <span>
                      I agree with the <a href='#pablo'>Privacy Policy</a>.
                    </span>
                  }
                />
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                <Button type='submit' color='primary' simple size='lg' block>
                  Let's Go
                </Button>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object,
};

export default withStyles(registerPageStyle)(RegisterPage);
// export default RegisterPage;
