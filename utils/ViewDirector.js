import PropTypes from 'prop-types';
import { useAuth } from './context/authContext';
import Loading from '../components/Loading';
import Signin from '../components/Signin';
import NavBar from '../components/NavBar';
import RegisterForm from '../components/forms/registerForm';

const ViewDirectorBasedOnUserAuthStatus = ({ component: Component, pageProps }) => {
  const { user, userLoading } = useAuth();

  if (userLoading) {
    return <Loading />;
  }

  if (user.userName) {
    return (
      <>
        <NavBar /> {/* NavBar only visible if user is logged in and is in every view */}
        <div className="container">
          <Component {...pageProps} />
        </div>
      </>
    );
  }
  if (user === false) {
    return <Signin />;
  }

  return <RegisterForm userObj={user} />;
};

export default ViewDirectorBasedOnUserAuthStatus;

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  component: PropTypes.func.isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
