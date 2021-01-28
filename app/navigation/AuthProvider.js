import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [registering, setRegistering] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        registering,
        user,
        setUser,
        profile,
        setProfile,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password, name, phone) => {
          setRegistering(true);
          auth()
            .createUserWithEmailAndPassword(email, password)
            .then((querySnapshot) => {
              firestore()
                .collection('Users')
                .doc(querySnapshot.user.uid)
                .set({
                  fullname: name,
                  phone_number: phone,
                  email: email,
                })
                .then(() => {
                  setRegistering(false);
                });
            });
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
