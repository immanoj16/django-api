import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
// import Spinner from '../common/Spinner';
// import ProfileActions from './ProfileActions';

class Dashboard extends Component {

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick = (e) => {
    this.props.deleteAccount();
  }

  render() {

    const { user } = this.props.auth;

    let dashboardContent;
    if (this.props.expenses.length > 0) {
      dashboardContent = (
        <div>
          <p className="lead text-muted">Welcome <Link to={`/profile/${user.username}`}>{user.email}</Link>{' '}({user.username})</p>
          {/*<ProfileActions />*/}
          <div style={{ margin: '60px' }} />
          <Link to="/add-expense" className="btn btn-lg btn-info">
            Add Expense
          </Link>
        </div>
      );
    } else {
      dashboardContent = (
        <div>
          <p className="lead text-muted">Welcome {user.name}</p>
          <p>You have no expenses, click this to add expense</p>
          <Link to="/add-expense" className="btn btn-lg btn-info">
            Add Expense
          </Link>
        </div>
      )
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Expenses</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  expenses: state.expenses,
  auth: state.auth
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
