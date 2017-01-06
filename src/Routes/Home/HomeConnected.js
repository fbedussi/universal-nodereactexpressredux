import {connect} from 'react-redux';
import {Home} from './Home';

function mapStateToProps(state) {
  return state;
}


export default connect(mapStateToProps)(Home);
