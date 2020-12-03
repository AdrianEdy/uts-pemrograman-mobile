import React, {useContext, useState} from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import GlobalStyles from '../sheets/GlobalSheet';
import {AuthContext} from '../navigation/AuthProvider';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const {login} = useContext(AuthContext);

  return (
    <SafeAreaView style={[GlobalStyles.androidSafeArea, styles.container]}>
      <View style={styles.titleContainer}>
        <Image source={require('../assets/question.png')} style={styles.logo} />
        <Text style={styles.mainTitle}>Self Quest</Text>
        <Text style={styles.secondaryTitle}>Your Own Journey</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#1E2D24"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#1E2D24"
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => login(email, password)}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text
          style={styles.loginText}
          onPress={() => navigation.navigate('Sign Up')}>
          Signup
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E2D24',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '80%',
    backgroundColor: '#334139',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#C52184',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
  logo: {
    width: 70,
    height: 70,
    tintColor: 'white',
  },
  mainTitle: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  secondaryTitle: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  text: {
    color: 'white',
    fontSize: 15,
  },
  textInput: {
    borderWidth: 1,
    backgroundColor: 'white',
  },
  titleContainer: {
    top: 70,
    alignItems: 'center',
    marginBottom: 90,
  },
});
