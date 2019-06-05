import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import PasswordRecovery from './passwordRecovery';

import { appRootFolder, 
  serviceUri 
} from '../constants';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(345 + theme.spacing.unit * 3 * 2)]: {
      width: 345,
      height: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  card: {
    marginTop: theme.spacing.unit * 6,
    marginBottom: theme.spacing.unit * 6,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  cardContent: {
    width: '100%',
    marginTop: theme.spacing.unit,
    textAlign: 'center',
    position: 'relative',
    minHeight: '200px'
  },
  cardActions: {
    width: '100%'
  },
  submit: {
    // marginTop: theme.spacing.unit * 3,
    width: '100%'
  },
  mediaTop: {
    height: '190px',
  },
  mediaBottom: {
    height: 'auto',
    marginTop: '-90px'
  }
});

class Index extends React.Component {
  state = {
    loading: false,
    email: '',
    emailSended: false,
    error: false,
    errorMessage: ''
  };

  handleClick = async () => {

    const validatedMail = (/^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email))
    if(!validatedMail) return this.setState({ error: true, errorMessage: 'ingrese email valido' })

    this.setState({
      loading: true,
      emailSended: false
    });

    var url = serviceUri + '/api/index.php/Account_recovery/doRecovery';
    const doAccountRecovery = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ usermail: this.state.email }), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .catch(error => {
      console.error('Error:', error);
      this.setState({ loading: false, emailSended: false, error: true, errorMessage: 'intente nuevamente' })
      return { ok: false };
    })
    .then(response => { 
      console.log('Success:', response);
      this.setState({
        loading: false,
        emailSended: response.ok,
        error: !response.ok,
        errorMessage: !response.ok ? 'intente nuevamente' : ''
      });
      return response;
    });
    console.log("account ", doAccountRecovery);
  };

  handleEmailOnChange = e => {
    const validatedMail = (/^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.target.value))
    this.setState({ email: e.target.value, error: !validatedMail, errorMessage: validatedMail ? '' : 'ingrese email valido' });
  }

  render() {
    const { classes } = this.props;

    const ValidateContent = () => !this.state.emailSended ? <RecoveryPassword /> : <EmailSended />

    const RecoveryPassword = () => (
      <div>
        <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h5" color="primary">
              Ingresa tu correo para poder recuperar tu contraseña
            </Typography>
            <TextField
              type="email"
              id="email"
              margin="normal"
              variant="outlined"
              placeholder="Email"
              helperText={this.state.error ? this.state.errorMessage : ''}
              error={this.state.error}
              value={this.state.email}
              onChange={this.handleEmailOnChange}
              autoFocus
              required
              fullWidth
            />
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleClick}
              disabled={this.state.loading}
            >
              { this.state.loading ? 'Cargando...' : 'Enviar' }
            </Button>
        </CardActions>
      </div> 
    )
    
    const EmailSended = () => (
      <div>
      <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h6" color="primary">
            Por favor revisa tu casilla de correo
          </Typography>
          <Typography gutterBottom variant="subtitle1" color="primary">
            (incluso la casilla de 'No Deseados')
          </Typography>
        </CardContent>
    </div> 
    )

    return (
      <Router>
        <div>
          <main className={classes.main}>
                <Switch>
                  <Route exact path="/api/index.php/recovery_password">
                  <Card className={classes.card}>
                      <CardMedia
                        component="img"
                        alt="plantsss"
                        className={classes.mediaTop}
                        height="140"
                        image={appRootFolder + "/static/images/plantsss-logo.png"}
                        title="plantsss"
                      />
                        <ValidateContent />
                      <CardMedia
                        component="img"
                        alt="plantsss"
                        className={classes.mediaBottom}
                        height="140"
                        fill="true"
                        flex="true"
                        image={appRootFolder + "/static/images/plantsss-bottom-1.png"}
                        title="plantsss"
                        />
                      </Card>
                  </Route>
                  <Route exact path="/api/index.php/recovery_password/newpassword/:id_user/:code" render={ ({match}) => <PasswordRecovery match={match} />} />
                  <Route path="/" render={ () => <Redirect to ="/api/index.php/recovery_password" />}/>
                </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
