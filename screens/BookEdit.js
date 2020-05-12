import React, {Component} from 'react';
import {View, TextInput, Button, StyleSheet, Text, TouchableOpacity} from 'react-native';

import {getLogger, navService} from '../core';
import {BookContext} from "./BookContext";

const log = getLogger('BookEdit');

export const BookEdit = ({titleValue = '', authorValue = '', priceValue = '', navigation}) => {
    let [title, onChangeTextTitle] = React.useState(titleValue);
    let [author, onChangeTextAuthor] = React.useState(authorValue);
    let [price, onChangeTextPrice] = React.useState(priceValue);

    const titleDefault = navigation.getParam('title', '');
    const authorDefault = navigation.getParam('author', '');
    const priceDefault = navigation.getParam('price', '');
    const _id = navigation.getParam('_id', '');
    if (title === '')
        title = titleDefault;
    if (author === '')
        author = authorDefault;
    if (price === '')
        price = priceDefault;

    const disabledAdd = title === '' || author === '' || price === '';
    const disabledUpdate = titleDefault === '' || authorDefault === '' || priceDefault === '';
    return (
        <BookContext.Consumer>
            {({onSubmit, onSubmitUpdate}) => (
                <View style={styles.background}>
                    <Text style={styles.text}>Title</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => onChangeTextTitle(text)}
                        value={title}
                    />
                    <Text style={styles.text}>Author</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => onChangeTextAuthor(text)}
                        value={author}
                    />
                    <Text style={styles.text}>Price</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => onChangeTextPrice(text)}
                        value={price}
                    />
                    <View style={{paddingBottom: 10}}>
                        <TouchableOpacity style={disabledAdd ? styles.buttonDisabled : styles.button}
                                          onPress={() => {
                                              onSubmit({title, author, price})
                                                  .then(() => navigation.goBack())
                                          }}
                                          disabled={disabledAdd}>
                            <Text>Add</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={disabledUpdate ? styles.buttonDisabled : styles.button}
                                      onPress={() => {
                                          onSubmitUpdate({_id, title, author, price})
                                              .then(() => navigation.goBack())
                                      }}
                                      disabled={disabledUpdate}>
                        <Text>Update</Text>
                    </TouchableOpacity>
                </View>
            )}
        </BookContext.Consumer>
    );

};

BookEdit.navigationOptions = () => ({
    headerTitle: 'Book Edit',
});

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontSize: 24,
        color: 'white',
        fontStyle: 'italic'
    },
    textInput: {
        color: 'black',
        height: 40,
        borderColor: 'black',
        borderWidth: 2,
        marginBottom: 10,
        borderRadius: 50,
        textAlign: 'center',
        fontWeight: 'bold',
        width: 300,
        fontSize: 20
    },
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2ff6e6'
    },
    button: {
        display: 'flex',
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        backgroundColor: 'white'
    },
    buttonDisabled: {
        display: 'flex',
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        backgroundColor: 'white',
        opacity: 0.4
    }
});
