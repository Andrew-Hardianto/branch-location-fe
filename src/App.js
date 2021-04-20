import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Provinsi from './screens/Provinsi';

function App() {
  return (
    <Router >
      <Sidebar />
      <Switch>
        <Route path="/location/provinsi" exact component={Provinsi} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
