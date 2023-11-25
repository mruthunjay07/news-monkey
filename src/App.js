import "./App.css";

import React, { Component } from "react";
import Navbar from "./component/Navbar";
import News from "./component/News";
// import NewsItem from './NewsItem';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  pageSize = 5;
  apiKey = process.env.REACT_APP_NEWS_API
  constructor() {
    super();
    this.state = {
      progress: 0,
    };
  }
  setProgress = (progress) => {
    this.setState({ progress: progress });
  };
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color="#0091EA"
            height={3}
            progress={this.state.progress}
          />

          {/* <News setProgress =  {this.setProgress}Item /> */}
          <Routes>
            <Route
              path="/"
              element={
                <News
                  setProgress={this.setProgress} apiKey={this.apiKey}
                  key="General"
                  pageSize={this.pageSize}
                  country="in"
                  category="General"
                />
              }
            ></Route>
            <Route
              path="/Business"
              element={
                <News
                  setProgress={this.setProgress} apiKey={this.apiKey}
                  key="Business"
                  pageSize={this.pageSize}
                  country="in"
                  category="Business"
                />
              }
            ></Route>
            <Route
              path="/Entertainment"
              element={
                <News
                  setProgress={this.setProgress} apiKey={this.apiKey}
                  key="Entertainment"
                  pageSize={this.pageSize}
                  country="in"
                  category="Entertainment"
                />
              }
            ></Route>
            <Route
              path="/General"
              element={
                <News
                  setProgress={this.setProgress} apiKey={this.apiKey}
                  key="General"
                  pageSize={this.pageSize}
                  country="in"
                  category="General"
                />
              }
            ></Route>
            <Route
              path="/Health"
              element={
                <News
                  setProgress={this.setProgress} apiKey={this.apiKey}
                  key="Health"
                  pageSize={this.pageSize}
                  country="in"
                  category="Health"
                />
              }
            ></Route>
            <Route
              path="/Science"
              element={
                <News
                  setProgress={this.setProgress} apiKey={this.apiKey}
                  key="Science"
                  pageSize={this.pageSize}
                  country="in"
                  category="Science"
                />
              }
            ></Route>
            <Route
              path="/Sports"
              element={
                <News
                  setProgress={this.setProgress} apiKey={this.apiKey}
                  key="Sports"
                  pageSize={this.pageSize}
                  country="in"
                  category="Sports"
                />
              }
            ></Route>
            <Route
              path="/Technology"
              element={
                <News
                  setProgress={this.setProgress} apiKey={this.apiKey}
                  key="Technology"
                  pageSize={this.pageSize}
                  country="in"
                  category="Technology"
                />
              }
            ></Route>
          </Routes>
        </Router>
      </div>
    );
  }
}
