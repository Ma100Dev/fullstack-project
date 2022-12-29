import { Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { setUser } from './reducers/userReducer';

import Login from './components/pages/user/Login';
import SignUp from './components/pages/user/SignUp';
import FrontPage from './components/pages/general/FrontPage';
import MenuAppBar from './components/reusables/MenuAppBar';
import RentPage from './components/pages/rental/RentPage';
import Profile from './components/pages/user/Profile';
import AddProperty from './components/pages/rental/AddProperty';
import SingleRental from './components/pages/rental/SingleRental';
import Messages from './components/pages/user/Messages';
import Conversation from './components/pages/user/Conversation';
import NotFound from './components/pages/general/NotFound';

const user = localStorage.getItem('user');

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

ErrorFallback.propTypes = {
  error: PropTypes.object.isRequired,
  resetErrorBoundary: PropTypes.func.isRequired,
};

// TODO: Feedback.
const App = () => {
  const dispatch = useDispatch();
  if (user) {
    dispatch(setUser(JSON.parse(user)));
  }
  return (
    <>
      <MenuAppBar />
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          window.location.reload(true);
        }}
      >
        <Routes>
          <Route path='/' element={(<FrontPage />)} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/rent' element={<RentPage />} />
          <Route path='/rent/:id' element={<SingleRental />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/edit' element={<Profile editMode={true} />} />
          <Route path='/add' element={<AddProperty />} />
          <Route path='/messages' element={<Messages />} />
          <Route path='/messages/:id' element={<Conversation />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
};

export default App;
