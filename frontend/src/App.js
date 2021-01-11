import React from "react";
import Landing from "./pages/Landing/";
import Store from "./pages/Ecommerce/";
import { Route, BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={Landing} />
        <Route path="/store" component={Store} />
      </div>
    </Router>
  );
};

export default App;
