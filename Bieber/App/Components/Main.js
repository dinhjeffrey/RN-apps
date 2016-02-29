var React = require('react-native');
var Empty = require('./Empty');

var {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image
} = React;

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#3B5998'
  },
  font: {
    alignSelf: 'center',
    fontSize: 25,
    color: 'white'
  },
  button: {
    backgroundColor: '#3B5998',

  },
  backgroundImage: {
    height: 500,
    width: 500,
    alignSelf: 'center',
   }

});

class Main extends React.Component{
  handleSubmit(){
    this.props.navigator.push({
      component: Empty,
    });
  }
  render() {
    return(
      <View style={styles.mainContainer}>
        <Image
          source={require('image!bieber')}
          resizeMode={Image.resizeMode.contain}
          style={styles.backgroundImage}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor='orange'>
          <Text style={styles.font}>Hii</Text>
        </TouchableHighlight>
      </View>
      )
  }
};

module.exports = Main;
