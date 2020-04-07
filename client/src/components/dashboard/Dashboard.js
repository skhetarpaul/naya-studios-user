import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from 'axios'
import Particles from 'react-particles-js'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genre: "",
      name: "",
      email: "",
      editedData: false
    }
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  onCreateEventClick = () => {
    console.log(this.state)
    if(this.state.genre=== 'Maker') {
      this.props.history.push('/create-maker/');
    }
    if(this.state.genre=== 'Designer') {
      this.props.history.push('/create-designer/');
    }
    console.log("redirecting done")
  }
 
  onViewClick = () => {
    this.props.history.push('/view/');
    console.log("redirecting done")
  }
  async componentDidMount() {
    let user_id = this.props.auth.user.id
    console.log(user_id)
    let response = await axios.get(`/api/users/view-user?id=${user_id}`)
    const {genre, name, email} = response.data
    console.log(genre, name, email)
    this.setState({
      genre, name, email
    })

  }
render() {
    const { user } = this.props.auth;
    

return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        
          <div className="row">
            <div className="col s12 center-align">
              <h4>
                <b>Welcome onboard,</b> {user.name.split(" ")[0]}
                <p className="flow-text blue-text text-darken-1">
                  You have registered yourself as a {this.state.genre}<br/>
                  Become a <span style={{ fontFamily: "monospace" }}>Creator!!</span>
                </p>
              </h4>
              <button
                style={{
                  width: "250px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                  marginRight: "2rem"
                }}
                onClick={this.onCreateEventClick} 
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                CREATE YOUR PROFILE
              </button>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                  marginRight: "2rem"
                }}
                onClick={this.onLogoutClick}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Logout
              </button>
              <button
                style={{
                  width: "250px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                onClick={this.onViewClick}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                VIEW YOUR PROFILE
              </button>
              
            </div>
          </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);