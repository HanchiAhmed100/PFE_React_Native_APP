import React, {Component} from 'react';
import Ic from 'react-native-vector-icons/FontAwesome';
import { Image ,StyleSheet, Text, View , TextInput ,Alert ,FlatList, ToastAndroid , ListView, TouchableOpacity,RefreshControl ,ActivityIndicator } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label , Button , Tab,SwipeRow ,Tabs, TabHeading ,Picker ,List, ListItem, Icon } from 'native-base';

import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';
import Config from 'react-native-config'

import axios from 'axios';
var styles = require('../Styles/styles');


export default class AgencesListScreen extends React.Component{

    constructor(props){
        super(props)
        this.state = ({
            ResId : '',
            agences : [],
            isLoading : true
        })
    }
    componentDidMount(){
        axios.get(Config.API_KEY+'/Api/Client/agences')
        .then(res => {
  
            this.setState({
                agences : res.data.Agences,
                isLoading : false
            })
            console.log("age : "+JSON.stringify(this.state.agences))
        })
        .catch(err => {
          console.log("age err :" ,err)
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
            <FlatList
                data={this.state.agences}
                renderItem={({ item }) => <SwipeRow
                leftOpenValue={75}
                    left={
                        <Button success onPress={() => alert(item.nom)} >
                        <Icon active name="add" />
                        </Button>
                    }
                    body={
                        <View>
                        <Text style={{ paddingLeft: 20 }}>    <Ic active name="arrow-right" /> {item.nom}</Text>
                        </View>
                    }

                />}
            />
          </View>
        )
    }
}