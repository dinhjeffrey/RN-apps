/* @flow */

var React = require('react-native');
var Main = require('./App/Components/Main');


var {
  AppRegistry,
  StyleSheet,
  Text,
  NavigatorIOS,
  View,
} = React;

var styles = StyleSheet.create({
  container:{
    flex: 1,
  },
});

class Bieber extends React.Component{
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Bieber',
          component: Main
        }} />
    );
  }
};


AppRegistry.registerComponent('Bieber', () => Bieber);
