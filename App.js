/******************************** Imports *************************************/ 
import React, {Component} from 'react';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { Image ,StyleSheet, Text, View , TextInput ,Alert , ToastAndroid , FlatList, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label , Button , Tab, Tabs, TabHeading ,Picker ,List, ListItem, Icon } from 'native-base';
import { createStackNavigator, createAppContainer , StackActions, NavigationActions } from "react-navigation";
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';
import axios from 'axios';



import HomeScreen from "./Componenets/HomeScreen.js";
import RegisterScreen from "./Componenets/RegisterScreen.js";
import FeedbackScreen from "./Componenets/FeedbackScreen.js";
import LoginScreen from "./Componenets/LoginScreen.js";
import ListFeedbackScreen from "./Componenets/ListFeedbackScreen.js"
import ResDetailsScreen from "./Componenets/ResDetailsScreen.js"
import AgencesListScreen from "./Componenets/AgencesListScreen.js";
import MapScreen from "./Componenets/MapScreen.js"

/******************************** End Imports *************************************/



/********************************  Navigator Screen *************************************/
const MainNavigator = createStackNavigator({
  Login : {screen: LoginScreen},
  Register: {screen: RegisterScreen},
  Home: {screen: HomeScreen},
  Feedback: {screen: FeedbackScreen},
  List : {screen : ListFeedbackScreen},
  ResDetails : {screen : ResDetailsScreen},
  Agences : {screen: AgencesListScreen},
  Map : {screen: MapScreen},
});

export default createAppContainer(MainNavigator);
