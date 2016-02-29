/* @flow */
var React = require('react-native');
var api = require('../Utils/api');
var Separator = require('./Helpers/Separator');
var Badge = require('./Badge');

var {
  View,
  Text,
  ListView,
  TextInput,
  StyleSheet,
  TouchableHighlight
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  buttonText: {
    fontSize: 18,
    color: 'white'
  },
  button: {
    height: 60,
    backgroundColor: '#48BBEC',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchInput: {
    height: 60,
    padding: 10,
    fontSize: 18,
    color: '#111',
    flex: 10
  },
  rowContainer: {
    padding: 10,
  },
  footerContainer: {
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    flexDirection: 'row'
  }
});

class Notes extends React.Component {
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.notes),
      note: '',
      error: ''
    }
  }
  handleChange(e){
    // takes in e(event). Keeps our notes property up to date
    this.setState({
      note: e.nativeEvent.text
    });
  }
  handleSubmit(){
    // take our note property from handleChange and throw it up to firebaseio
    var note = this.state.note;
    this.setState({
      note: ''
    })
    api.addNote(this.props.userInfo.login, note)
    .then((data) => {
      api.getNotes(this.props.userInfo.login)
        .then((data) => {
          this.setState({
            dataSource: this.ds.cloneWithRows(data)
          })
        })
    }).catch((err) => {
      console.log('Request failed', err);
      this.setState({error})
    });
  }
  renderRow(rowData){
    // UI for every data in our list
    return (
      <View>
        <View style={styles.rowContainer}>
          <Text> {rowData} </Text>
        </View>
        <Separator />
      </View>
    )
  }
  footer(){
    return(
      // React allows you to have some function that returns just a UI and you can invoke it
      <View style={styles.footContainer}>
        <TextInput
        style={styles.searchInput}
        value={this.state.note}
        onChange={this.handleChange.bind(this)}
        placeholder="New Note" />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="#88D4F5">
            <Text style={styles.buttonText}> Submit </Text>
        </TouchableHighlight>
      </View>
    )
  }
  render(){
    return (
    // below is for UI. renderHeader takes in a function. whatever you return will be the header of this listView
    <View style={styles.container}>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        renderHeader={() => <Badge userInfo={this.props.userInfo}/> }/>
      {this.footer()}
    </View>
    )
  }
};

Notes.propTypes = {
  // Notes expecting to receive userInfo and notes
  userInfo: React.PropTypes.object.isRequired,
  notes: React.PropTypes.object.isRequired
}

module.exports = Notes;
