import React from 'react';
import { Text, StyleSheet, View} from 'react-native';

export const List = props => (
    <View style={{ flex: 1 }}><Text style={[styles.detailsTable, { fontWeight: 'bold' }]}>{props.text}</Text></View>
)

export const List2 = props => (
    <View style={{ flex: 1 }}><Text style={styles.detailsTable}>{props.characterData.characters[props.characterID].units[props.statNumber]}</Text></View>
)


const styles = StyleSheet.create({
    filterButtons: {
        textAlign: 'center',
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold'
    },
    filterTitle: {
        textAlign: 'center',
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'black',
    },
    twoByTwoText: {
        backgroundColor: '#505050',
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        borderWidth: 0.3,
        marginBottom: -0.5
    },
    buttonPressed: {
        backgroundColor: '#B00000',
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        borderWidth: 0.3,
        marginBottom: -0.5
    },
    detailsTable: {
        fontSize: 17,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
    }
})