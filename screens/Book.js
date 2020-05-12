import React from 'react';
import {Text, View, StyleSheet, TouchableWithoutFeedback} from 'react-native';

import {getLogger, navService} from '../core';
import {Icon} from "react-native-elements";

const log = getLogger('Book');
import {BookContext} from "./BookContext";
export default ({book = {}}) => {
    log('render');
    return (
        <BookContext.Consumer>
            {({onDelete}) => (
                <TouchableWithoutFeedback onPress={() => navService.navigate('BookEdit', {
                    _id: book._id,
                    title: book.title,
                    author: book.author,
                    price: book.price
                })}><View>
                    <Text style={styles.bookTitle}>{book.title}</Text>
                    <Text style={styles.bookAuthor}>{book.author}</Text>
                    <Text style={styles.bookPrice}>{book.price}</Text>
                    <Icon style={{alignItems: 'right'}} name='delete' type='material-community' size={30}
                          onPress={() => onDelete({_id: book._id, title: book.title, author: book.author, price: book.price})}/>
                </View>
                </TouchableWithoutFeedback>
            )}
        </BookContext.Consumer>
    );
};

const styles = StyleSheet.create({
        bookTitle: {
            fontSize: 24,
            fontWeight: 'bold',
            textAlign: 'center',
            paddingTop: 30
        },
        bookAuthor: {
            fontSize: 20,
            textAlign: 'center'
        },
        bookPrice: {
            fontSize: 16,
            textAlign: 'center'
        },
        icon: {
            flexDirection: 'row'
        }
    }
);



