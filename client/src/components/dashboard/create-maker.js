import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerMaker } from "../../actions/authActions";
import classnames from "classnames";
import Select , {components} from 'react-select'

class CreateMaker extends Component {
  constructor(props) {
    super(props);
    let userId = props.auth.user.id
    this.state = {
      id: userId,
      noOfProjects: 0,
      material: "",
      // material: [],
      location: "",
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
    this.setState({material: e.value })
  }
onSubmit = e => {
    e.preventDefault();
const newUser = {
      noOfProjects: this.state.noOfProjects,
      material: this.state.material,
      location: this.state.location
    };
this.props.registerMaker(newUser, this.props.history); 
  };
render() {
    const { errors } = this.state;
    const options = [
      {value: "Wood", label: "Wood"},
      {value: "Metal", label: "Metal"},
      {value: "Glass", label: "Glass"}
    ]
    const customStyles = {
      option: (provided, state) => ({
        ...provided,
        borderBottom: '2px dotted blue',
        color: state.material ? 'yellow': 'black',
        backgroundColor: state.material? 'blue':'white'
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
                  value={this.state.noOfProjects}
                  error={errors.name}
                  id="noOfProjects"
                  type="number"
                  className={classnames("", {
                    invalid: errors.noOfProjects
                  })}
                />
                <label htmlFor="name">How many Projects you work on every month?</label>
                <span className="red-text">{errors.name}</span>
              </div>

              <div className="input-field col s12">
                <Select 
                    id="material"
                    isMulti= {false}
                    name="material"
                    placeholder="Materials you can work with"
                    options={options}
                    styles={customStyles}
                    onChange = {this.handleSelectChange}
                />
                {/* <label htmlFor="material">Materials you can work with?</label> */}
                <span className="red-text">{errors.material}</span>
              </div>

              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.location}
                  error={errors.name}
                  id="location"
                  type="text"
                  className={classnames("", {
                    invalid: errors.location
                  })}
                />
                <label htmlFor="location">Where are you based of?</label>
                <span className="red-text">{errors.location}</span>
              </div>

              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "200px",
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
CreateMaker.propTypes = {
  registerMaker: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerMaker }
)(withRouter(CreateMaker));