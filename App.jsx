import { Text, StyleSheet, View, FlatList, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import React, { useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Share from 'react-native-share';
import FloatingActionButton from './components/FloatingActionButton';
import ModalComponent from './Modal';
import EditModalComponent from './EditModal';


const App = () => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editmodalVisible, setEditModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editID, setEditID] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');


  const EditItem = (id) => {
    console.log("Edit pressed");
    console.log(id);
    const selectedItem = data.find(item => item.id === id);
    setEditID(id)
    setTitle(selectedItem.title);
    setDescription(selectedItem.description);
    console.log(title);
    console.log(description);
    setEditModalVisible(true);
    console.log(editmodalVisible);
  }

  const ShareList = async() => {
    if (data.length === 0) {
      Alert.alert('Empty List', 'Please add items to the list before sharing.');
      return;
    }
    var RNFS = require('react-native-fs');
    const content = data.map(item => `${item.title}: ${item.description}`).join('\n');
    const path = RNFS.DocumentDirectoryPath + '/todoList.txt';

    try {
      await RNFS.writeFile(path, content, 'utf8');
      console.log('File written successfully');

      // Share the file
      const options = {
        type: 'text/plain',
        message: 'Share this to-do list',
        title: 'Share To-Do List',
        url: 'file://' + path,
      };

      await Share.open(options);
    } catch (error) {
      if (Share.isPackageInstalled(error.errorCode)) {
        console.log('Share action canceled by user');
      } else {
        console.error('Error during share:', error);
      }
    }

  }


  const FlatListComponent = () => {
    const filteredData = data.filter(item => {
      const regex = new RegExp(searchQuery, 'i');
      return regex.test(item.title) || regex.test(item.description);
    });
    return (
      <View style={styles.listViewStyle}>
        <FlatList
          data={searchQuery ? filteredData : data}
          renderItem={({ item }) => <Item title={item.title} description={item.description} id={item.id} />}
          keyExtractor={item => item.id}
          extraData={data}
        />
      </View>
    );
  };
  function deleteItem(id) {
    console.log("Delete pressed");
    console.log(id);
    // Find the index of the item with the specified id in the DATA array
    const index = data.findIndex(item => item.id === id);
    const newData = data.filter(item => item.id !== id);
    // If the item is found, remove it from the DATA array
    if (index !== -1) {
      data.splice(index, 1);
    }
    setData(newData);
  }
  const Item = ({ title, description, id }) => {
    return (
      <View style={styles.listStyle}>
        <View style={{ flex: 2 }}>
          <Text style={styles.listTitle}>{title}</Text>
          <Text style={styles.listDescription}>{description}</Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flex: 1 }}>
          <TouchableOpacity style={styles.edit} onPress={() => EditItem(id)} >
            <Image style={styles.tinyLogo} source={require('./assets/edit.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.delete} onPress={() => deleteItem(id)}>
            <Image style={styles.tinyLogo} source={require('./assets/delete.png')} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={[styles.titleView, styles.backcolor]}>
        <Text style={styles.title}> ToDoList</Text>
        <View style={{ justifyContent: 'flex-end', flexDirection: 'row', flex: 1 }}>
          <TouchableOpacity style={styles.searchAndShare} onPress={() => ShareList()}>
            <Image style={styles.tinyLogo} source={require('./assets/share.png')} />
          </TouchableOpacity>
        </View>
      </View>
      <TextInput
        placeholder='Search'
        clearButtonMode='always'
        inlineImageLeft='search'
        style={styles.searchBar}
        onChangeText={setSearchQuery}
        value={searchQuery} />
      <FlatListComponent />
      <FloatingActionButton setModalVisible={setModalVisible} />
      <ModalComponent data={data}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
      <EditModalComponent
        setEditModalVisible={setEditModalVisible}
        editModalVisible={editmodalVisible}
        title={title}
        description={description}
        setData={setData}
        id={editID}
        data={data}
      />
    </View>
  );

}

const styles = StyleSheet.create({
  searchBar: {
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  searchAndShare: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
    borderRadius: 30,
    backgroundColor: "white",
    justifyContent: 'center',
    alignItems: 'center',
  },
  edit: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
    borderRadius: 30,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
  delete: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listViewStyle: {
    alignItems: 'flex-start',
    flex: 1,
    //height: hp('70%'), // 70% of height device screen
    //width: wp('50%'),
  },
  listStyle: {
    borderRadius: 7,
    width: wp('89%'),
    //width: 350,
    flex: 1,
    backgroundColor: '#00CCBE',
    marginBottom: 15,
    flexDirection: 'row',
  },
  backcolor: {
    backgroundColor: "#D9D9D9",
  },
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 20,
  },
  titleView: {
    height: "8%",
    borderRadius: 7,
    justifyContent: "space-around",
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  title: {
    fontSize: 29,
    fontWeight: "700",
  },
  listTitle: {
    marginHorizontal: 10,
    fontSize: 25,
    //width:250,
    fontWeight: '500',
    color: 'black',
    marginBottom: 10,
  },
  listDescription: {
    fontSize: 20,
    //width:250,
    marginLeft: 10,
    fontWeight: '300',
    marginBottom: 5,
    color: "white",
  },
  tinyLogo: {
    width: 15,
    height: 15,
  },

});


export default App;