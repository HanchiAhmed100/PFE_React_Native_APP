import React, {Component} from 'react';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { Image,StatusBar,TouchableOpacity, KeyboardAvoidingView, Text, ToastAndroid } from 'react-native';
import {  Form, Item, Input, Label , Button ,Card, CardItem, Body } from 'native-base';
import {  Hoshi } from 'react-native-textinput-effects';

import Snackbar from 'react-native-snackbar';
import axios from 'axios';
import Config from 'react-native-config'
var styles = require('../Styles/styles');

export default class RegisterScreen extends React.Component {
    static navigationOptions = {
      header: null,
    }
  
    constructor(props){
      super(props)
      this.state = {
        nom : '',
        prenom : '',
        mail :'',
        password : '',
        selecteditem : '',
        adresse : 'hhhh',
        error : '',
        
  
      }
    }
    SignupFunction = () =>{
      
      if(this.state.nom == ""  || this.state.prenom == "" ){
      
        this.setState({error : 'les champs sont obligatoire ! '})
        console.log(this.state.error)
      
      }else{
      
        axios.post(Config.API_KEY+"/Api/Auth/cliRegister",{
          nom : this.state.nom ,
          prenom : this.state.prenom ,
          email : this.state.mail,
          password : this.state.password,
          region : this.state.selecteditem,
          adresse : this.state.adresse
      
        }).then((response)=>{
      
          this.setState({name : ''})
          ToastAndroid.show('User created', ToastAndroid.SHORT);
          console.log("then  : "+ JSON.stringify(response));
          this.props.navigation.pop()
      
        })
        .catch((error)=> {
          Snackbar.show({
            title: 'Erreur Resaux internet',
            duration: Snackbar.LENGTH_INDEFINITE,
            action: {
              title: 'Fermer',
              color: 'green',
              onPress: () => { /* Do something. */ },
            },
          });
      
        });
  
      }
  
  
    
    }
  
    render() {
    const {navigate} = this.props.navigation;
    return (

          <KeyboardAvoidingView style={styles.mycontainer}>
          <StatusBar backgroundColor="#4d68bc" barStyle="lights-content" />

          <Image
                style={{width: 75, height: 75, marginLeft : 125,marginTop : 0}}
                source={require('../images/tt.png')}
              />
                <Form>

                  <Hoshi
                    label={'Nom'}
                    // this is used as active border color
                    borderColor={'#4d68bc'}
                    // active border height
                    borderHeight={3}
                    inputPadding={16}
                    // this is used to set backgroundColor of label mask.
                    // please pass the backgroundColor of your TextInput container.
                    onChangeText={(nom) => this.setState({nom})}
                  />
                  <Hoshi
                    label={'Prenom'}
                    // this is used as active border color
                    borderColor={'#4d68bc'}
                    // active border height
                    borderHeight={3}
                    inputPadding={16}
                    // this is used to set backgroundColor of label mask.
                    // please pass the backgroundColor of your TextInput container.
                    onChangeText={(prenom) => this.setState({prenom})}
                  />

                  <Hoshi
                    label={'Adresse Mail'}
                    // this is used as active border color
                    borderColor={'#4d68bc'}
                    // active border height
                    borderHeight={3}
                    inputPadding={16}
                    // this is used to set backgroundColor of label mask.
                    // please pass the backgroundColor of your TextInput container.
                    onChangeText={(mail) => this.setState({mail})}
                  />
                  <Hoshi
                    label={'Mot de passe '}
                    // this is used as active border color
                    borderColor={'#4d68bc'}
                    // active border height
                    borderHeight={3}
                    inputPadding={16}
                    // this is used to set backgroundColor of label mask.
                    // please pass the backgroundColor of your TextInput container.
                    onChangeText={(password) => this.setState({password})}
                  />


                <Text style={styles.space}> </Text>
                <Button rounded primary style={styles.center} 
                  onPress={
                    this.SignupFunction
                  }
                  >
                  <Text style={styles.mybutton}> Crée
                  </Text>
                </Button>
      
  
      
                </Form>

                  <TouchableOpacity style={styles.registers}  onPress={() => navigate('Login')}>
                    <Image
                      style={styles.registers} 
                      source={require('../images/back.png')}
                    />
                  </TouchableOpacity>

          </KeyboardAvoidingView>

      );
    }
  }
  /********************************  END Register Screen *************************************/
  