import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Welcome from "./Components/Welcome/Welcome";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import Home from "./Components/Home/Home";
import Edit from "./Components/Edit";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/edit/:id" component={Edit} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
