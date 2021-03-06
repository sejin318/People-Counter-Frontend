import React from 'react';
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { compose, sizing, spacing, positions } from '@material-ui/system';
import { styled } from '@material-ui/core/styles';
import WindowSize, { useWindowSize } from "@reach/window-size";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

export default class Graph extends React.Component {
  componentDidMount(){
    console.log('Graph component mounted');
  }

  componentWillUnmount(){
    console.log('Graph component will unmount');
  }

  componentWillMount() {
    this.props.onMount();
  }

  render() {
    const { location, data } = this.props;
    return (
      <div>
        <MDBContainer>
        <h1 className="mt-5" style={{fontSize: isBrowser ? 28 : 20}}>People Count at {location.toUpperCase()}</h1>
        <h4>Current Count: {data[data.length-1].count}</h4>
        <h5>{location == "barn-b" ? "*Computer Barn B is closed due to the COVID-19." : "*Data is updated every 5 seconds."}</h5>
        <Line
        width={200}
        height={isBrowser == true ? 30 : 170}
        data={{
          labels: data.map((item) => (
            item.time == null ?
            null :
            item.time.getHours() + ':' + item.time.getMinutes() + ':' + item.time.getSeconds())
          ),
          datasets: [
            {
              label: "People Count Over Time",
              fill: true,
              lineTension: 0.3,
              backgroundColor: "rgba(184, 185, 210, .3)",
              borderColor: "rgb(35, 26, 136)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgb(35, 26, 136)",
              pointBackgroundColor: "rgb(255, 255, 255)",
              pointBorderWidth: 10,
              pointHoverRadius: 12,
              pointHoverBackgroundColor: "rgb(255, 0, 0)",
              pointHoverBorderColor: "rgba(220, 220, 220, 1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: data.map((item, i) => (item.count))
            }
          ]
        }}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                stepSize: 1 // this did not work as expected
              }
            }],
          }
        }} />
        </MDBContainer>
      </div>
  );
}
}
