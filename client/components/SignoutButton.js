import {useApolloClient} from '@apollo/react-hooks';
import cookie from 'cookie';
import redirect from '../lib/redirect';

const SignoutButton = () => {
  const apolloClient = useApolloClient();

  const signout = () => {
    document.cookie = cookie.serialize('token', '', {
      maxAge: -1 // Expire the cookie immediately
    });

    // Force a reload of all the current queries now that the user is
    // logged in, so we don't accidentally leave any state around.
    apolloClient.cache.reset().then(() => {
      // Redirect to a more useful page when signed out
      redirect({}, '/signin');
    })
  };

  return (
    <button onClick={signout}>Sign out</button>
  )
};

export default SignoutButton;
