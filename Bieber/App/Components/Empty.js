var React = require('react-native');

var {
  View,
  Text,
  StyleSheet,
  
} = React;

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#3B5998'
  },
  center: {
    textAlign: 'center',
    fontSize: 25,
    color: 'white'
  },
  button: {

  }
});

class Empty extends React.Component{
  render() {
    return(
      <View style={styles.mainContainer}>
        <Text style={styles.center}> Byee </Text>
      </View>
      )
  }
};

module.exports = Empty;
