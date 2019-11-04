'use strict';

var React = require('react-native');

var styles = React.StyleSheet.create({
    mytitle: {
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 30,
    },
    red: {
      color: 'red',
    },
    mycontainer :{
      paddingTop : 50,
      paddingRight :15,
      paddingLeft : 15,

    },
    qr:{ 
      marginLeft : 250,
      marginTop : -55
    },
    iconmargin : {
      fontSize : 20,
      paddingRight : 10
    },
    space : {
      marginTop : 25,
      textAlign :'center' ,
    },
    
    skew : {
      backgroundColor : 'rgba(77, 104, 188,1)',
      height : 35,
      paddingTop : 50,
      marginTop :50,
      width : 200,
      borderTopRightRadius : 1000,

    },

    mybutton : {
      textAlign :'center' ,
      color : 'white',
      width : 100 ,
      padding : 10,
      margin :10
    },
    center : {
      marginLeft: 120 ,
    },
    registers : {
      position : 'absolute',
      top : 10,
      left :10,
      padding : 20,
      borderRadius : 500,
      width :60,
      height : 60,
    },
    register : {
      textAlign :'center' ,
      color : 'black',
      fontSize: 18
    },
    inputs : {
      borderBottomWidth : 1,
      borderColor: 'blue',
    },
    shortenpicker : {
      marginLeft : 5,
    },
    white : {
      color : '#fff'
    },
    container: {
      flex: 1,
      paddingTop: 22
    },
    item: {
       padding: 10,
       fontSize: 18,
       height: 44,
    },
    textViewContainer: {
        fontSize: 15,
        color: '#000',
    },
    mapcontianer : {
      width : '100%',
      height : '100%'
    },
    map : {
      width : '100%',
      height : '100%'

    }
  });


module.exports = styles;