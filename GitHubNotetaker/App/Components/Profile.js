/* @flow */

var React = require('react-native');
var Badge = require('./Badge');
var Separator = require('./Helpers/Separator');

var {
  Text,
  View,
  StyleSheet,
  // kind of like a view, but can scroll
  ScrollView,
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  rowContainer: {
    padding: 10
  },
  rowTitle: {
    color: '#48BBEC',
    fontSize: 16
  },
  rowContent: {
    fontSize: 19
  }
});

class Profile extends React.Component{
  getRowTitle(user, item){
    // if item === public_repos, then we replace it with.... else ...
    item = (item === 'public_repos') ? item.replace('_', ' ') : item;
    // if first letter is a thing, then take first letter and uppercase it and tag on remaining word.. else return item
    return item[0] ? item[0].toUpperCase() + item.slice(1) : item;
  }
  render(){
    var userInfo = this.props.userInfo;
    // create an array of everything we're interested in viewing
    var topicArr = ['company', 'location', 'followers', 'following', 'email', 'bio', 'public_repos'];
    // map lets you loop through every item in the array and modify it
    var list = topicArr.map((item, index) => {
      if(!userInfo[item]){
        // we use key because react will use key to figure out what changed in the list. each of the values you give to the key has to be unique for React to work
        return <View key={index}/>
      } else {
        return (
          /* everytime we throw out a value, we throw out a separator. a gray line dividing separator */
          <View key={index}>
            <View style={styles.rowContainer}>
              <Text style={styles.rowTitle}> {this.getRowTitle(userInfo, item)} </Text>
              <Text style={styles.rowContent}> {userInfo[item]} </Text>
            </View>
            <Separator />
          </View>
        )
      }
    });
  return(
    /* render list into the screen */
    <ScrollView style={styles.container}>
      <Badge userInfo={this.props.userInfo}/>
      {list}
    </ScrollView>
  )
  }
};

Profile.propType= {
  userInfo: React.PropTypes.object.isRequired
}

module.exports = Profile;
