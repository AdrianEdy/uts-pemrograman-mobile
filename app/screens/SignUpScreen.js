import React, {useContext, useState} from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import GlobalStyles from '../sheets/GlobalSheet';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';

const SignupScreen = ({navigation}) => {
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const {register} = useContext(AuthContext);

  return (
    <SafeAreaView style={[GlobalStyles.androidSafeArea, styles.container]}>
      <View style={styles.form}>
        <Text style={styles.mainTitle}>Sign Up</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            placeholder="Full Name"
            placeholderTextColor="#334139"
            onChangeText={(name) => setName(name)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            placeholder="Phone Number"
            placeholderTextColor="#334139"
            keyboardType="phone-pad"
            onChangeText={(phone) => setPhone(phone)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#334139"
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#334139"
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        <TouchableOpacity
          style={styles.signUpBtn}
          onPress={() => {
            let error = 0;
            try {
              register(email, password, name, phone);
            } catch (e) {
              error = 1;
              Alert.alert('Error!', e);
            }
            if (!error) {
              Alert.alert(
                'Success!',
                'Pendaftaran Sukses! \nSilahkan login dengan data yang Anda inputkan',
              );
            }
          }}>
          <Text style={styles.signUpText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E2D24',
    justifyContent: 'center',
  },
  form: {
    paddingHorizontal: 30,
  },
  inputContainer: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#C52184',
    marginBottom: 20,
    justifyContent: 'center',
  },
  inputText: {
    height: 40,
    color: 'white',
  },
  mainTitle: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  signUpBtn: {
    width: '80%',
    backgroundColor: '#C52184',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'center',
  },
  signUpText: {
    color: 'white',
  },
});
