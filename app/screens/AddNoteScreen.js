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

const AddNoteScreen = ({navigation}) => {
  const [title, setTitle] = useState();
  const [note, setNote] = useState();
  const {user} = useContext(AuthContext);

  return (
    <SafeAreaView style={[GlobalStyles.androidSafeArea, styles.container]}>
      <View style={styles.form}>
        <Text style={styles.mainTitle}>Add Note</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            placeholder="Title"
            placeholderTextColor="#334139"
            onChangeText={(title) => setTitle(title)}
          />
        </View>
        <View style={styles.noteContainer}>
          <TextInput
            multiline={true}
            style={styles.inputNote}
            placeholder="Note"
            placeholderTextColor="#334139"
            onChangeText={(note) => setNote(note)}
          />
        </View>
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={() => {
            let error = 0;
            try {
              firestore()
                .collection('Notes')
                .add({
                  user_id: user.uid,
                  title: title,
                  note: note,
                  created_at: new Date(),
                })
                .then(() => {
                  console.log('Note added!');
                });
            } catch (e) {
              error = 1;
              Alert.alert('Error!', e);
            }
            if (!error) {
              Alert.alert('Success!', 'Penambahan note sukses!');
              navigation.navigate('Self Quest');
            }
          }}>
          <Text style={styles.saveText}>SAVE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddNoteScreen;

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
  noteContainer: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#C52184',
    marginBottom: 20,
    justifyContent: 'center',
    backgroundColor: '#19211c',
  },
  inputNote: {
    height: 180,
    color: 'white',
    textAlignVertical: 'top',
  },
  mainTitle: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  saveBtn: {
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
  saveText: {
    color: 'white',
  },
});
