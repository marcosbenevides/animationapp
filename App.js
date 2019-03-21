/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Animated, PanResponder, Dimensions, LayoutAnimation, UIManager } from 'react-native';
import ItemList from './ItemList';

export default class App extends Component {

  titles = new Array(10).fill(null).map((_, i) => `Card #${i}`);
  state = {
    closedIndices: []
  }

  constructor(props) {
    super(props)
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    this.shoudRender = this.shoudRender.bind(this);
  }

  shoudRender(index) {
    return this.state.closedIndices.indexOf(index) === -1;
  }

  _onDismiss = (i) => {

    if ([...new Array(this.titles.length)].slice(i + 1, this.titles.length).some(this.shoudRender)) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    }

    this.setState({
      closedIndices: [...this.state.closedIndices, i]
    })

  }

  render() {
    return (
      <View style={styles.container}>
        {this.titles.map((title, i) => this.shoudRender(i) &&
          <View key={i}>
            <ItemList title={title} onDismiss={() => {
              if ([...new Array(this.titles.length)].slice(i + 1, this.titles.length).some(this.shoudRender)) {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
              }

              this.setState({
                closedIndices: [...this.state.closedIndices, i]
              });
            }} />
            <View style={{ height:1, backgroundColor: 'gray', }} />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inside: {
    elevation: 8, borderWidth: 1, borderColor: 'gray', backgroundColor: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
