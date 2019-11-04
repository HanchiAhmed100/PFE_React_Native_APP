import React, {Component} from 'react';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, View ,ActivityIndicator } from 'react-native';
import { Container } from 'native-base';
import Config from 'react-native-config'
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';
import axios from 'axios';
import CardView from 'react-native-cardview'
import moment from "moment";
import 'moment/locale/fr';

var styles = require('../Styles/styles');

/********************************  Home Screen *************************************/
export default class ListFeedbackScreen extends React.Component{
  


    constructor(props){
        super(props)
        this.state = ({
            isLoading : true,
            client_id : '',
            feedback : []

        })
        this.componentDidMount()
    }
    async componentDidMount(){
        await this.getClientid()
        await this.LoadDataList()
        moment.locale('fr');
    }
    static navigationOptions = {
        title : "Mes Feedback"
      }
    

    getClientid = async () =>{
        try {
            console.log("hi")
            const id = await AsyncStorage.getItem('id');
            if ( id !== null ) {
                this.setState({client_id : id})
                console.log("id : "+this.state.client_id)
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

    LoadDataList = async () => {
        await axios.get(Config.API_KEY+'/Api/Client/'+this.state.client_id+'/FeedBack')
        .then(res => {
            this.setState({
                isLoading : false,
                feedback : res.data.Feedback
            })
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }
  

  
    render(){
        const {navigate} = this.props.navigation;
        if (this.state.isLoading) {
            return (
              <View style={{flex: 1,justifyContent: 'center'}}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            );
        }
        return (
          <Container>

              {
                this.state.feedback.map( (v,k)=>{
                return <CardView
                                cardElevation={2}
                                cardMaxElevation={2}
                                padding={20}
                                marginBottom={10}
                                marginRight={5}
                                marginLeft={5}
                                cornerRadius={5}
                                style={{justifyContent:'center',margin:2,backgroundColor:'white'}}>
                                    <Text style={styles.textViewContainer}>{'Nom de l\'espace  : ' + v.nom}</Text>                                    
                                    <Text style={styles.textViewContainer}>{'Note  : ' + v.nbStartRating}</Text>
                                    <Text style={styles.textViewContainer}>{'Description : ' + v.description}</Text>
                                    <Text style={styles.textViewContainer}>{'Date : ' + moment(v.dateFeedback).locale('fr').format('LLLL') } </Text>
                            </CardView>
                })
              }
          </Container>
        );
    }
  }
  
  /******************************** End Home Screen *************************************/
  