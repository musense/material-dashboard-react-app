import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components
import GridItem from 'components/Grid/GridItem.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardAvatar from 'components/Card/CardAvatar.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';

// import avatar from "assets/img/faces/marc.jpg";
import avatar from 'assets/img/scaredseal.jpeg';
import { useSelector } from 'react-redux';

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
};

// const { REACT_APP_SERVER_URL } = process.env;

// TODO: not finished yet
function UserProfile(props) {
  const { classes } = props;

  const username = useSelector((state) => state.getUserReducer.username);
  const email = useSelector((state) => state.getUserReducer.email);
  console.log("🚀 ~ file: UserProfile.jsx:47 ~ UserProfile ~ username:", username)
  console.log("🚀 ~ file: UserProfile.jsx:49 ~ UserProfile ~ email:", email)

  const errors = {};
  // const [username, setUsername] = useState(null);
  // const [email, setEmail] = useState(null);
  // useEffect(() => {
  //   if (user_username && user_email) {
  //     setUsername(user_username)
  //     setEmail(user_email)
  //   }
  // }, [user_username, user_email]);

  const updateProfile = (e) => {
    e.preventDefault();
    const fields = ['username', 'email'];
    const formElements = e.target.elements;
    const formValues = fields
      .map((field) => ({
        [field]: formElements.namedItem(field).value,
      }))
      .reduce((current, next) => ({ ...current, ...next }));

  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <form onSubmit={updateProfile}>
            <Card>
              <CardHeader color='primary'>
                <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
                <p className={classes.cardCategoryWhite}>
                  Complete your profile
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText='Name'
                      id='username'
                      error={errors.name}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        required: true,
                        defaultValue: username,
                        name: 'username',
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText='Email address'
                      id='email-address'
                      error={errors.username}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        required: true,
                        defaultValue: email,
                        name: 'email',
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button type='submit' color='primary'>
                  Update Profile
                </Button>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  email: PropTypes.string,
};

export default withStyles(styles)(UserProfile);
