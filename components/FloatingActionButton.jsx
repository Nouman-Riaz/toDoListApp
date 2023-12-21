import React from "react";
import { StyleSheet, TouchableOpacity, Image, View } from "react-native";


const FABComponent = ({ setModalVisible }) => {
  function add() {
    setModalVisible(true);
  }
  return (
    <View >
      <TouchableOpacity
        style={styles.fab}
        onPress={() => { add() }}
      >
        <Image style={styles.tinyLogo} source={require('../assets/plus.png')} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    borderWidth: 5,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 65,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 10,
    end: 0,
    height: 65,
    backgroundColor: '#D9D9D9',
    borderRadius: 100,
  },
  tinyLogo: {
    width: 25,
    height: 25,
  },
})

export default FABComponent;