import React from "react";
import { create, all } from "mathjs";
import "./App.css";

const config = {};
const math = create(all, config);

const Display = props => {
  return (
    <div className="display">
      <h1>{props.number}</h1>
    </div>
  );
};

const Button = props => {
  return (
    <div>
      <button className="button" onClick={() => props.do(props.value)}>
        {props.value}
      </button>
    </div>
  );
};

const Row = props => {
  return (
    <div className="row">
      <Button value={props.button1} do={props.do} />
      <Button value={props.button2} do={props.do} />
      <Button value={props.button3} do={props.do} />
      <Button value={props.button4} do={props.do} />
    </div>
  );
};

const Board = props => {
  return (
    <div>
      <Row button1="7" button2="8" button3="9" button4="/" do={props.do} />
      <Row button1="4" button2="5" button3="6" button4="*" do={props.do} />
      <Row button1="1" button2="2" button3="3" button4="-" do={props.do} />
      <Row button1="0" button2="." button3="=" button4="+" do={props.do} />
    </div>
  );
};

class App extends React.Component {
  state = {
    display: 0,
    working: 0,
    answered: false
  };

  do = value => {
    let display = this.state.display;
    let working = this.state.working;
    if (display === 0) {
      let newDisplay = value;
      this.setState({ display: newDisplay });
    } else if (display !== 0) {
      let newDisplay = display + value;
      this.setState({ display: newDisplay });
    }

    if (value === "=") {
      let display = this.state.display;
      let answer = math.evaluate(display);
      this.setState({ display: answer, answered: true });
    }
  };

  render() {
    return (
      <div className="App">
        <h1>Ashley's React Calculator</h1>
        <Display number={this.state.display} />
        <Board do={this.do} />
      </div>
    );
  }
}

export default App;
