import React, { Component } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { getCharacters } from '../Redux/Actions';


class HomePage extends Component {
    state = {
        characterDetStatic: '',
        characterThumbnail: '',
        numberRender: 200
    }

    componentDidMount() {
        this.props.getCharacters() //Reducer to get all the character information from my node express server
        this.setState({
            characterDetStatic: this.props.characterData
        })
    }


    render() {
        let { loginButton1, loginButton2, loginButton3, loginButton4, buttonText, container } = styles
        return (
                <View style={container}>
                    <Text>Add in News Stuff</Text>
                </View>
        );
    }
}

const mapStateToProps = state => ({
    characterData: state.characters.characterData
})

const mapDispatchToProps = dispatch => ({
    getCharacters: () => dispatch(getCharacters()),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);


const styles = StyleSheet.create({
    container: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
