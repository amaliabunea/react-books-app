import {Popup, showLocation} from "react-native-map-link";
import React from "react";
import {View, StyleSheet} from "react-native";

const options = {
    latitude: 46.767254,
    longitude: 23.584840,
    title: 'Biblioteca Centrala Universitara Lucian Blaga',
    dialogMessage: 'Choose one app...'
};
const initialState = {
    isVisible: true
};

export const MapsIntent = () => {
    const [state, setState] = React.useState(initialState);
    const {isVisible} = state;
    return (
        <View style={styles.container}>
            <Popup
                isVisible={isVisible}
                onCancelPressed={() => setState({isVisible: false})}
                onAppPressed={() => setState({isVisible: false})}
                onBackButtonPressed={() => setState({isVisible: false})}
                options={options}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
});

