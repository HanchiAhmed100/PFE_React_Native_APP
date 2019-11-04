import React, {Component} from 'react';
import { Text, View ,TouchableOpacity,FlatList,RefreshControl ,ActivityIndicator } from 'react-native';

import Overlay from 'react-native-modal-overlay';


import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';
import CardView from 'react-native-cardview'
import Config from 'react-native-config'
import QRCode from 'react-native-qrcode';
import axios from 'axios';
import moment from "moment";
import 'moment/locale/fr';

var styles = require('../../Styles/styles');


  
/********************************  Reservation List Tab *************************************/
export default class ReservationList extends React.Component {

    constructor(props){
      super(props)
      //const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = ({
        client_id : '',
        isLoading: true,
        refreshing: false,
        alert: false,
        nom:'',
        code : '',
        ResData : [],
        modalVisible : false,
        modalnum : '',
        modalverif : ''
  
      })
      
    }
    async componentDidMount(){  
        await this.getClientid()
        await this.GetReservation()
    }
  
    getClientid = async () =>{
        try {
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

    GetReservation = async () => {

        await axios.get(Config.API_KEY+"/Api/Reservation/getReservation/"+this.state.client_id)
        .then((res) => {
            console.log(JSON.stringify(res.data))
            this.setState({
                isLoading: false,
                ResData : res.data.reservation,
            });
        })
        .catch((error) => {
            this.setState({
                isLoading: false,
            });
            Snackbar.show({
                title: 'Erreur De Resaux internet',
                duration: Snackbar.LENGTH_INDEFINITE,
                action: {
                  title: 'Fermer',
                  color: 'green',
                  onPress: () => {  },
                },
            });
        });

    }
    _onRefresh = () => {
        this.setState({refreshing: true});
        this.GetReservation().then(() => {
            this.setState({refreshing: false});
        });
    }


    
    cardpressed = (num,verif) =>{
        this.setState({modalVisible : true , modalnum : num , modalverif : verif})
    }

    onClose = () => this.setState({ modalVisible: false});


    render(){

        
        let text;
        if(this.state.mobile === 1){
        text = <span>M-{this.state.next}</span>
        }
        else if( this.state.mobile === 2){
        text = <span>L-{this.state.next}</span>
        }
        else{
            text = <span> -- </span>
        }


        const {navigate} = this.props.navigation;
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
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                    data={this.state.ResData}
                    renderItem={({item}) =>  
                    <CardView

                            cardElevation={2}
                            cardMaxElevation={2}
                            padding={20}
                            marginBottom={10}
                            marginRight={5}
                            marginLeft={5}
                            cornerRadius={5}
                            style={{justifyContent:'center',margin:2,backgroundColor:'white'}}>
                            <TouchableOpacity onPress={() => this.cardpressed(item.codeReservation,item.verif)}>
                                <Text style={styles.textViewContainer}>{'Espace : ' + item.nom}</Text>
                                <Text style={styles.textViewContainer}>{'Adresse de l\'espace : ' + item.Adresse}</Text>
                                <Text style={styles.textViewContainer}>{'Numero du ticket : M-' + item.codeReservation}</Text> 
                                <Text style={styles.textViewContainer}>{'Code de verification : ' + item.verif}</Text>                       
                                <Text style={{justifyContent: 'center',color : 'red',fontSize : 16}}> {'Date d\'expiration :  ' + moment(item.dateReservation).format("Do MMMM YYYY")}</Text>
                                <View style={styles.qr} >
                                    <QRCode
                                        value={item.verif}
                                        size={55}
                                        bgColor='black'
                                        fgColor='white'/> 
                                </View>    
                            </TouchableOpacity>
                        </CardView>
                     }
                />

                {/* <Modal
                    isVisible={this.state.modalVisible}  
                >
                    <View style={{ padding: 22 , justifyContent: 'center',borderColor :'rgba(0,0,0,0.1)' }}>

                            <Text>Votre numero est M-{this.state.modalnum}</Text>
                        <QRCode
                            value={this.state.modalverif}
                            size={100}
                            bgColor='black'
                                fgColor='white'
                            /> 

                            <Button rounded primary  onPress={() => this.setState({modalVisible : false})}>
                                <Text style={styles.mybutton}> Valider</Text>
                            </Button>

                    </View>
                </Modal> */}
                <Overlay 
                visible={this.state.modalVisible} 
                onClose={this.onClose} 
                closeOnTouchOutside 
                animationType="zoomIn" 
                containerStyle={{backgroundColor: 'rgba(10, 10, 10, 0.78)'}}  
                childrenWrapperStyle={{backgroundColor: '#eee'}}
                animationDuration={500}>
                    <View >
                        
                        <QRCode
                            value={this.state.modalverif}
                            size={250}
                            bgColor='black'
                            fgColor='white'
                        /> 
                        <Text style={{fontSize : 20 }}>QR code de la reservation M-{this.state.modalnum}</Text>
                    </View>
                </Overlay>
            </View>
        )  
    }


  } 
  
  /********************************  END Create Reservation Tab *************************************/
  