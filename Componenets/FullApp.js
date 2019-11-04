

/******************************** Styles *************************************/
const styles = StyleSheet.create({
    mytitle: {
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 30,
    },
    red: {
      color: 'red',
    },
    mycontainer :{
      padding : 0
    },
    iconmargin : {
      fontSize : 20,
      paddingRight : 10
    },
    space : {
      marginTop : 25,
      textAlign :'center' ,
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
    register : {
      textAlign :'center' ,
      color : 'black',
      fontSize: 18
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
  });
  /******************************** End Styles *************************************/
  
  
  /******************************** Login Screen Class *************************************/
  
  class LoginScreen extends React.Component {
  
    constructor(props) {
      super(props);
  
      this.state = { 
        username : '',
        password : '',
        error : '',
  
        Nom : '',
        Prenom :'',
        id : ''
  
      };
    }
  
    componentDidMount(){
      this.checkforlocalstorage()
    }
  
    checkforlocalstorage = async ()=>{
      try {
        const Nom = await AsyncStorage.getItem('Nom');
        const Prenom = await AsyncStorage.getItem('Prenom');
        const id = await AsyncStorage.getItem('id');
        if (Nom !== null && Prenom !== null && id !== null ) {
          this.props.navigation.push('Home')
        }
      } catch (error) {
        // Error retrieving data
      } 
    }
  
  
    
    loginfunction = async () =>{
  
      //this.refs.myusername.clear()
      //this.refs.mypassword.clear()
  
      this.setState({'username' : ''})
      axios.post("http://192.168.43.224:3000/v1/Api/Auth/cliLogin",{
        email : this.state.username,
        password : this.state.password,
      }).then((response) =>{
        if(response.data.failed){
          console.log("erreur : "+response.data.failed)
        }
        if(response.data.Client){
  
  
          this.setState({'Nom' : response.data.Client.Nom})
          this.setState({'Prenom' : response.data.Client.Prenom})
          this.setState({'id' : response.data.Client.id})
          this.SaveLogger()
        }
      })
      .catch(function (error) {
        Snackbar.show({
          title: 'Erreur Resaux internet',
          duration: Snackbar.LENGTH_INDEFINITE,
          action: {
            title: 'Fermer',
            color: 'green',
            onPress: () => { /* Do something. */ },
          },
        });
      });
    } 
  
    SaveLogger = async ()=>{
      try {
          
        await AsyncStorage.setItem('Nom',this.state.Nom);
        await AsyncStorage.setItem('Prenom',this.state.Prenom);
        await AsyncStorage.setItem('id',this.state.id+"");
      
                 
      
        this.props.navigation.push('Home')
      
      } catch (error) {
        console.log(error)
        Snackbar.show({
          title: 'Erreur Local Storage',
          duration: Snackbar.LENGTH_INDEFINITE,
          action: {
            title: 'Fermer',
            color: 'green',
            onPress: () => { /* Do something. */ },
          },
        });
      
      }
    }
    
  
  
  
    static navigationOptions = {
      header: null,
    }
  
    render() {
      const {navigate} = this.props.navigation;
      return(
         <Container>
          <Content style={styles.mycontainer}>
            <Form>
              
              <Item floatingLabel>
                <Label>
                  <Icon style={styles.iconmargin}  name='user' />
                  Username
                </Label>
                <Input onChangeText={(username) => this.setState({username})} ref="myusername"/>
              </Item>
              
  
            
              <Item floatingLabel >
                <Label>
                  <Icon style={styles.iconmargin} name='lock' />
                  Password
                </Label>
                <Input onChangeText={(password) => this.setState({password})} ref="mypassword" />
              </Item>
            
              <Text>{this.state.error} </Text>
              
              <Button rounded primary submitAndClear style={styles.center} onPress={ this.loginfunction} >
                <Text style={styles.mybutton}> 
                  valider
                </Text>
              </Button>
              
              <Text style={styles.space}>Or</Text>
            
              <Text onPress={() => navigate('Register')} style={styles.register} >Register now </Text>
              <Text>{this.state.username}</Text>
            </Form>
          </Content>
        </Container>
      );
    }
  }
  /******************************** End Login Screen *************************************/
  
  
  /********************************  Register Screen *************************************/
  
  class RegisterScreen extends React.Component {
    static navigationOptions = {
      header: null,
    }
  
    constructor(props){
      super(props)
      this.state = {
        nom : '',
        prenom : '',
        mail :'',
        password : '',
        selecteditem : 'Bizerte',
        adresse : 'hhhh',
        error : '',
        
  
      }
    }
    SignupFunction = () =>{
      
      if(this.state.nom == ""  || this.state.prenom == "" ){
      
        this.setState({error : 'les champs sont obligatoire ! '})
        console.log(this.state.error)
      
      }else{
      
        axios.post("http://192.168.43.224:3000/v1/Api/Auth/cliRegister",{
          nom : this.state.nom ,
          prenom : this.state.prenom ,
          email : this.state.mail,
          password : this.state.password,
          region : this.state.selecteditem,
          adresse : this.state.adresse
      
        }).then((response)=>{
      
          this.setState({name : ''})
          ToastAndroid.show('User created', ToastAndroid.SHORT);
          console.log("then  : "+ JSON.stringify(response));
          this.props.navigation.pop()
      
        })
        .catch((error)=> {
          Snackbar.show({
            title: 'Erreur Resaux internet',
            duration: Snackbar.LENGTH_INDEFINITE,
            action: {
              title: 'Fermer',
              color: 'green',
              onPress: () => { /* Do something. */ },
            },
          });
      
        });
  
      }
  
  
    
    }
  
    render() {
    const {navigate} = this.props.navigation;
    return (
      <Container >
          <Content style={styles.mycontainer}>
            <Form>
              <Item floatingLabel>
                <Label>
                  Nom
                </Label>
                <Input onChangeText={(nom) => this.setState({nom})} />
              </Item>
              <Item floatingLabel >
                <Label>
                  Prenom
                </Label>
                <Input onChangeText={(prenom) => this.setState({prenom})} />
              </Item>
              <Item floatingLabel>
                <Label>
                  Adresse Mail
                </Label>
                <Input onChangeText={(mail) => this.setState({mail})} />
              </Item>
  
              <Item picker style={styles.shortenpicker}>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: 90 }}
                  placeholder="Votre Region"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.selecteditem}
                  onValueChange={(selecteditem => this.setState({selecteditem}))}
                >
                  <Picker.Item label="Bizerte" value="Bizerte" />
                  <Picker.Item label="Bizerte Nord" value="Bizerte Nord" />
                  <Picker.Item label="Manzel Bourguiba" value="Manzel Bourguiba" />
                  <Picker.Item label="Zarzouna" value="Zarzouna" />
                  <Picker.Item label="Alia" value="Alia" />
                  <Picker.Item label="Ras el Jbal" value="Ras el Jbal" />
                </Picker>
              </Item>
  
  
              <Item floatingLabel last>
                <Label>
                  Mot de passe
                </Label>
                <Input onChangeText={(password) => this.setState({password})} />
              </Item>
            <Text style={styles.space}> </Text>
            <Button rounded primary style={styles.center} 
              onPress={
                this.SignupFunction
              }
              >
              <Text style={styles.mybutton}> Crée
              </Text>
            </Button>
  
            <Text style={styles.space}>Or</Text>
              <Text onPress={() => navigate('Login')} style={styles.register} >Login now </Text>
  
            </Form>
          </Content>
        </Container>
      );
    }
  }
  /********************************  END Register Screen *************************************/
  
  
  /********************************  Home Screen *************************************/
  
  class HomeScreen extends Component{
    
    static navigationOptions = {
      header: null,
    }
  
    componentDidMount(){
      this.retriveData()
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
   
    resetNavigation = () => {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Home' }),
        ],
      });
      this.props.navigation.dispatch(resetAction);
      this.setState({nbr : '1'})
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
  
  
  
    render(){
      return (
        <Container>
          <Tabs>
            <Tab heading={ <TabHeading><Text style={styles.white}> Reservation </Text></TabHeading>} >
              <CreateReservationTab />
            </Tab>
            <Tab heading={ <TabHeading><Icon name="apps" /></TabHeading>}>
              <OptionTab />
            </Tab>
          </Tabs>
        </Container>
      );
    }
  }
   {/* <View>
          <Text>Home Page  {this.state.Nom} -  {this.state.Prenom} - {this.state.id}</Text>
          <Button onPress={this.logoutfunction}>
            <Text>
              Logout
            </Text>
          </Button>
        </View>  */}
  
  
  /******************************** End Home Screen *************************************/
      
  
  
  
  
  /********************************  Create Reservation Tab  *************************************/
  class CreateReservationTab extends React.Component {
  
    constructor(props){
      super(props)
      this.state = ({
        client_id : '',
        time : '',
        agence_id : ''
  
      })
    }
    componentDidMount(){  
      this.getClientid()
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
  
      axios.post('http://192.168.43.224:3000/v1/Api/R/getReservation',{
        client_id : this.state.client_id,
        time : this.state.time,
        agence_id : this.state.agence_id
      }).then((response)=>{
        Alert.alert("Votre code reservation est : "+response.data.num+" \n Estimation du temps restant : "+response.data.estimation)
      }).catch((error)=>{
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
    render(){
      return(
        <View>
          <Item picker style={styles.shortenpicker}>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: 90 }}
              placeholder="Date de Reservation "
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={this.state.time}
              onValueChange={(time => this.setState({time}))}
            >
              <Picker.Item label="aujourd'hui" value="aujourd'hui" />
              <Picker.Item label="demain" value="demain" />
   
            </Picker>
          </Item>
      
          <Item picker style={styles.shortenpicker}>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: 90 }}
              placeholder="Votre Region"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={this.state.agence_id}
              onValueChange={(agence_id => this.setState({agence_id}))}
            >
              <Picker.Item label="TT bizerte" value="6" />
              <Picker.Item label="TT corniche" value="2" />
              <Picker.Item label="TT Manzel Bourguiba" value="3" />
              <Picker.Item label="TT Zarzouna" value="1" />
              <Picker.Item label="TT Tunis" value="4" />
  
            </Picker>
          </Item>
          <Button rounded primary style={styles.center} 
              onPress={
                this.GetReservation
              }
              >
              <Text style={styles.mybutton}> Valider
              </Text>
            </Button>
        </View>
      )
    }
  } 
  
  /********************************  END Create Reservation Tab *************************************/
  
  
  
  
  
  /********************************  Reservation List Tab *************************************/
  class ListReservationTab extends React.Component {
  
    constructor(){
      this.ResList()
    }
    componentDidMount(){
  
    }
    ResList = () =>{
      let url = "http://192.168.43.224:3000/v1/Api/R/getReservation/"
      axios.get(`${url}${id}`)
      .then()
      .catch(e => console.log(e) )
    }
    render(){
      return(
        <View>
          
        </View>
      )
    }
  } 
  /********************************  END Reservation List Tab *************************************/
  
  
  
  /********************************   Option List Tab *************************************/
  class OptionTab extends React.Component {
    static navigationOptions = {
      header: null,
    }
    
    constructor(props){
      super(props)
      this.state = ({
        listelementss: ''
  
      })
    }
    // logout = () =>{
    //   let keys = ['Nom', 'Prenom', 'id'];
    //   AsyncStorage.multiRemove(keys, (err) => {
    //     this.props.navigation.push('Login')
    //   });
    // }
    
    render(){    
      const {navigate} = this.props.navigation;
      return(
        <Container>
          <Content>
  
            <List>
  
              <ListItem>
                  <Text>Nos Agences</Text>
              </ListItem>
  
              <ListItem>
                  <Text>Nos Services</Text>
              </ListItem>
              
                <ListItem onPress={() => navigate('Feedback')}>
                  <Text>FeedBack</Text>
                </ListItem>
  
              <ListItem>
                  <Text>About</Text>
              </ListItem>
              
              <ListItem onPress={this.logout}>
                  <Text>Deconnexion</Text>
              </ListItem>
            
            </List>
  
          </Content>
        </Container>
      )
    }
  } 
  /********************************  END Option List  Tab *************************************/
  
  
  /********************************  FeedbackScreen List Tab *************************************/
  class FeedbackScreen extends React.Component {
    static navigationOptions = {
      header: null,
    }
    
  
    constructor(props){
      super(props)
    }
    componentDidMount(){
  
    }
  
    render(){
      const {navigate} = this.props.navigation;
      return(
        <View>
          <Text>FEEdbaCKKKK</Text>
        </View>
      )
    }
  } 
  /********************************  END Reservation List Tab *************************************/
  
  