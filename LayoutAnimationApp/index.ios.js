
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  LayoutAnimation,
  TouchableWithoutFeedback
} from 'react-native';

class LayoutAnimationApp extends Component {
  // look up constructor, super, state, viewStyle
  // constructor sets up an instance or "pre-requisites" to make an instance
  // super is used to reference the base class's constructors and methods (everything in a car, in a firetruck. firetruck has extra stuff than a car, but base is a car)
  // state is defining the pre-requisites
  constructor(){
    super();
    this.state={
      txt: 'Small',
      viewStyle: {
        height: 250
      }
    }
  }

  animateView(){
    let callback = this.onViewLayout.bind(this)
    // look up layoutAnimation
    // first paramater passed to layoutAnimation is config parameter.
    // 2nd parameter is success function (on the success function)
    // layoutAnimation - automatically animates views ot their new position when the next layout happens
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring, callback())
    // updating the state
    this.setState({
      viewStyle: {
        height: this.state.viewStyle.height > 250 ? 250 : 450
      }
    })
  }

  onViewLayout(){
    // change the state of the inner text of text element
    this.setState({txt: this.state.viewStyle.height > 250 ? 'Small' : 'BIG'})
  }

  render() {
    let viewStyle = [styles.view, this.state.viewStyle]
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.animateView.bind(this)}>
          <View style={viewStyle}>
            <Text style={styles.viewText}>{this.state.txt}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3b5998',
    margin: 20
  },
  viewText: {
    color: 'white'
  }
});

AppRegistry.registerComponent('LayoutAnimationApp', () => LayoutAnimationApp);
