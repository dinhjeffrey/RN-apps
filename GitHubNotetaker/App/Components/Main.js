/* @flow */

// Initial Component that gets rendered. Includes wrapping.

var React = require('react-native');
var api = require('../Utils/api');
var Dashboard = require('./Dashboard')


var{
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight, // allows to get touch event and do something with that
  ActivityIndicatorIOS // show spinner
} = React;

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});

class Main extends React.Component{
  // research constructor
  constructor(props){
    // research super
    super(props);
    this.state = {
      username: '',
      // toggle spinner
      isLoading: false,
      // alows to show error message if something bad happens
      error: false
    }
  }
  // updates the state whenever someone types into input field. these are called "Methods"
  handleChange(event){
    this.setState({
      // so whenever the user makes a change to the input field, this knows it and updates
      username: event.nativeEvent.text
    })
  }
  handleSubmit(){
    // update our indicatorIOS spinner
    this.setState({
      isLoading: true
    });
    // whenever we invoke getBio, it's gonna return use a promise with the .then response
    api.getBio(this.state.username)
    // res is gonna get an object with all the username properties
    .then((res) => {
      if(res.message === 'Not Found'){
        this.setState({
          error: 'User not found',
          isLoading: false
        })
      } else {
        // from index.ios.js, we've created <NavigatorIOS component>. We're gonna push this new object
        this.props.navigator.push({
          title: res.name || "Select an Option",
          component: Dashboard,
          // we're passing it in as a property in the Dashboard component
          passProps: {userInfo: res}
        });
        // after passing state, this clears everything
        this.setState({
          isLoading: false,
          error: false,
          username: ''
        })
      }
    });
    // fetch data from GitHub
    // reroute to the next passing that Github info.
  }
  render() {
    var showErr = (
      // will show if there is an error msg and not if there isn't any
      this.state.error ? <Text> {this.state.error} </Text> : <View></View>
    );
    return(
      <View style={styles.mainContainer}>
      <Text style={styles.title}> Search for a Github User </Text>
      <TextInput
      style={styles.searchInput}
      // the value of this input field is going to be bound to the username in our state
      value={this.state.username}
      // whenever a person makes a change to the input field, we capture the value and update our state. Bind returns us a new function with a 'this' keyword bound with whatever you passed in. When we use the first 'this', it makes the 'this' in handleChange the right 'this' we want. 'This' keyword in handleChange, we want to reference the same 'This' keyword in onChange.
      onChange={this.handleChange.bind(this)} />
      <TouchableHighlight
      style={styles.button}
      // handleSubmit function that runs whenever we click button
      onPress={this.handleSubmit.bind(this)}
      // whenever someone clicks, the button will turn white
      underlayColor="white">
      <Text style={styles.buttonText}> SEARCH </Text>
      </TouchableHighlight>
      <ActivityIndicatorIOS
      // Now it will show if there is an error message and not if there isn't.
      animating={this.state.isLoading}
      color='#111'
      size='large'></ActivityIndicatorIOS>
      {showErr}
      </View>
    )
  }
};

module.exports = Main;
