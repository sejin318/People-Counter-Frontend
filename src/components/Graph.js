import React from 'react';
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { positions } from '@material-ui/system';
import { sizing } from '@material-ui/system';

export default class Graph extends React.Component {
  componentWillMount() {
    this.props.onMount();
  }

  componentWillUpdate() {
    console.log("component will update at: ", new Date());
  }

  componentDidUpdate(prevProp, prevState){
    console.log("component updated at: ", new Date());
  }

  render() {
    const { location, data } = this.props;
    console.log(data);
    return (
      <div>
      <MDBContainer width="50%">
      <h1 className="mt-5">People Count at {location.toUpperCase()}</h1>
      <h4>Current Count: {data[data.length-1].count}</h4>
      <Line data={{
        labels: data.map((item) => (
          item.time == null ?
          null :
          item.time.getHours() + ':' + item.time.getMinutes())
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
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgb(0, 0, 0)",
            pointHoverBorderColor: "rgba(220, 220, 220, 1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: data.map((item, i) => (item.count))
          }
        ]
      }}
      options={{ responsive: true }} />
      </MDBContainer>
      </div>
    )
  }
}
