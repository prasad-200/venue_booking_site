import React, { useEffect } from 'react';
import { Route,Routes} from 'react-router-dom';
import PrivateRoute from './components/HOC/PrivateRoute';
import Home from './containers/Home';
import Signin from './containers/Signin';
import { useDispatch } from 'react-redux';
import { isUserLoggedIn } from './actions/auth.actions';
import Signup from './containers/Signup';
import ProfilePage from './containers/Profile';
import VenuePage from './containers/Venue';
import { PaymentStatus } from './containers/PaymentStatus';

function App() {

  const dispatch = useDispatch();
  const auth = useDispatch(state => state.auth)

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn())
    }
  }, [])

  return (
    <div className="App">
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/signin" element={<Signin />} />
    <Route path="/signup" element={<Signup />} />
    <Route 
     path="/profile/:id" 
     element={
     <PrivateRoute>
       <ProfilePage />
    </PrivateRoute>
   } 
   />

    <Route path="/venue/:id" element={<VenuePage />} />
    <Route path="/payment-status" element={<PaymentStatus />} />
  </Routes>
</div>

  );
}

export default App;
