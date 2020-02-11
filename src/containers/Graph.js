import { connect } from 'react-redux';
import Graph from '../components/Graph';
import * as actions from '../actions/Graph';

const mapStateToProps = (state, ownProps) => ({
  data: state.Graph.data[ownProps.location],
  error: state.Graph.error
});

const mapDispatchToProps = dispatch => ({
  onMount () {
    dispatch(actions.fetchData());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
