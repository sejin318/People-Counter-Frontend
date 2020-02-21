import { connect } from 'react-redux';
import Buttons from '../components/Buttons';

const mapStateToProps = state => ({
  categories: state.commons.categories
});


export default connect(mapStateToProps)(Buttons);
