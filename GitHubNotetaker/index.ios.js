/* @flow */

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

var React = require('react-native');
var Main = require('./App/Components/Main');


'use strict';
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  },
});

class GitHubNotetaker extends React.Component {
  render() {
    return (
      <NavigatorIOS
      style={styles.container}
      initialRoute={{
        title:'GitHub Notetaker',
        component: Main
      }} />
    );
  }
};


AppRegistry.registerComponent('GitHubNotetaker', () => GitHubNotetaker);
