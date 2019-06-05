import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { 
  appRootFolder, 
  // serviceUri 
} from '../constants';

const styles = theme => ({
  card: {
    marginTop: theme.spacing.unit * 6,
    marginBottom: theme.spacing.unit * 6,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardContent: {
    width: '100%',
    marginTop: theme.spacing.unit,
    textAlign: 'center',
    position: 'relative'
  },
  cardActions: {
    width: '100%'
  },
  submit: {
    width: '100%'
  },
  mediaTop: {
    height: '190px',
  },
  mediaBottom: {
    height: 'auto',
    marginTop: '-54px'
  },
  plantsssWebsiteLink: {
    position: 'relative',
    textDecoration: 'none'
  },
  contentText: {
    marginTop: theme.spacing.unit * 6,
    marginBottom: theme.spacing.unit * 6,
  }
});

class PasswordRecoveryForm extends React.Component{
  state = {
    password: '',
    passwordConfirm: '',
    loading: false,
    passwordChanged: false,
    formIsValid: false,
    errorPassword: false,
    errorPasswordConfirm: false,
    errorPasswordMatch: false,
    errorMessage: ''
  }

  passwordIsValid = (p1, p2) => {
    let errorMessage = '';
    const isMatch = p1 === p2;
    const isInvalid = p1.length < 4 || p2.length < 4;
    if (!isMatch) errorMessage = "contraseñas no coinciden";
    if (isInvalid) errorMessage = "contraseñas deben ser mayor a 3 digitos";
    this.setState({ 
      errorPasswordMatch: !isMatch,
      errorMessage
    });

    this.setState({ 
      errorPassword: isInvalid,
      errorPasswordConfirm: isInvalid,
      errorMessage
    });

    this.setState({
      formIsValid: isMatch && !isInvalid
    })
  }

  handleClick = (props) => {
    const isInvalid = this.state.password.length < 4 || this.state.passwordConfirm.length < 4;
    const isMatch = this.state.password === this.state.passwordConfirm;
    if (isMatch && !isInvalid) props.passwordConfirmed(props.match.params.id_user, props.match.params.code, this.state.password);
  }

  handlePasswordOnChange = e => {
    this.setState({ password: e.target.value });
    this.passwordIsValid(e.target.value, this.state.passwordConfirm);
  };

  handlePasswordConfirmOnChange = e => {
    this.setState({ passwordConfirm: e.target.value });
    this.passwordIsValid(e.target.value, this.state.password);
  };

  render(){
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardMedia
          component="img"
          alt="plantsss"
          className={classes.mediaTop}
          height="140"
          image={appRootFolder + "/static/images/plantsss-logo.png"}
          title="plantsss"
        />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h5" color="primary">
                  Volver a establecer contraseña
                </Typography>
                <TextField
                  type="password"
                  id="password"
                  margin="normal"
                  variant="outlined"
                  placeholder="Ingrese Contraseña"
                  helperText={ this.state.errorPassword || this.state.errorPasswordMatch ? this.state.errorMessage : ''}
                  error={this.state.errorPassword || this.state.errorPasswordMatch}
                  value={this.state.password}
                  onChange={this.handlePasswordOnChange}
                  required
                  fullWidth
                />
                <TextField
                  type="password"
                  id="passwordConfirm"
                  margin="normal"
                  variant="outlined"
                  placeholder="Confirmar Contraseña"
                  helperText={this.state.errorPasswordConfirm || this.state.errorPasswordMatch ? this.state.errorMessage : ''}
                  error={this.state.errorPasswordConfirm || this.state.errorPasswordMatch}
                  value={this.state.passwordConfirm}
                  onChange={this.handlePasswordConfirmOnChange}
                  required
                  fullWidth
                />
              </CardContent>
              <CardActions className={classes.cardActions}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => this.handleClick(this.props)}
                  disabled={this.props.loading || !this.state.formIsValid}
                >
                  { this.state.loading ? 'Cargando...' : 'Actualizar' }
                </Button>
            </CardActions>
        <CardMedia
          component="img"
          alt="plantsss"
          className={classes.mediaBottom}
          height="140"
          fill="true"
          flex="true"
          image={appRootFolder + "/static/images/plantsss-bottom-3.png"}
          title="plantsss"
          />
        </Card>
    );
  }
}

PasswordRecoveryForm.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object
};



class PasswordRecovery extends React.Component{
  state = {
    passwordConfirmed: '',
    loading: false,
  }

  passwordConfirmed = async (id_user, code, password) => {
    this.setState({
      loading: true,
      passwordChanged: false
    });

    // var url = serviceUri + '/api/index.php/Account_recovery/doNew';
    // const doPasswordReset = await fetch(url, {
    //   method: 'POST',
    //   body: JSON.stringify({ password, code, id_user }), // data can be `string` or {object}!
    //   headers:{
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then(res => res.json())
    // .catch(error => {
    //   console.error('Error:', error);
    //   this.setState({ 
    //     loading: false, 
    //     errorPassword: true, 
    //     errorPasswordConfirm: true,
    //     errorMessage: 'intente nuevamente' 
    //   })
    //   return { ok: false };
    // })
    // .then(response => { 
    //   console.log('final:', response);
    //   this.setState({
    //     loading: false,
    //     errorPassword: !response.ok,
    //     errorPasswordConfirm: !response.ok,
    //     errorMessage: !response.ok ? 'intente nuevamente' : ''
    //   });
    //   return response;
    // });
    
    //console.log("doPasswordReset", doPasswordReset)

        this.setState({
        loading: false,
        errorPassword: false,
        errorPasswordConfirm: false,
        errorMessage: '',
        passwordChanged: true
      });

    
  };

  render(){
    const { classes } = this.props;

    const ValidateContent = () => !this.state.passwordConfirmed ? 
    <PasswordRecoveryForm 
        {...this.props} 
        {...this.state} 
        passwordConfirmed={this.passwordConfirmed} /> : <PasswordChanged />

    const PasswordChanged = () => (
      <div>
        <Card className={classes.card}>
          <CardMedia
            component="img"
            alt="plantsss"
            className={classes.mediaTop}
            height="140"
            image={appRootFolder + "/static/images/plantsss-logo.png"}
            title="plantsss"
          />
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5"  color="primary" className={classes.contentText}>
                  ¡Cambio de correo realizado con éxito!
                </Typography>
                <Typography gutterBottom variant="body1"  color="primary" className={classes.contentText}>
                  Continua conociendo todo sobre tus plantas favoritas
                </Typography>
                <a href="www.plantsss.com" className={classes.plantsssWebsiteLink}>
                  <Typography variant="h5" ccolor="primary" className={classes.contentText}>
                    ir a Plantsss
                  </Typography>
                </a>
            </CardContent>
          <CardMedia
          component="img"
          alt="plantsss"
          className={classes.mediaBottom}
          height="140"
          fill="true"
          flex="true"
          image={appRootFolder + "/static/images/plantsss-bottom-3.png"}
          title="plantsss"
          />
      </Card>
    </div> 
    );

    return (
          <ValidateContent />
    );
  }
}

PasswordRecovery.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object,
};


export default withStyles(styles)(PasswordRecovery);
