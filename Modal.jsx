import { Text, StyleSheet, View, Alert, Modal, Pressable, TextInput} from 'react-native'
import React, {useState} from 'react'

const ModalComponent = props =>{
    const [id, setId] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    // const add = () => {
    //     setModalVisible(true);
    //   };
    //props.modalVisible
    //setModalVisible(props.modalVisible);
      const closeModal = () => {
        props.setModalVisible(false);
        setDescription("");
        setTitle("");
      };
    return(
        <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={props.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            closeModal();
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput style={styles.input} onChangeText={setTitle} 
              placeholder="Title" value={title}/>
              <TextInput style={styles.input} onChangeText={setDescription} 
              placeholder="Description" value={description}/>
              {title === '' && description === '' ? (
      <Text style={{color:'red'}}>Fields should not be empty</Text>
    ) : null}    
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                    if(title===''&&description===''){}else{
                        props.data.push({id:id,title:title,description:description});
                        setId(id+1);
                    }
                    closeModal();
                    }  
                }
              >
                <Text style={styles.textStyle}> Done </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        width:"100%",
        borderWidth: 1,
        padding: 10,
        borderRadius:9,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        //height:70,
        width:"80%",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
});

export default ModalComponent;