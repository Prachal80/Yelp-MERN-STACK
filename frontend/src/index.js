import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store/index";
// import serviceWorker from "./serviceWorker";

//render App component on the root element
ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
// serviceWorker();

// DATABASE=yelp
// DATABASE_HOST=yelp-clone.cncynru0w5bc.us-west-2.rds.amazonaws.com
// DATABASE_USER=admin
// DATABASE_PASSWORD=admin12345
// ip=34.221.204.181
