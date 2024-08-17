//important react imports
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity, View, Text, StyleSheet, FlatList, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Example icon library
import { DrawerActions} from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';




// Component imports
import Settings from './Settings'
import contact_dietician from '../dietician/ContactDietician';
import logout from '../login_and_authentication/logout'
import Survey from '../Diet/Survey'
import ModalComponent from '@/components/modal2';




const current_plans = [
    {label:"Weight Loss Diet", complexity:'simple', details:"this is a simple weight loss diet"},
    

]


function Plan( props:any){

    return(

        <View style = {styles.cont1}>
            <View style={{ display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <View>
                    <Text style = {styles.cont2}>
                         {props.item.label}
                    </Text>
                    <Text style ={{color:'black', fontSize:14}}>
                        {props.item.complexity}
                    </Text>
                    <Text style ={{color:'dimgray', fontSize:12}}>
                        {props.item.details}
                    </Text>
                </View>

                <TouchableOpacity>
                    <Ionicons name="ellipsis-vertical" size={20} color="black" />
                </TouchableOpacity>

               

               
           </View>
        </View>

                

            
    )
}

function Homescreen ({ navigation }){
    {/** this are functions used for the modal */}
    const[modalVisible, setModalVisible] = useState(false);
    const openModal = () => {
        setModalVisible(true);
  };

    const closeModal = () => {
        setModalVisible(false);
  };
   
    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'white'}}>
            


            <View>
                
            </View>    
                <Text style={{fontSize:16, fontWeight:'bold', marginBottom:20}}> Diet profiles</Text>
                <View style={styles.container}>
                                      
                        <FlatList
                            data={current_plans}
                            renderItem={({item})=><Plan item={item}/>}
                            keyExtractor={(item, index)=> index.toString()}
                            style={{flexGrow:0}}
                            contentContainerStyle={{gap:10}}
                        />
                    
                    <TouchableOpacity
                        onPress={openModal}>
                        <AntDesign name="pluscircleo" size={24} color="black" style = {{color:'#0bad7c', alignSelf:'center'}}/>
                    </TouchableOpacity>

                    <ModalComponent visible ={modalVisible} closeModal={closeModal}/>
                    

                </View>
                
            
        </View>
        
    );

}

const styles= StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'column',
        flexWrap:'wrap',
        justifyContent:'space-between',
        backgroundColor: '#f0f0f0',
        borderRadius: 15,
        padding:25,
        maxHeight:400,
        width: 350,
        gap:10 
    },
    cont1:{
        height:80,
        backgroundColor:'lightgreen',
        padding: 13,
        width:300,
        borderRadius:20,
        flexBasis:'auto',
        flexGrow: 1,
        
        
    },

    cont2:{
        fontWeight:'bold',
        fontSize:14

    }
})

export default Homescreen