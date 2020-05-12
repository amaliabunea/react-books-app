import React, {useCallback, useContext, useEffect} from 'react';
import {BookContext} from './BookContext';
import {getLogger, httpDelete, httpGet, httpPost, httpPut, setToken} from '../core';
import {AuthContext} from '../auth/AuthContext';
import NetInfo from '@react-native-community/netinfo';
import {AsyncStorage} from 'react-native';

const log = getLogger('BookStore');

const initialState = {
    isLoading: false,
    books: null,
    loadingError: null,
};

export const BookStore = ({children}) => {
    const [state, setState] = React.useState(initialState);
    const {isLoading, books, loadingError} = state;
    const {token} = useContext(AuthContext);

    const unsubscribe = NetInfo.addEventListener(state => {
        console.log('Connection type', state.type);
        console.log('Is connected?', state.isConnected);
    });

    useEffect(() => {
        if (token && !books && !loadingError && !isLoading) {
            log('load books started');
            setState({isLoading: true, loadingError: null});
            let loaded = false;
            NetInfo.fetch().then(state => {
                console.log('Is connected?', state.isConnected);
                if (!state.isConnected) {
                    getBooks()
                        .then(p => {
                            setState({isLoading: false, loadingError, books: p});
                            loaded = true;
                        })
                }
            });
            if (!loaded) {
                // getBooks()
                //     .then(p=>{
                //         log('load books from local storage succeeded');
                //         setState({isLoading: false, books: p});
                //     })
                //     .catch(loadingError=> {
                //         log('load books from local storage failed');
                //         httpGet('api/books')
                //             .then(json => {
                //                 log('load books succeeded');
                //                 setState({isLoading: false, books: json});
                //             })
                //             .catch(loadingError => {
                //                 log('load books failed');
                //                 setState({isLoading: false, loadingError});
                //             })
                //     })
                httpGet('api/books')
                    .then(json => {
                        log('load books succeeded');
                        setState({isLoading: false, books: json});
                    })
                    .catch(loadingError => {
                        log('load books failed');
                        getBooks()
                            .then(p => {
                                setState({isLoading: false, loadingError, books: p})
                            })
                    });
            }
        }


    }, [token]);

    const onSubmit = useCallback(async (text) => {
        log('post book started');
        console.log(text);
        return httpPost('api/books', text)
            .then(json => {
                log('post book succeeded');
                const newBooks = books.concat(json);
                saveBooks(newBooks)
                    .then(() => {
                        setState({books: newBooks});
                    });
                return Promise.resolve(json);
            })
            .catch(error => {
                log('post book failed');
                return Promise.reject(error);
            });
    });

    const onDelete = useCallback(async (text) => {
        log('delete book started');
        console.log(text);
        httpDelete(`api/books/${text._id}`)
            .then(value => {
                log('delete book succeeded');
                const newBooks = books.filter(book => book._id !== text._id)
                saveBooks(newBooks)
                    .then(() => {
                        setState({
                            books: newBooks
                        });
                    })

            })
            .catch(error => {
                console.log(error);
                log('delete book failed');
            });
    });


    const onSubmitUpdate = useCallback(async (text) => {
        log('put book started');
        return httpPut(`api/books/${text._id}`, text)
            .then(json => {
                log('put book succeeded');
                const newBooks = books.map(book => {
                    if (book._id === text._id) return json;
                    else return book;
                });
                saveBooks(newBooks)
                    .then(() => {
                        setState({
                            books: newBooks
                        });
                    });
            })
            .catch(error => {
                log('put book failed');
                return Promise.reject(error);
            });
    });
    const saveBooks = async (books) => {
        try {
            await AsyncStorage.setItem('books', JSON.stringify(books));
        } catch (error) {
            log('save into local storage failed ...')
        }
    };

    const getBooks = async () => {
        try {
            const value = await AsyncStorage.getItem('books');
            if (value !== null) {
                return JSON.parse(value);
            }
        } catch (error) {
            log('get books from local storage failed ...')
        }
    };
    log('render', isLoading);
    const value = {...state, onSubmit, onSubmitUpdate, onDelete};
    return (
        <BookContext.Provider value={value}>
            {children}
        </BookContext.Provider>
    );
};

