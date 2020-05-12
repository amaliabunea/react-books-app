import React, {useContext} from 'react';
import {
    ActivityIndicator,
    Button,
    FlatList,
    Text,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import {getLogger, navService} from '../core';
import {BookContext} from './BookContext';
import {AuthContext} from '../auth/AuthContext';
import {Icon} from 'react-native-elements';
import Book from './Book';


const log = getLogger('BookList');

export const BookList = ({navigation}) => {
    log('render');
    const {onSignOut} = useContext(AuthContext);
    return (
        <ScrollView>
            <BookContext.Consumer>
                {({isLoading, loadingError, books}) => (
                    <View style={styles.background}>
                        <ActivityIndicator animating={!!isLoading} size="large"/>
                        {loadingError && <Text>{loadingError.message || 'Loading error'}</Text>}
                        {books &&
                        <FlatList
                            data={books.map(book => ({...book, key: book._id}))}
                            renderItem={({item}) =>
                                <Book book={item}/>}
                        />}
                    </View>
                )}
            </BookContext.Consumer>
            <View style={styles.background2}>
                <TouchableOpacity style={styles.button}
                                  onPress={() => navigation.navigate('Chart')}>
                    <Text>Display chart</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.background2}>
                <TouchableOpacity style={styles.button}
                                  onPress={() => navigation.navigate('MapsIntent')}>
                    <Text>Show coordinates</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.background2}>
                <TouchableOpacity style={styles.button}
                                  onPress={() => onSignOut().then(() => navigation.navigate('Auth'))}>
                    <Text>Log out</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    )
};

BookList.navigationOptions = {
    headerTitle: 'Books',
    headerRight: (
        <Icon name='add-circle-outline' size={40} type='material' onPress={() => navService.navigate('BookEdit')}/>
    ),
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2ff6e6'
    },
    background2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2ff6e6',
        paddingTop: 20,
        paddingBottom: 10
    },
    button: {
        display: 'flex',
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        flex: 1,
        backgroundColor: 'white'
    },
});

