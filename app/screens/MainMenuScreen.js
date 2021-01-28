import React, {Component, useContext, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import GlobalStyles from '../sheets/GlobalSheet';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';

const MainMenuScreen = ({navigation}) => {
  const {user, profile} = useContext(AuthContext);
  const [noteBox, setNoteBox] = useState([]);

  function deleteNote(id) {
    console.log(id);
    Alert.alert(
      'Delete Note',
      'Apakah Anda yakin menghapus note ini?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            firestore()
              .collection('Notes')
              .doc(id)
              .delete()
              .then(() => {
                Alert.alert('Sukses!', 'Berhasil dihapus!', [{text: 'OK'}], {
                  cancelable: false,
                });
              });
          },
        },
      ],
      {cancelable: false},
    );
  }
  firestore()
    .collection('Notes')
    .where('user_id', '==', user.uid)
    .orderBy('created_at', 'desc')
    .get()
    .then((querySnapshot) => {
      let getNotes = [];
      querySnapshot.forEach((documentSnapshot) => {
        let data = documentSnapshot.data();
        data.id = documentSnapshot.id;
        getNotes.push(data);
      });

      setNoteBox(
        getNotes.map((note) => {
          return (
            <View style={styles.noteBox} key={note.created_at}>
              <Text style={styles.noteTitle}>{note.title}</Text>
              <View style={styles.btnBox}>
                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={() => navigation.navigate('Edit Note', note)}>
                  <Text style={styles.btnText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={() => deleteNote(note.id)}>
                  <Text style={styles.btnText}>Delete</Text>
                </TouchableOpacity>
                <Text style={styles.noteDate}>
                  {note.created_at.toDate().toLocaleDateString('id')}{' '}
                  {note.created_at.toDate().toLocaleTimeString('id')}
                </Text>
              </View>
              <Text style={styles.noteText}>{note.note}</Text>
            </View>
          );
        }),
      );
    });

  if (!(user && profile)) return null;
  return (
    <SafeAreaView style={[GlobalStyles.androidSafeArea, styles.container]}>
      <View style={styles.contentContainer}>
        <View style={styles.heading}>
          <View style={styles.searchBar}>
            <Text style={styles.mainTitle}>Self Quest</Text>
          </View>
          <TouchableOpacity
            style={styles.headerProfileButton}
            onPress={() => navigation.navigate('Profile')}>
            <Image
              style={styles.pp}
              source={{
                uri: `https://ui-avatars.com/api/?name=${profile.fullname}&background=random`,
              }}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          {noteBox}
        </ScrollView>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate('Add Note')}>
          <Image
            source={require('../assets/plus.png')}
            style={styles.addIcon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MainMenuScreen;

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
  heading: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#334139',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBtn: {
    backgroundColor: '#C52184',
    borderRadius: 5,
    marginRight: 10,
  },
  btnText: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 2,
    color: 'white',
    fontSize: 15,
  },
  btnBox: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignContent: 'center',
  },
  inputContainer: {
    width: '100%',
  },
  headerProfileButton: {
    width: 50,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  inputText: {
    height: 50,
    color: 'white',
    fontSize: 15,
  },
  pp: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  noteBox: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#121a15',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  noteTitle: {
    color: 'white',
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#C52184',
    paddingBottom: 10,
  },
  noteText: {
    paddingTop: 10,
    color: 'white',
  },
  noteDate: {
    color: 'white',
    textAlign: 'right',
    marginLeft: 'auto',
  },
  addBtn: {
    width: 70,
    backgroundColor: '#C52184',
    borderRadius: 100,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 490,
    marginLeft: 260,
    position: 'absolute',
  },
  addIcon: {
    width: 70,
    height: 70,
    tintColor: 'white',
  },
  mainTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
