import React, { Component } from "react";
import "../sass/style.css";
import Aside from "./Aside";
import Main from "./Main";
import IEX from "../IEX";
const { ipcRenderer } = window.electron;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.iex = new IEX("Tpk_3724ae6e28174771b450a8b228722ff9", true);
  }
  state = {
    profile: "AAPL"
  };
  componentDidMount() {
    ipcRenderer.send("m/appDidMount");
    ipcRenderer.send("m/symbols");
    ipcRenderer.on("r/symbols", (e, data) => {
      this.setState({ symbols: data.symbols });
    });
  }
  iex = {};
  getWatchItem = profile => {
    if (profile === this.state.profile) return;
    this.setState({
      profile: profile
    });
  };
  render() {
    return (
      <div className="App">
        <div className="Window">
          <Aside iex={this.iex} profile={this.state.profile} getWatchItem={this.getWatchItem} />
          <Main iex={this.iex} profile={this.state.profile} />{" "}
        </div>
      </div>
    );
  }
}
