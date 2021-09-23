import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Homepage from './components/pages/home/Homepage';
import Dogs from './components/pages/dogs/Dogs';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Homepage />
        </Route>
        <Route path="/dogs">
          <Dogs />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
