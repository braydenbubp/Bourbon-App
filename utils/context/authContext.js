// Context API Docs: https://beta.reactjs.org/learn/passing-data-deeply-with-context

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { firebase } from '../client';
import { getUser } from '../auth';

const AuthContext = createContext();

AuthContext.displayName = 'AuthContext'; // Context object accepts a displayName string property. React DevTools uses this string to determine what to display for the context. https://reactjs.org/docs/context.html#contextdisplayname

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [oAuthUser, setOAuthUser] = useState(null);

  // there are 3 states for the user:
  // null = application initial state, not yet loaded
  // false = user is not logged in, but the app has loaded
  // an object/value = user is logged in

  const updateUser = useMemo(
    () => (uid) => getUser(uid).then((gamerInfo) => {
      if (gamerInfo[0]) {
        setUser({
          uid: oAuthUser.uid,
          userName: gamerInfo[0].userName ? gamerInfo[0].userName : null,
          bio: gamerInfo[0].bio ? gamerInfo[0].bio : null,
          firebaseKey: gamerInfo[0].firebaseKey ? gamerInfo[0].firebaseKey : null,
        });
      }
    }),
    [oAuthUser],
  );
  useEffect(() => {
    firebase.auth().onAuthStateChanged((fbUser) => {
      if (fbUser) {
        setOAuthUser(fbUser);
        getUser(fbUser.uid).then((gamerInfo) => {
          if (gamerInfo.length === 0) {
            setUser('not registered');
          }
          let userObj = {};
          if ('null' in gamerInfo) {
            userObj = gamerInfo;
          } else {
            userObj = {
              uid: fbUser.uid, userName: gamerInfo[0]?.userName, bio: gamerInfo[0]?.bio, firebaseKey: gamerInfo[0]?.firebaseKey,
            };
          }
          setUser(userObj);
        });
      } else {
        setOAuthUser(false);
        setUser(false);
      }
    });
  }, []);

  const value = useMemo(
    () => ({
      user,
      updateUser,
      userLoading: user === null,
      setUser,
    }),
    [user, updateUser, setUser],
  );

  return <AuthContext.Provider value={value} {...props} />;
};
const AuthConsumer = AuthContext.Consumer;

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth, AuthConsumer };
