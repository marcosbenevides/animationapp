import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Animated, PanResponder, Dimensions, LayoutAnimation, UIManager } from 'react-native';

export default class ItemList extends Component {
    position = new Animated.Value(0);

    panResponder = PanResponder.create({
        onMoveShouldSetResponderCapture: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderMove: Animated.event([null, { dx: this.position }]),
        onPanResponderRelease: (e, { vx, dx }) => {
            const screenWidth = Dimensions.get("window").width;
            if (Math.abs(vx) >= 0.5 || Math.abs(dx) >= 0.5 * screenWidth) {
                Animated.timing(this.position, {
                    toValue: dx > 0 ? screenWidth : -screenWidth,
                    duration: 200,
                    useNativeDriver: true
                }).start(this.props.onDismiss);
            } else {
                Animated.spring(this.position, {
                    toValue: 0,
                    bounciness: 10,
                    useNativeDriver: true
                }).start();
            }
        }
    });

    render() {
        return (
            <Animated.View
                style={[styles.inside, { transform: [{ translateX: this.position }] }]} {...this.panResponder.panHandlers}>
                <Text style={styles.welcome}>{this.props.title}</Text>
            </Animated.View>
        );
    }
}
const styles = StyleSheet.create({
    inside: {
        backgroundColor: 'white',
        padding: 16,
        width: Dimensions.get('window').width - 32
    },
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
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