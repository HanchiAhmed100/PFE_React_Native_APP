import React, {Component} from 'react';
import {

  Text,
  View,

  ToastAndroid,

} from 'react-native';
import {

  Item,
  Input,
  Label,
  Button,
  Picker,
  Icon
} from 'native-base';

import {Rating, AirbnbRating} from 'react-native-ratings';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';
import axios from 'axios';
import Config from 'react-native-config'

var styles = require('../Styles/styles');

/********************************  FeedbackScreen List Tab *************************************/
export default class FeedbackScreen extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = ({
      rating: '',
      description: '',

      client_id: '',
      isLoading: true,

      societes: [],
      societe: '',

      agences: [],
      agence: ''
    })
  }
  
  async componentDidMount(){  
    await this.getClientid()
    await this.LoadFormData()
    this.setState({isLoading: false});
  }

  static navigationOptions = {
    title : "Feedback"
  }


  getClientid = async() => {
    try {
      console.log("hi feedback")
      const id = await AsyncStorage.getItem('id');
      if (id !== null) {
        this.setState({client_id: id})
        console.log("wselet ")
      } else {
        this
          .props
          .navigation
          .push('Login')
      }
    } catch (error) {
      Snackbar.show({
        title: 'Session expired',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          title: 'Fermer',
          color: 'green',
          onPress: () => {
            this
              .props
              .navigation
              .push('Login')
          }
        }
      });
    }
  }
  LoadFormData = async () =>{
    await axios.get(Config.API_KEY+'/Api/Client/societe')
    .then(res =>{
      this.setState({societes : res.data.societe})
    })
    .catch(err =>{
      Snackbar.show({
        title: 'Session expired',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
            title: 'Fermer',
            color: 'green',
            onPress: () => { this.props.navigation.push('Login') },
        },
      });
    })
  }

  setFeedback = async() => {
    this.setState({isLoading: true})
    await axios.post(Config.API_KEY+'/Api/Client/Feedback', {
      description: this.state.description,
      nbStartRating: this.state.rating,
      client_id: this.state.client_id,
      societe_id: this.state.societe,
      agence_id: this.state.agence
    })
    .then(res => {
      if(res.status == 200){
        ToastAndroid.show('Message envoyer', ToastAndroid.SHORT);
        this.props.navigation.pop()
        this.setState({isLoading: false})
      }else{
        Snackbar.show({
          title: 'Erreur Resaux internet',
          duration: Snackbar.LENGTH_INDEFINITE,
          action: {
            title: 'Fermer',
            color: 'green',
            onPress: () => {}
          }
        });
      }
    })
    .catch(err => {
      Snackbar.show({
        title: 'Erreur Resaux internet',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          title: 'Fermer',
          color: 'green',
          onPress: () => {}
        }
      });
    })
  }

  PickerChanged = async(item) => {
    this.setState({isLoading: true, societe: item})
    await axios
      .get(Config.API_KEY+'/Api/Client/agences/' + item)
      .then(res => {
        this.setState({agences: res.data.Agences, isLoading: false})
      })
      .catch(err => {
        Snackbar.show({
          title: 'Erreur Resaux internet',
          duration: Snackbar.LENGTH_INDEFINITE,
          action: {
            title: 'Fermer',
            color: 'green',
            onPress: () => {}
          }
        });
      })
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
      <Text style={{marginLeft : 10, marginTop : 25}}>Region </Text>
        <Item>
          <Picker
            mode="dropdown"
            iosIcon={< Icon name = "arrow-down" />}
            style={{
            width: 90
          }}
            placeholder="Date de Reservation "
            placeholderStyle={{
            color: "#bfc6ea"
          }}
            placeholderIconColor="#007aff"
            selectedValue={this.state.societe}
            onValueChange={(itemValue) => this.PickerChanged(itemValue)}>

            {this
              .state
              .societes
              .map((v, k) => {
                return <Picker.Item label={v.nom} value={v.id} key={k}/>
              })
            }
          </Picker>
        </Item>
        <Text style={{marginLeft : 10, marginTop : 25 }}>Espace TT </Text>
        <Item picker style={styles.shortenpicker}>
          <Picker
            mode="dropdown"
            iosIcon={< Icon name = "arrow-down" />}
            style={{
            width: 90
          }}
            placeholder="Votre Region"
            placeholderStyle={{
            color: "#bfc6ea"
          }}
            placeholderIconColor="#007aff"
            selectedValue={this.state.agence}
            onValueChange={(item => this.setState({agence: item}))}>
            {this
              .state
              .agences
              .map((x) => {
                return <Picker.Item label={x.nom} value={x.id}/>
              })
            }
          </Picker>
        </Item>

        <Item floatingLabel style={{marginTop : 25 }}>
          <Label style={{marginLeft : 10 }} >
            Description :
          </Label>
          <Input onChangeText={(description) => this.setState({description})} />
        </Item>
        <AirbnbRating
          style={{marginBottom : 25 }}
          count={5}
          reviews={["Terrible", "Bad", "OK", "Good", "Amazing"]}
          defaultRating={3}
          onFinishRating={(val) => this.setState({rating: val})}
          size={30}/>

        <Button rounded primary style={styles.center} onPress={this.setFeedback}>
          <Text style={styles.mybutton}> Valider</Text>
        </Button>
      </View>
    )
  }
}
/********************************  END Reservation List Tab *************************************/