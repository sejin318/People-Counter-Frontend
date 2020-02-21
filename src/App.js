import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Graph from './containers/Graph';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Buttons from './containers/Buttons';
import Image from './containers/Image';
import Divider from '@material-ui/core/Divider';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CssBaseline />
          <AppBar style={{  }}>
            <Toolbar>
              <Typography type="title" color="inherit">
                HKUST People Counting Application
              </Typography>
              <Buttons />
            </Toolbar>
          </AppBar>
          <div style={{ marginTop: 30, padding: 20}}>
            <Switch>
              <Route exact path="/" render={() => (<Redirect to="/main/south-gate" />)} />
              <Route
                path="/main/:location"
                render={
                  function({ match }){
                    return (
                      <div>
                        <Graph style={{ width:"100", height:"100" }} location={match.params.location} />
                        <Divider style={{marginTop:50}}/>
                        <Image location={match.params.location} />
                      </div>
                    );
                  }
                }
              />
            </Switch>
          </div>
      </div>
    )
  }
}

export default App;
