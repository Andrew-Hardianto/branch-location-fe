import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Provinsi from './screens/Provinsi/Provinsi';
import ProvinsiDetail from './screens/Provinsi/ProvinsiDetail';
import ProvinsiTambah from './screens/Provinsi/ProvinsiTambah';
import ProvinsiEdit from './screens/Provinsi/ProvinsiEdit';
import Kota from './screens/Kota/Kota';
import KotaDetail from './screens/Kota/KotaDetail';
import Kecamatan from './screens/Kecamatan/Kecamatan';
import KecamatanDetail from './screens/Kecamatan/KecamatanDetail';
import Kelurahan from './screens/Kelurahan/Kelurahan';
import KelurahanDetail from './screens/Kelurahan/KelurahanDetail';
import Kodepos from './screens/Kodepos/Kodepos';
import KodeposDetail from './screens/Kodepos/KodeposDetail';
import KotaTambah from './screens/Kota/KotaTambah';
import KecamatanTambah from './screens/Kecamatan/KecamatanTambah';
import KelurahanTambah from './screens/Kelurahan/KelurahanTambah';
import KotaEdit from './screens/Kota/KotaEdit';

function App() {
  return (
    <Router >
      <Sidebar />
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return (
              <Redirect to="/location/provinsi" />
            )
          }}
        />
        <Route path="/location/provinsi" exact component={Provinsi} />
        <Route path="/location/provinsi/tambah" exact component={ProvinsiTambah} />
        <Route path="/location/provinsi/detail/:id" exact component={ProvinsiDetail} />
        <Route path="/location/provinsi/edit/:id" exact component={ProvinsiEdit} />
        <Route path="/location/kota" exact component={Kota} />
        <Route path="/location/kota/tambah" exact component={KotaTambah} />
        <Route path="/location/kota/edit/:id" exact component={KotaEdit} />
        <Route path="/location/kota/detail/:id" exact component={KotaDetail} />
        <Route path="/location/kecamatan" exact component={Kecamatan} />
        <Route path="/location/kecamatan/tambah" exact component={KecamatanTambah} />
        <Route path="/location/kecamatan/detail/:id" exact component={KecamatanDetail} />
        <Route path="/location/kelurahan" exact component={Kelurahan} />
        <Route path="/location/kelurahan/tambah" exact component={KelurahanTambah} />
        <Route path="/location/kelurahan/detail/:id" exact component={KelurahanDetail} />
        <Route path="/location/kodepos" exact component={Kodepos} />
        <Route path="/location/kodepos/detail/:id" exact component={KodeposDetail} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
