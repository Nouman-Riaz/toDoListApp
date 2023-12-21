import { Text, StyleSheet, View, Alert, Modal, Pressable, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'

const EditModalComponent = ({
    setEditModalVisible,
    editModalVisible,
    setData,
    title,
    description,
    id,
    data }) => {
    console.log('Hello, I am in');
    const [editModalTitle, setEditModalTitle] = useState(title);
    const [editModalDescription, setEditModalDescription] = useState(description);

    useEffect(() => {
        setEditModalTitle(title);
        setEditModalDescription(description);
    }, [title, description]);
    function updateItem(id, newTitle, newDescription) {
        const updatedData = data.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    title: newTitle,
                    description: newDescription,
                };
            }
            return item;
        });
        setData(updatedData);
    }
    const closeModal = () => {
        setEditModalVisible(false);
        setEditModalDescription(description);
        setEditModalTitle(title);
    };
    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={editModalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    closeModal();
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput style={styles.input} onChangeText={setEditModalTitle}
                            placeholder="Title" value={editModalTitle} />
                        <TextInput style={styles.input} onChangeText={setEditModalDescription}
                            placeholder="Description" value={editModalDescription} />   
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                if(editModalTitle === ''&& editModalDescription === ''){
                                    
                                }
                                else{
                                    updateItem(id, editModalTitle, editModalDescription);
                                }
                                closeModal();
                            }}
                        >
                            <Text style={styles.textStyle}> Save </Text>
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
        width: "100%",
        borderWidth: 1,
        padding: 10,
        borderRadius: 9,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        //height:70,
        width: "80%",
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

export default EditModalComponent;