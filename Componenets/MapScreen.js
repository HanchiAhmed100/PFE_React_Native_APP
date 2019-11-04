import React, {Component} from 'react';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { View ,ActivityIndicator } from 'react-native';
import moment from "moment";
import 'moment/locale/fr';
import Config from 'react-native-config'
import MapView ,  { PROVIDER_GOOGLE , Marker } from 'react-native-maps'


var styles = require('../Styles/styles');

/********************************  Home Screen *************************************/
export default class MapScreen extends React.Component{
    
    static navigationOptions = {
        header: null,
    }
    


    constructor(props){
        super(props)
        this.state = ({
            isLoading : true,
            userLocation : null
        })

    }
    async componentDidMount(){
        moment.locale('fr');
        navigator.geolocation.getCurrentPosition(position=>{
            this.setState({isLoading : false})
            this.setState({
                userLocation : {
                    latitude : position.coords.latitude,
                    longitude : position.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }
            })
            console.log("posis : "+JSON.stringify(position))
        },err => console.log(err))

    }

   

  
    render(){
        if (this.state.isLoading) {
            return (
              <View style={{flex: 1,justifyContent: 'center'}}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            );
        }
        return (
          <View style={styles.mapcontianer}>
                <MapView 
                    style={ styles.map}  
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: 37.124651,
                        longitude: 9.8613321,
                        latitudeDelta: 0.5522,
                        longitudeDelta: 0.3321,
                    }} 
                    region={this.state.userLocation} 
                    >
                    <Marker
                        coordinate={this.state.userLocation}
                        title="position"
                        />
                    </MapView>
          </View>
        );
    }
  }
  
  /******************************** End Home Screen *************************************/
  