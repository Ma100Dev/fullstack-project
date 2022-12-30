import { Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { setUser } from '@reducers/userReducer';

import Login from '@user/Login';
import SignUp from '@user/SignUp';
import FrontPage from '@general/FrontPage';
import MenuAppBar from '@reusables/MenuAppBar';
import RentPage from '@rental/RentPage';
import Profile from '@user/Profile';
import AddProperty from '@rental/AddProperty';
import SingleRental from '@rental/SingleRental';
import Messages from '@pages/user/Messages';
import Conversation from '@user/Conversation';
import NotFound from '@general/NotFound';

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
