import React, {Component} from 'react';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { Image ,StyleSheet, Text, View , TextInput ,Alert , ToastAndroid , ListView, TouchableOpacity,RefreshControl ,ActivityIndicator } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label , Button , Tab, Tabs, TabHeading ,Picker ,List, ListItem, Icon } from 'native-base';
import { createStackNavigator, createAppContainer , StackActions, NavigationActions } from "react-navigation";

import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';
import CardView from 'react-native-cardview'
import QRCode from 'react-native-qrcode';
import axios from 'axios';
import Config from 'react-native-config'
var styles = require('../Styles/styles');

export default class ResDetailsScreen extends React.Component{

    constructor(props){
        super(props)
        this.state = ({
            ResId : '',
            reservation : [],
            isLoading : true
        })
    }
    componentDidMount(){
      const { navigation } = this.props;
      const ResId = navigation.getParam('ResId', 'NO-ID');
      this.setState({
        ResId : ResId
      })
      axios.get(Config.API_KEY+'/Api/R/getOneReservation/'+ResId)
      .then(res => {
        this.setState({
          reservation : res.data.reservation,
          isLoading : false
        })

        console.log("hhahaha :"+JSON.stringify(this.state.reservation))
      })
      .catch(err => {

      })
    }

    render(){
      if (this.state.isLoading) {
        return (
            <View style={{flex: 1,justifyContent: 'center'}}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
      }
        return(
          <View>
          <CardView
                            
              cardElevation={2}
              cardMaxElevation={2}
              padding={20}
              marginBottom={10}
              marginRight={5}
              marginLeft={5}
              cornerRadius={5}>
              <Text style={styles.textViewContainer}>{'Agence : ' + this.state.reservation[0].nom}</Text>
              <Text style={styles.textViewContainer}>{'Date : ' + this.state.reservation[0].dateReservation + ' à '+this.state.reservation[0].heurs} </Text>
              <Text style={styles.textViewContainer}>{'Code Reservation : ' + this.state.reservation[0].codeReservation}</Text> 

              <QRCode
                value={this.state.reservation.codeReservation}
                size={200}
                bgColor='black'
                fgColor='white'/>
            </CardView>
          </View>
        )
    }
}