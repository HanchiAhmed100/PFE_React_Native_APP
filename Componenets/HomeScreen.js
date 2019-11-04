import React, {Component} from 'react';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { Image ,StyleSheet, Text, View , TextInput ,Alert , ToastAndroid , FlatList, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label , Button , Tab, Tabs, TabHeading ,Picker ,List,Icon, ListItem , Left, Body, Right } from 'native-base';
import { createStackNavigator, createAppContainer , StackActions, NavigationActions } from "react-navigation";
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';
import axios from 'axios';

import Config from 'react-native-config'
import ReservationTab from './Tabs/ReservationTab.js'
import ReservationList from './Tabs/ReservationList.js'

// import PushNotification from 'react-native-push-notification';
import PushController from './PushController.js'; //The push controller created earlier


var styles = require('../Styles/styles');

/********************************  Home Screen *************************************/
export default class HomeScreen extends React.Component{
  
    static navigationOptions = {
      header: null,
    }
  
    async componentDidMount(){
      console.log("key : "+ Config.API_KEY)
      await this.retriveData()
      if(this.state.nbr == '0'){
        //this.resetNavigation()
  
      }
    }
  
  
    constructor(props) {
      super(props);
      
      this.state = {
        Nom :'',
        Prenom :'',
        id : '',
        nbr : '0'
      };
    
    }
  
    retriveData = async () => {
      try {
        const Nom = await AsyncStorage.getItem('Nom');
        const Prenom = await AsyncStorage.getItem('Prenom');
        const id = await AsyncStorage.getItem('id');
        if (Nom !== null && Prenom !== null && id !== null ) {
          this.setState({Nom})
          this.setState({Prenom})
          this.setState({id})
        }else{
          this.props.navigation.push('Login')
        }
      } catch (error) {
  
      }
    }
    logout = async () => {
      let keys = ['Nom', 'Prenom', 'id'];
      AsyncStorage.multiRemove(keys, (err) => {
        this.props.navigation.push('Login')
      });
    }


  
  
    render(){
        const {navigate} = this.props.navigation;
        return (
          <Container>
            <Tabs>
                <Tab heading={ <TabHeading><Text style={styles.white}> Reservation </Text></TabHeading>} >
                    <ReservationTab navigation={this.props.navigation} />
                </Tab>
                <Tab heading={ <TabHeading><Icon name="pulse"/></TabHeading>} >
                    <ReservationList navigation={this.props.navigation} />
                </Tab>
                <Tab heading={ <TabHeading><Icon name="apps"/></TabHeading>}>
                  <Content>
                    <List>
                      <ListItem icon onPress={() => navigate('Map')}>
                          <Left>
                              <Button>
                                  <Icon active name="paper" />
                              </Button>
                          </Left>
                          <Body>
                              <Text  style={styles.tablist}>Nos Services</Text>
                          </Body>
                          <Right>
                              <Icon active name="arrow-forward" />
                          </Right>
                      </ListItem>
                      <ListItem icon  onPress={() => navigate('Feedback')}>
                          <Left>
                              <Button>
                                  <Icon active name="star-half" />
                              </Button>
                          </Left>
                          <Body>
                              <Text  style={styles.tablist}>FeedBack</Text>
                          </Body>
                          <Right>
                              <Icon active name="arrow-forward" />
                          </Right>
                      </ListItem>

                      <ListItem icon  onPress={() => navigate('List')}>
                          <Left>
                              <Button>
                                  <Icon active name="star-half" />
                              </Button>
                          </Left>
                          <Body>
                              <Text  style={styles.tablist}> Mes FeedBack</Text>
                          </Body>
                          <Right>
                              <Icon active name="arrow-forward" />
                          </Right>
                      </ListItem>

                      <ListItem icon onPress={this.logout}>
                          <Left>
                              <Button style={{ backgroundColor: "#007AFF" }}>
                                  <Icon active name="wifi" />
                              </Button>
                          </Left>
                          <Body>
                              <Text style={styles.tablist}>Deconnexion</Text>
                          </Body>
                      </ListItem>
                    </List>
                  </Content>
              </Tab>
            </Tabs>
          </Container>
        );
    }
  }
  
  /******************************** End Home Screen *************************************/
  