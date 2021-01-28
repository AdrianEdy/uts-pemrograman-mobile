import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProvider';
import firestore from '@react-native-firebase/firestore';

import AuthStack from './AuthStack';
import AppStack from './AppStack';

const Routes = () => {
  const {user, setUser, setProfile, registering} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    if (user) {
      firestore()
        .collection('Users')
        .doc(user.uid)
        .get()
        .then((querySnapshot) => {
          setProfile(querySnapshot.data());
          if (initializing) setInitializing(false);
        });
    } else {
      if (initializing) setInitializing(false);
    }
    setUser(user);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing && registering) return null;

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
