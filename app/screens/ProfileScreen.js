import React, {Component, useContext} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import GlobalStyles from '../sheets/GlobalSheet';
import {AuthContext} from '../navigation/AuthProvider';

const LoginScreen = () => {
  const {logout} = useContext(AuthContext);

  return (
    <SafeAreaView style={[GlobalStyles.androidSafeArea, styles.container]}>
      <View style={styles.contentContainer}>
        <View style={styles.ppContainer}>
          <Image
            style={styles.pp}
            source={{
              uri:
                'https://ui-avatars.com/api/?name=Adrian+Edy&background=random',
            }}
          />
          <Text style={styles.userName}>Adrian Edy</Text>
        </View>
        <View style={styles.profileContainer}>
          <Text style={styles.label}>Phone Number:</Text>
          <Text style={styles.text}>089518640888</Text>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.text}>adrianedypratama@gmail.com</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.logoutBtn} onPress={() => logout()}>
        <Text style={styles.loginText}>LOGOUT</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E2D24',
    alignItems: 'center',
    flex: 1,
  },
  contentContainer: {
    top: 10,
    width: '95%',
  },
  ppContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  pp: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  userName: {
    top: 20,
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  profileContainer: {
    width: '100%',
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  logoutBtn: {
    width: '80%',
    backgroundColor: '#C52184',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  logoutText: {
    color: 'white',
  },
});
