/* @flow */

var React = require('react-native');

var {
  View,
  WebView,
  StyleSheet
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF',
    flexDirection: 'column'
  },
});

class Web extends React.Component{
  render(){
    return (
      // WebView loads a URL that we get from this.props.url inside of the app's view
      // can't have WebView as class since we define it as variable. We only have it once down below.
      <View style={styles.container}>
        <WebView 
        source={{uri: this.props.url}}/>
      </View>
    );
  }
};
// we don't want it to run unless we have a URL
Web.propTypes = {
  url: React.PropTypes.string.isRequired
};


module.exports = Web
