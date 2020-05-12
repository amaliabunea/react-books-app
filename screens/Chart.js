import {BarChart, Grid, XAxis, YAxis} from 'react-native-svg-charts'
import {BookContext} from "./BookContext";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";

const fill = 'rgb(6,90,106)';



export const Chart = () => {
    return (
        <BookContext.Consumer>
            {({books}) => (
                <View style={styles.background}>
                    {books &&
                    <BarChart
                        style={{height: 400}}
                        data={books.map(book=>Number.parseFloat(book.price))}
                        svg={{fill}}
                        contentInset={{top: 30, bottom: 30}}>
                    </BarChart>
                    }
                    <XAxis
                        data={books.map(book=>Number.parseFloat(book.price))}
                        formatLabel={(value, index) => books.map(book=>book.title)[index]}
                        contentInset={{ left: 30, right: 30 }}
                    />
                    <XAxis
                        data={books.map(book=>Number.parseFloat(book.price))}
                        formatLabel={(value, index) => books.map(book=>Number.parseFloat(book.price))[index]}
                        contentInset={{ left: 30, right: 30 }}
                    />
                </View>
            )}
        </BookContext.Consumer>
    );

};

Chart.navigationOptions = () => ({
    headerTitle: 'Chart',
});
const styles = StyleSheet.create({
    background: {
        backgroundColor: '#2ff6e6'
    }
});
