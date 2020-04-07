import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerDesigner } from "../../actions/authActions";
import classnames from "classnames";
import Select , {components} from 'react-select'

class CreateDesigner extends Component {
  constructor(props) {
    super(props);
    let userId = props.auth.user.id
    this.state = {
      id: userId,
      timeDevoted: 0,
      type: "",
      education: "",
      errors: {}
    };
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

handleSelectChange = e => {
    this.setState({type: e.value })
}

onSubmit = e => {
    e.preventDefault();
const newUser = {
      timeDevoted: this.state.timeDevoted,
      type: this.state.type,
      education: this.state.education
    };
this.props.registerDesigner(newUser, this.props.history); 
  };
render() {
    const { errors } = this.state;
    const options = [
      {value: "Furtinure Designer", label: "Furniture Designer"},
      {value: "Architect", label: "Architect"},
      {value: "Other", label: "Other"}
    ]
    const customStyles = {
      option: (provided, state) => ({
        ...provided,
        borderBottom: '2px dotted blue',
        color: state.type ? 'yellow': 'black',
        backgroundColor: state.type? 'blue':'white'
      }),
      control: (provided) => ({
        ...provided,
        marginTop: "5%"
      })
    }
return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Let us know you Better</b>
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.timeDevoted}
                  error={errors.timeDevoted}
                  id="timeDevoted"
                  type="number"
                  className={classnames("", {
                    invalid: errors.timeDevoted
                  })}
                />
                <label htmlFor="timeDevoted">How many time you can give to Naya Projects?</label>
                <span className="red-text">{errors.timeDevoted}</span>
              </div>

              <div className="input-field col s12">
                <Select 
                    id="type"
                    isMulti= {false}
                    name="type"
                    placeholder="Which type of Designer are you?"
                    options={options}
                    styles={customStyles}
                    onChange = {this.handleSelectChange}
                />
                <span className="red-text">{errors.type}</span>
              </div>

              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.education}
                  error={errors.education}
                  id="education"
                  type="text"
                  className={classnames("", {
                    invalid: errors.education
                  })}
                />
                <label htmlFor="education">Tell us about your educational training</label>
                <span className="red-text">{errors.education}</span>
              </div>

              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "250px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Make your Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
CreateDesigner.propTypes = {
  registerDesigner: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerDesigner }
)(withRouter(CreateDesigner));