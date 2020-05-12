import React, {Component, useEffect, useRef} from 'react';
import {
    ActivityIndicator,
    Button,
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    View,
    Dimensions,
    TouchableOpacity, Animated
} from 'react-native';


import {getLogger} from '../core';
import {Consumer} from './AuthContext';
import {Box, usePulse} from "./SignInAnimation";

const log = getLogger('SignIn');

export const SignIn = ({navigation}) => {
    log('render');
    const [username, onChangeUsername] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const scale = usePulse();
    return (
        <Consumer>
            {({onSignIn, signInError, signInInProgress}) => (
                <View style={styles.background}>
                    <Box scale={scale}/>
                    <ActivityIndicator animating={signInInProgress} size="large"/>
                    {signInError && <Text>{signInError.message || 'Sign in error'}</Text>}
                    <TextInput
                        style={styles.textInput}
                        placeholder="Username..."
                        onChangeText={text => onChangeUsername(text)}
                        value={username}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Password..."
                        onChangeText={text => onChangePassword(text)}
                        secureTextEntry={true}
                        value={password}
                    />
                    <TouchableOpacity style={styles.button} onPress={() => {
                        onSignIn(username, password)
                            .then(() => navigation.navigate('Screens'))
                    }}>
                        <Text>LOGIN</Text>
                    </TouchableOpacity>

                </View>
            )}
        </Consumer>
    );
};

SignIn.navigationOptions = () => ({
    headerTitle: 'LOGIN',
});

const styles = StyleSheet.create({
    textInput: {
        color: 'white',
        height: 40,
        borderColor: 'white',
        borderWidth: 2,
        marginBottom: 10,
        borderRadius: 50,
        textAlign: 'center',
        fontWeight: 'bold',
        width: 300
    },
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        position: 'absolute',
        top: 0,
        left: 0
    },
    button: {
        display: 'flex',
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        backgroundColor: 'white'
    },
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2ff6e6'
    }

});
