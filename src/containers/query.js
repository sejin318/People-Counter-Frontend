import { connect } from 'react-redux';
import Query from '../components/query';
import * as actions from '../actions/query';

const mapStateToProps = (state, ownProps) => ({
  start_date: state.query.start_date,
  end_date: state.query.end_date,
  locations: state.query.locations,
  location_list: state.query.location_list, 
});



export default connect(mapStateToProps)(Query);
