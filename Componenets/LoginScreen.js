import React, {Component} from 'react';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { Image ,StatusBar, Text, View , KeyboardAvoidingView  } from 'react-native';
import { Container, Item, Input, Label , Button } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';
import axios from 'axios';
import Config from 'react-native-config'
import {  Hoshi } from 'react-native-textinput-effects';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';
import { LoginButton, AccessToken } from 'react-native-fbsdk';


var styles = require('../Styles/styles');
  
/******************************** Login Screen Class *************************************/
export default class LoginScreen extends React.Component {

    constructor(props) {
      super(props);
      this.state = { 
        username : '',
        password : '',
        error : '',
        active: 'true',
        Nom : '',
        Prenom :'',
        id : ''
  
      };
    }
  
    componentDidMount(){
      this.checkforlocalstorage()
    }
  
   
    
    checkforlocalstorage = async ()=>{
      try {
        const Nom = await AsyncStorage.getItem('Nom');
        const Prenom = await AsyncStorage.getItem('Prenom');
        const id = await AsyncStorage.getItem('id');
        if (Nom !== null && Prenom !== null && id !== null ) {
          this.props.navigation.push('Home')
        }
      } catch (error) {
        // Error retrieving data
      } 
    }
  
  
    
    loginfunction = async () =>{
      this.setState({'username' : ''})
      axios.post(Config.API_KEY+'/Api/Auth/cliLogin',{
        email : this.state.username,
        password : this.state.password,
      }).then((response) =>{
        if(response.data.failed){
          console.log("erreur : "+response.data.failed)
        }
        if(response.data.Client){
          this.setState({'Nom' : response.data.Client.Nom})
          this.setState({'Prenom' : response.data.Client.Prenom})
          this.setState({'id' : response.data.Client.id})
          this.SaveLogger()
        }
      })
      .catch(function (error) {
        console.log(error)
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
    SaveLogger = async ()=>{
      try {
        await AsyncStorage.setItem('Nom',this.state.Nom);
        await AsyncStorage.setItem('Prenom',this.state.Prenom);
        await AsyncStorage.setItem('id',this.state.id+"");
        this.props.navigation.push('Home')
      } catch (error) {
        console.log(error)
        Snackbar.show({
          title: 'Erreur Local Storage',
          duration: Snackbar.LENGTH_INDEFINITE,
          action: {
            title: 'Fermer',
            color: 'green',
            onPress: () => { /* Do something. */ },
          },
        }); 
      }
    }
    static navigationOptions = {
      header: null,
    }



  
  
    render() {
      const {navigate} = this.props.navigation;
      return(
         <Container style={styles.color}>
         <StatusBar backgroundColor="#4d68bc" barStyle="light-content" />
            <View style={{ flex: 1 }}>
              <Image
                style={{width: 125, height: 125, marginLeft : 125,marginTop : 50}}
                source={require('../images/tt.png')}
              />
              <Hoshi
                label={'Nom d\'utilisateur '}
                borderColor={'#4d68bc'}
                borderHeight={3}
                inputPadding={16}
                onChangeText={(username) => this.setState({username})}
              />
              <Hoshi
                label={'Mot de passe'}
                borderColor={'#4d68bc'}
                borderHeight={3}
                inputPadding={16}
                onChangeText={(password) => this.setState({password})}
              />
              <Text>{this.state.error} </Text>
              <Button rounded primary submitAndClear style={styles.center} onPress={ this.loginfunction} >
                <Text style={styles.mybutton}> 
                  valider
                </Text>
              </Button>
              <Text style={styles.space}>Ou</Text>
              <Text onPress={() => navigate('Register')} style={styles.register} >Register now </Text>
              <Text style={styles.space}></Text>
              <Container style={{marginLeft : 80}} >
              <LoginButton
                onLoginFinished={
                  (error, result) => {
                    if (error) {
                      console.log("login has error: " + result.error);
                    } else if (result.isCancelled) {
                      console.log("login is cancelled.");
                    } else {
                      AccessToken.getCurrentAccessToken().then(
                        (data) => {
                          console.log(data.accessToken.toString())
                        }
                      )
                    }
                  }
                }
                onLogoutFinished={() => console.log("logout.")}/>
              </Container>
          </View>
        </Container>
      );
    }
  }
  /******************************** End Login Screen *************************************/
  