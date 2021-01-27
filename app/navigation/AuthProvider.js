import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  return (
    <AuthContext.Provider
      value={{
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
          auth()
            .createUserWithEmailAndPassword(email, password)
            .then((querySnapshot) => {
              console.log(querySnapshot.user.uid);
              firestore()
                .collection('Users')
                .doc(querySnapshot.user.uid)
                .set({
                  fullname: name,
                  phone_number: phone,
                  email: email,
                })
                .then(() => {
                  console.log('User added!');
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
