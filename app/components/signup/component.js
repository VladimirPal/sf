import $ from 'jquery';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import LaddaButton from 'react-ladda';
import Mask from 'react-maskedinput';

import ValidateMixin from '../../lib/validate-mixin/mixin'
import routePaths from '../../routes';

import * as UserActions from '../../actions/user';


const PageComponent = React.createClass({
  mixins: [ValidateMixin],

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentWillMount() {
    $('body').addClass('gray-bg');
  },

  componentDidMount() {
    new google.maps.places.Autocomplete(document.getElementById('address'), {});
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.authenticated()) {
      this.context.router.replace(routePaths.index);
      $('body').removeClass('gray-bg');
    }
  },

  getInitialState() {
    return {
      loading: false,
      errors: {},
      fields: {
        email: {validators: [this.validators.required, this.validators.email({validateEvent: 'submit'})]},
        password: this.validators.required,
        venueName: this.validators.required,
        venueDescription: this.validators.required,
        firstName: this.validators.required,
        lastName: this.validators.required,
        address: this.validators.required
      }
    };
  },

  handleChange(event) {
    let validateObj = {};
    let fieldName = event.target.name;

    validateObj[fieldName] = this.state.fields[fieldName];
    let res = this.validate('change', validateObj);
    this.setState({errors: res.errors});
  },

  handleSubmit(event) {
    event.preventDefault();
    let res = this.validate();

    if (Object.keys(res.errors).length !== 0) {
      this.setState({errors: res.errors});
    } else {
      res.data.username = res.data.email

      this.setState({loading: true});
      this.props.signUp(res.data)
    }
  },

  render() {
    let errors = this.state.errors;
    let { user } = this.props;

    return (
      <div className="middle-box text-center loginscreen" onSubmit={this.handleSubmit}>
        <div>
          <form className="m-t" role="form">
            <div className={errors.email ? 'form-group has-error' : 'form-group'}>
              <label className="error">{errors.email}</label>
              <input className="form-control" name="email"
                onChange={this.handleChange}
                placeholder="Email"
                ref="email"
                type="text" />
            </div>

            <div className={errors.password ? 'form-group has-error' : 'form-group'}>
              <label className="error">{errors.password}</label>
              <input className="form-control" name="password"
                onChange={this.handleChange}
                placeholder="Password"
                ref="password"
                type="password" />
            </div>

            <div className={errors.firstName ? 'form-group has-error' : 'form-group'}>
              <label className="error">{errors.firstName}</label>
              <input className="form-control" name="firstName"
                onChange={this.handleChange}
                placeholder="First Name"
                ref="firstName"
                type="text" />
            </div>

            <div className={errors.lastName ? 'form-group has-error' : 'form-group'}>
              <label className="error">{errors.lastName}</label>
              <input className="form-control" name="lastName"
                onChange={this.handleChange}
                placeholder="Last Name"
                ref="lastName"
                type="text" />
            </div>

            <div className={errors.venueName ? 'form-group has-error' : 'form-group'}>
              <label className="error">{errors.venueName}</label>
              <input className="form-control" name="venueName"
                onChange={this.handleChange}
                placeholder="Venue name"
                ref="venueName"
                type="text" />
            </div>

            <div className={errors.venueDescription ? 'form-group has-error' : 'form-group'}>
              <label className="error">{errors.venueDescription}</label>
              <Mask className='form-control' mask='###-###-####'
                onChange={this.handleChange}
                pattern='^\d{3}-\d{3}-\d{4}$'
                placeholder='Phone number'
                ref='phoneNumber' type='tel'/>
            </div>

            <div className={errors.address ? 'form-group has-error' : 'form-group'}>
              <label className="error">{errors.address}</label>
              <input className="form-control" id="address" name="address"
                onChange={this.handleChange}
                placeholder="Address"
                ref="address"
                type="text" />
            </div>

            <LaddaButton buttonStyle="expand-right" className="btn btn-primary block full-width m-b"
              loading={this.state.loading}
              type="submit">
              Sign up
            </LaddaButton>
            <p className="text-muted text-center"><small>Already have an account?</small></p>
            <Link className="btn btn-sm btn-white btn-block" to={routePaths.login.path} >Sign in</Link>
          </form>
        </div>
      </div>
    );
  }
});


function mapStateToProps(state) {
  return {
    user: state.user
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(UserActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PageComponent);
