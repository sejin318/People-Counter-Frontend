import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
import { ButtonGroup } from '@material-ui/core';
import Graph from './containers/Graph';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Buttons from './containers/Buttons';
import Image from './containers/Image';
import Divider from '@material-ui/core/Divider';
import Query from './containers/query'

let style = isMobile ? {
  height: window.innerHeight * 0.1,
} : {};

class App extends Component {
  render() {
    return (
      <div className="App">
        <CssBaseline />
          <AppBar style={style}>
            <Toolbar style={{width: window.innerWidth}}>
              <Typography type="title" color="inherit">
              <h2 style={{flexDirection: 'row', fontSize: isBrowser ? 24 : 20}}>
                HKUST People Counting Application
              </h2>
              </Typography>
              <BrowserView>
                <Buttons />
              </BrowserView>
            </Toolbar>
          </AppBar>
          <div style={{ marginTop: 60, padding: 20}}>
            <Switch>
              <Route exact path="/" render={() => (<Redirect to="/main/south-gate" />)} />
              <Route
                path="/main/:location"
                render={
                  function({ match }){
                    if(match.params.location == 'south-gate'){
                      return (
                        <div>
                          <Graph style={{ width:"100", height:"100" }} location={match.params.location} />
                          <BrowserView>
                            <Divider style={{marginTop:50}}/>
                            <Image location={match.params.location} />
                          </BrowserView>
                        </div>
                      )
                    } else if (match.params.location == 'query & download'){
                      return (
                        <div>
                          <Query />
                        </div>
                      )
                    } else {
                      return (
                        <div>
                          <Graph style={{ width:"100", height:"100" }} location={match.params.location} />
                          <Divider style={{marginTop:50}}/>
                        </div>
                      )
                    }
                  }
                }
              />
            </Switch>
            <MobileView>
              <ButtonGroup
                orientation="horizontal"
                color="primary"
                variant="contained"
                style={{position:"absolute", bottom:0, borderRadius: 0}}
              >
                <Buttons />
              </ButtonGroup>
            </MobileView>
          </div>
      </div>
    )
  }
}

export default App;
