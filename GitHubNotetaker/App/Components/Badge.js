/* @flow */

var React = require('react-native');

var {
  Text,
  View,
  Image,
  StyleSheet
} = React;

 var styles = StyleSheet.create({
   container: {
     backgroundColor: '#48BBEC',
     paddingBottom: 10
   },
   name: {
     alignSelf: 'center',
     fontSize: 21,
     marginTop: 10,
     marginBottom: 5,
     color: 'white'
   },
   handle: {
     alignSelf: 'center',
     fontSize: 16,
     color: 'white'
   },
   image: {
     height: 125,
     width: 125,
     borderRadius: 65,
     marginTop: 10,
     alignSelf: 'center'
   }
 });
// Pure components. Components that don't have a state but will take data from parent component.
 class Badge extends React.Component{
   render(){
     return (
       // This component is reliant on this userInfo object. If we don't pass it, then it will break. we need badge.propTypes
       <View style={styles.container}>
          <Image style={styles.image} source={{uri: this.props.userInfo.avatar_url}} />
          <Text style={styles.name}> {this.props.userInfo.name} </Text>
       </View>
     )
   }
 };

// verify that certain properties are there and are of certain types. If we don't pass in userInfo object, it will throw an error
 Badge.propTypes = {
   userInfo: React.PropTypes.object.isRequired
 }

 module.exports = Badge;
