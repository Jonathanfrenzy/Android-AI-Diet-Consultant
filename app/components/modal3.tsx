// this modal will be a smaller one as a response to clicking on the ellipsis on the right hand of the diet profile

import React from 'react';
import { View, Modal, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';



const ModalComponent = ({visible, closeModal  }) => {
  const navigation = useNavigation();

  const handleOptionPress = (option:string) => {
    // Navigate to OptionScreen with the selected option
    navigation.navigate('OptionScreen', { option });
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.headerText}>
                <Text style={styles.modalText}>Select an Option:</Text>
                <TouchableOpacity
                    onPress={closeModal} style={{alignSelf:'flex-end', marginBottom:10}}>
                    <AntDesign name="closecircleo" size={20} color="black" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleOptionPress('Option 1')}
            >
              <Text style={styles.optionText}>Option 1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleOptionPress('Option 2')}
            >
              <Text style={styles.optionText}>Option 2</Text>
            </TouchableOpacity>
            {/* Add more options as needed */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    height:300,
    width:300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
  },
  headerText:{
    display:'flex',
    flexBasis:'auto',
    flexDirection:'row',
    justifyContent:'space-between',
    width:250,

  },

  optionButton: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: 200,
    alignItems: 'center',
  },
  optionText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ModalComponent;
