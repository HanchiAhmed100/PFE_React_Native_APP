import React, {Component} from 'react';
//import Icon from 'react-native-vector-icons/FontAwesome';
import {Image,Alert, Text, View ,ActivityIndicator  } from 'react-native';
import { Item , Button ,Picker, Icon } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';
import axios from 'axios';
import Config from 'react-native-config'
import AwesomeAlert from 'react-native-awesome-alerts';
import PushNotification from 'react-native-push-notification';
import PushController from '../PushController.js'
var styles = require('../../Styles/styles');

/********************************  Reservation List Tab *************************************/
export default class ReservationTab extends React.Component {

    constructor(props){
      super(props)

      this.state = ({
        client_id : '',
        agence_id : '',
        reservation : [],
        isLoading: true,
        societes : [],
        societe :'',
        agences : [],
        showAlert: false,
        codeConfirm : ''

  
      })
    }
    async componentDidMount(){ 
        let x = "aujourd'hui" 
        await this.getClientid()
        await this.LoadFormData()
        this.setState({isLoading: false, time : x});
    
    }
  
    LoadData = async () =>{
      await axios.get(Config.API_KEY+'/Api/Client/agences/'+this.state.societes[0].id)
      .then(res =>{
        this.setState({
          agences : res.data.Agences,
          agence_id : res.data.Agences[0].id, 
          isLoading: false
        })
      }).catch(err =>{
        Snackbar.show({
          title: 'Erreur Resaux internet',
          duration: Snackbar.LENGTH_INDEFINITE,
          action: {
            title: 'Fermer',
            color: 'green',
            onPress: () => {  },
          },
        });
      })
    }

    LoadFormData = async () =>{
      await axios.get(Config.API_KEY+'/Api/Client/societe')
      .then(res =>{
        this.setState({
          societes : res.data.societe,
          societe : res.data.societe[0].nom
        })
        this.LoadData()
      })
      .catch(err =>{
        console.log(err)
        Snackbar.show({
          title: 'Erreur Resaux internet&',
          duration: Snackbar.LENGTH_INDEFINITE,
          action: {
              title: 'Fermer',
              color: 'green',
              onPress: () => {},
          },
        });
      })
    }

    getClientid = async () =>{
        try {
          const { navigation } = this.props;
            const id = await AsyncStorage.getItem('id');
            if ( id !== null ) {
                this.setState({client_id : id})
            }else{
                this.props.navigation.push('Login')
            }
        } catch (error) {
           
            Snackbar.show({
                title: 'Session expired',
                duration: Snackbar.LENGTH_INDEFINITE,
                action: {
                    title: 'Fermer',
                    color: 'green',
                    onPress: () => { this.props.navigation.push('Login') },
                },
            });
        }
    }
    
    PickerChanged = async (item) =>{
      this.setState({isLoading : true,societe: item})
      await axios.get(Config.API_KEY+'/Api/Client/agences/'+item)
      .then(res =>{
        this.setState({
          agences : res.data.Agences,
          agence_id : res.data.Agences[0].id, 
          isLoading: false
        })
      }).catch(err =>{
        Snackbar.show({
          title: 'Erreur Resaux internet ...',
          duration: Snackbar.LENGTH_INDEFINITE,
          action: {
            title: 'Fermer',
            color: 'green',
            onPress: () => {  },
          },
        });
      })
    }
    mynotif = () =>{
      PushNotification.localNotification({
        title: "Ticket TT", 
        message: 'Votre avis sur les service tunisie telecom'
      })
      console.log('afternotifschdules')
    }
    sendNotification = () => {
      console.log('sendnotifschedules')
      setTimeout(this.mynotif, 5000)
    }
    handleAppStateChange = (appState)  => {
      // if (appState === 'background') {
      //   console.log('beforeenotif')
        PushNotification.localNotificationSchedule({
          title : 'Ticket TT',
          message: ' delay notification message in 5 secondss', // (required)
          actions: '["Yes", "No"]',
          date: new Date(Date.now() + (5 * 1000)), // in 3 secs
        });
        console.log('afternotif')
        console.log(new Date)
        console.log(new Date(Date.now() + (5 * 1000)) )
      // }
    };

    showAlert = () => {
      this.setState({
        showAlert: true
      });
    };
  
    hideAlert = () => {
      this.setState({
        showAlert: false
      });
    };

    SetReservation = async () => {
      this.setState({isLoading : true})
      await axios.post(Config.API_KEY+'/Api/Reservation/res',{
        client_id : this.state.client_id,
        agence_id : this.state.agence_id
      }).then((response)=>{
        console.log(response)
        this.setState({isLoading : false})
        this.setState({codeConfirm : response.data.res.num})
        //Alert.alert("Votre numero est : M-"+response.data.res.num +" \n Votre code de verification est : "+response.data.res.code)
        this.setState({
          showAlert: true
        });
        this.sendNotification
        this.handleAppStateChange
      }).catch((error)=>{
        this.setState({isLoading : false})
        Alert.alert(error)
        Snackbar.show({
          title: 'Erreur ',
          duration: Snackbar.LENGTH_INDEFINITE,
          action: {
            title: 'Fermer',
            color: 'green',
            onPress: () => {  },
          },
        });
      })
    }


    render(){
      const {showAlert} = this.state;
      if (this.state.isLoading) {
        return (
          <View style={{flex: 1,justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        );
      }
      return(
          <View>
          <Image
                style={{width: 75, height: 75, marginLeft : 140,marginTop : 0}}
                source={require('../../images/tt.png')}
              />
          <Text style={styles.space}></Text>
          <Text style={{marginLeft : 10}}>Region </Text>
              <Item>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: 90 }}
                  placeholder="Date de Reservation "
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.societe}
                  onValueChange={(itemValue) => this.PickerChanged(itemValue)}>

                  {
                    this.state.societes.map( (v,k)=>{
                    return <Picker.Item label={v.nom} value={v.id} key={k} />
                    })
                  }
                </Picker>
              </Item>
              <Text style={styles.space}></Text>
              <Text style={{marginLeft : 10}}>Espace TT</Text>
              <Item picker style={styles.shortenpicker}>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: 90 }}
                    placeholder="Votre Region"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.agence_id}
                    onValueChange={(item => this.setState({agence_id : item}))}
                  >
                  {
                    this.state.agences.map( (x,k)=>{
                    return <Picker.Item label={x.nom} value={x.id} key={k} />
                    })
                  }  
                  </Picker>
              </Item>
                            <Text style={styles.space}></Text>
              <Button rounded primary style={styles.center} onPress={this.SetReservation}>
              <Text style={styles.mybutton}> Valider</Text>
              </Button>

              <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="Reservation effectuer"
                message={"Votre numero est M-"+this.state.codeConfirm}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                confirmText="Confirmer"
                confirmButtonColor="#4d68bc"
                onConfirmPressed={() => {
                  this.hideAlert();
                }}
              />



              <PushController />
          </View>
      )

    }
  } 
  
  /********************************  END Create Reservation Tab *************************************/
  