import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet, Modal, TextInput, ScrollView, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { getCharacters, getCaptainMultiplier1, getCaptainMultiplier2, resetCaptain1, resetCaptain2 } from '../Redux/Actions';
import _ from 'lodash'

// import { connect } from 'react-redux';
// import { getDog } from './actions';
// import { loginPageWallpaper } from './images/loginPageWallpaper.jpg';

class TeamCalculator extends Component {
    state = {
        numberRender: 1200,
        filterModal: false,
        searchModal: false,
        search: '',
        characterThumbnail: [],
        characterThumbnailHolder: [],
        arrayNames: [],
        test: [],
        characterID: '',
        slotBox1: false,
        slotBox2: false,
        slotBox3: false,
        slotBox4: false,
        slotBox5: false,
        slotBox6: false,
        slotBoxIndicator: '',
        slotBoxID1: '',
        slotBoxID2: '',
        slotBoxID3: '',
        slotBoxID4: '',
        slotBoxID5: '',
        slotBoxID6: '',
        captain1Multiplier: 1,
        captain2Multiplier: 1
    }


    filterModalHandler = (visible) => {
        this.setState({
            filterModal: visible
        })
    }

    searchModalHandler = (visible) => {
        this.setState({
            searchModal: visible
        })
    }

    componentDidMount() {
        this.props.getCharacters() //getting character details, preferably, not run this again like this (inefficient), hopefully plan to have this load on app start up
        this.getCharacterThumbnails()   //Getting the thumbnails again, preferably on app startup now
        this.props.navigation.setParams({
            filterModal: this.filterModalHandler,
        });
    }

    contains = (name, query) => {
        if (name.includes(query)) {
            return true;
        }
        return false;
    }

    changeImage = (characterID, slotBox) => { //Changing the slot images into the images that I picked
        if (slotBox == 1) { //This box is the captain box, need to run functions to determine the multiplier to the calculator
            let captainOneInfo = {
                unit: {
                    type: this.props.characterData.characters[characterID].units[1],
                    class: this.props.characterData.characters[characterID].units[2],
                }
            }
            this.props.captain1(characterID, captainOneInfo)
            this.setState({
                slotBox1: true,
                slotBoxID1: characterID,
            })
        } else if (slotBox == 2) {
            this.setState({ slotBox2: true, slotBoxID2: characterID })
        } else if (slotBox == 3) {
            this.setState({ slotBox3: true, slotBoxID3: characterID })
        } else if (slotBox == 4) { //This box is the second captain box
            let captainFourInfo = {
                unit: {
                    type: this.props.characterData.characters[characterID].units[1],
                    class: this.props.characterData.characters[characterID].units[2],
                }
            }
            this.props.captain2(characterID, captainFourInfo)
            this.setState({
                slotBox4: true,
                slotBoxID4: characterID,
            })
        } else if (slotBox == 5) {
            this.setState({ slotBox5: true, slotBoxID5: characterID })
        } else if (slotBox == 6) {
            this.setState({ slotBox6: true, slotBoxID6: characterID })
        }
    }

    getCharacterThumbnails = () => { // preferably run this only once on startup, but for now I have it running again, mostly for debugging so I don't have to keep navigating pages just to load the images
        let newCharacterThumbnail = []
        for (let i = 0; i < this.state.numberRender; i++) {
            if (i < 9) {
                newCharacterThumbnail[i] = 'http://onepiece-treasurecruise.com/wp-content/uploads/f000' + (i + 1) + '.png'
            } else if (i < 99 && i >= 9) {
                newCharacterThumbnail[i] = 'http://onepiece-treasurecruise.com/wp-content/uploads/f00' + (i + 1) + '.png'
            } else if (i < 999 && i >= 99) {
                newCharacterThumbnail[i] = 'http://onepiece-treasurecruise.com/wp-content/uploads/f0' + (i + 1) + '.png'
            } else {
                newCharacterThumbnail[i] = 'http://onepiece-treasurecruise.com/wp-content/uploads/f' + (i + 1) + '.png'
            }
        }
        newCharacterThumbnail[573] = 'https://onepiece-treasurecruise.com/wp-content/uploads/f00574.png'
        newCharacterThumbnail[574] = 'https://onepiece-treasurecruise.com/wp-content/uploads/f00575.png'
        this.setState({
            characterThumbnailHolder: newCharacterThumbnail,
        })
    }

    getArrayNames = search => {
        let newArrayNames = []
        for (i = 1; i <= this.state.numberRender; i++) {
            newArrayNames[i - 1] = this.props.characterData.characters[i].units[0].toLowerCase()
        }
        // this.setSearchID()
        this.setState({
            arrayNames: newArrayNames,
            characterThumbnail: []
        },
            () => {
                if (this.state.search == '') {
                    this.setState({
                        characterThumbnail: []
                    })
                } else {
                    const formatSearch = search.toLowerCase()
                    const data = _.filter(this.state.arrayNames, user => {
                        return this.contains(user, formatSearch);
                    });
                    this.setState({
                        test: data
                    },
                        () => {
                            let newArrayIndex = []
                            let searchID = []
                            for (let i = 1; i <= this.state.numberRender; i++) {
                                for (let j = 0; j < this.state.test.length; j++) {
                                    if (this.state.test[j] == this.props.characterData.characters[i].units[0].toLowerCase()) {
                                        newArrayIndex[j] = this.state.characterThumbnailHolder[this.props.characterData.characters[i].id - 1]
                                        searchID[j] = this.props.characterData.characters[i].id
                                    }
                                }
                            }
                            this.setState({
                                characterThumbnail: newArrayIndex,
                                newSearchID: searchID
                            })
                        }
                    )
                }
            }
        )
    }

    render() { //Actual render, be warned, this is a whole lot of messy coding right now ( haven't been able to clean it up yet )
        let { search } = this.state;
        let { addStyle, str, qck, dex, psy, int, modal, modalText } = styles;
        return (
            <View>
                {/* My Filter Modal */}
                <Modal //My Modal which is a stretch goal so I haven't been able to work on it 
                    animationType="slide"
                    transparent={true}
                    visible={this.state.filterModal}
                    onRequestClose={() => {
                        this.filterModalHandler(false);
                    }}
                >
                    <View style={modal}>
                        <View style={modalText}>
                            <TouchableOpacity onPress={() => this.filterModalHandler(false)}>
                                <Text style={{ textAlign: 'right', fontSize: 30, marginRight: 10 }}>x</Text>
                            </TouchableOpacity>
                            <Text>Insert Clickable Ship Image</Text>
                            <Text>Enemy Barrier Count</Text>
                            <Text>Captain Actions</Text>
                            <Text>Friend Captain Actions</Text>
                            <Text>Specials Active</Text>
                        </View>
                    </View>
                </Modal>

                {/* Search Bar Modal */}
                <Modal //Search bar modal, the different between this one and previous one is that this filters on Text Change, basically you have to know who you're looking for
                    animationType="fade"
                    transparent={false}
                    visible={this.state.searchModal}
                    onRequestClose={() => {
                        this.searchModalHandler(false);
                    }}
                >
                    <ScrollView>
                        <View style={{ flexDirection: 'row', backgroundColor: 'white', margin: 10, borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginTop: 60 }}>
                            <TouchableOpacity onPress={() => this.setState({ search: '' })}>
                                <Image source={require('../../assets/xButton.png')} style={{ height: 30, width: 30, marginLeft: 5 }} />
                            </TouchableOpacity>
                            <TextInput //Search Bar input
                                style={{ height: 50, borderColor: 'gray', flex: 1, marginLeft: 10 }}
                                placeholder='Type to Filter'
                                underlineColorAndroid='transparent'
                                clearButtonMode='always'
                                onChangeText={search => { this.setState({ search }, () => { this.getArrayNames(this.state.search) }) }}
                                value={search}
                            />
                            <TouchableOpacity onPress={() => this.getArrayNames(this.state.search)}>
                                <Image source={require('../../assets/search_icon.png')} style={{ height: 40, width: 40 }} />
                            </TouchableOpacity>

                        </View>
                        {/*  */}
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            {this.props.characterData && (<FlatList
                                data={this.state.characterThumbnail}
                                numColumns={7}
                                ListEmptyComponent={<Text style={{ fontSize: 25, textAlign: 'center' }}>Type In The SearchBar</Text>}
                                keyExtractor={(item, index) => index + ''}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity onPress={() =>
                                        this.setState({
                                            searchModal: false,
                                            characterID: this.state.newSearchID[index],
                                        }, () => {
                                            this.changeImage(this.state.characterID, this.state.slotBoxIndicator)
                                        })}>
                                        <Image
                                            source={{ uri: item }}
                                            style={{ width: 51, height: 51 }}
                                        />
                                    </TouchableOpacity>
                                )}
                            />)}
                        </View>
                    </ScrollView>
                </Modal>


                {/* Add Character Image boxes, had to set a value for each one since they were going to show different distinct images with different character stats */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                    {/* Left Side (Choosing Units) */}
                    <View style={{ width: 300, height: 435, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', marginLeft: 80 }}>
                        <TouchableOpacity style={addStyle} onPress={() => this.setState({ slotBoxIndicator: 1, searchModal: true })}>
                            {typeof (this.state.slotBoxID1) == 'number' && this.state.slotBox1 == true //slotBoxIndicator is just the indicator to which one it is currently picking
                                ? <Image
                                    source={{ uri: this.props.characterData.characters[this.state.slotBoxID1].res.thumbnail }}
                                    style={{ width: 110, height: 110 }}
                                />
                                : <Text> Click to Add</Text>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity style={addStyle} onPress={() => this.setState({ slotBoxIndicator: 2, searchModal: true })}>
                            {typeof (this.state.slotBoxID2) == 'number' && this.state.slotBox2 == true
                                ? <Image
                                    source={{ uri: this.props.characterData.characters[this.state.slotBoxID2].res.thumbnail }}
                                    style={{ width: 110, height: 110 }}
                                />
                                : <Text> Click to Add</Text>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity style={addStyle} onPress={() => this.setState({ slotBoxIndicator: 3, searchModal: true })}>
                            {typeof (this.state.slotBoxID3) == 'number' && this.state.slotBox3 == true
                                ? <Image
                                    source={{ uri: this.props.characterData.characters[this.state.slotBoxID3].res.thumbnail }}
                                    style={{ width: 110, height: 110 }}
                                />
                                : <Text> Click to Add</Text>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity style={addStyle} onPress={() => this.setState({ slotBoxIndicator: 4, searchModal: true })}>
                            {typeof (this.state.slotBoxID4) == 'number' && this.state.slotBox4 == true
                                ? <Image
                                    source={{ uri: this.props.characterData.characters[this.state.slotBoxID4].res.thumbnail }}
                                    style={{ width: 110, height: 110 }}
                                />
                                : <Text> Click to Add</Text>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity style={addStyle} onPress={() => this.setState({ slotBoxIndicator: 5, searchModal: true })}>
                            {typeof (this.state.slotBoxID5) == 'number' && this.state.slotBox5 == true
                                ? <Image
                                    source={{ uri: this.props.characterData.characters[this.state.slotBoxID5].res.thumbnail }}
                                    style={{ width: 110, height: 110 }}
                                />
                                : <Text> Click to Add</Text>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity style={addStyle} onPress={() => this.setState({ slotBoxIndicator: 6, searchModal: true })}>
                            {typeof (this.state.slotBoxID6) == 'number' && this.state.slotBox6 == true
                                ? <Image
                                    source={{ uri: this.props.characterData.characters[this.state.slotBoxID6].res.thumbnail }}
                                    style={{ width: 110, height: 110 }}
                                />
                                : <Text> Click to Add</Text>
                            }
                        </TouchableOpacity>
                    </View>
                    {/* Right Side (Showing Damage) */}
                    <View style={{ width: 200, height: 650, alignItems: 'center', justifyContent: 'center', marginRight: 40 }}>
                        <View style={str}>
                            <Text style={{ textAlign: 'center' }}>Damage against STR</Text>
                            <Text style={{ fontSize: 25 }}>{
                                ((typeof (this.state.slotBoxID1) == 'number' && this.props.characterData.characters[this.state.slotBoxID1].units[1] == 'QCK'
                                    ? this.props.characterData.characters[this.state.slotBoxID1].units[13] * 2
                                    : typeof (this.state.slotBoxID1) == 'number' && this.props.characterData.characters[this.state.slotBoxID1].units[1] == 'DEX'
                                        ? this.props.characterData.characters[this.state.slotBoxID1].units[13] / 2
                                        : typeof (this.state.slotBoxID1) == 'number' && this.props.characterData.characters[this.state.slotBoxID1].units[1] != 'DEX' && this.props.characterData.characters[this.state.slotBoxID1].units[1] != 'QCK'
                                            ? this.props.characterData.characters[this.state.slotBoxID1].units[13]
                                            : 0)
                                    + (typeof (this.state.slotBoxID2) == 'number' && this.props.characterData.characters[this.state.slotBoxID2].units[1] == 'QCK'
                                        ? this.props.characterData.characters[this.state.slotBoxID2].units[13] * 2
                                        : typeof (this.state.slotBoxID2) == 'number' && this.props.characterData.characters[this.state.slotBoxID2].units[1] == 'DEX'
                                            ? this.props.characterData.characters[this.state.slotBoxID2].units[13] / 2
                                            : typeof (this.state.slotBoxID2) == 'number' && this.props.characterData.characters[this.state.slotBoxID2].units[1] != 'DEX' && this.props.characterData.characters[this.state.slotBoxID2].units[1] != 'QCK'
                                                ? this.props.characterData.characters[this.state.slotBoxID2].units[13]
                                                : 0)
                                    + (typeof (this.state.slotBoxID3) == 'number' && this.props.characterData.characters[this.state.slotBoxID3].units[1] == 'QCK'
                                        ? this.props.characterData.characters[this.state.slotBoxID3].units[13] * 2
                                        : typeof (this.state.slotBoxID3) == 'number' && this.props.characterData.characters[this.state.slotBoxID3].units[1] == 'DEX'
                                            ? this.props.characterData.characters[this.state.slotBoxID3].units[13] / 2
                                            : typeof (this.state.slotBoxID3) == 'number' && this.props.characterData.characters[this.state.slotBoxID3].units[1] != 'DEX' && this.props.characterData.characters[this.state.slotBoxID3].units[1] != 'QCK'
                                                ? this.props.characterData.characters[this.state.slotBoxID3].units[13]
                                                : 0)
                                    + (typeof (this.state.slotBoxID4) == 'number' && this.props.characterData.characters[this.state.slotBoxID4].units[1] == 'QCK'
                                        ? this.props.characterData.characters[this.state.slotBoxID4].units[13] * 2
                                        : typeof (this.state.slotBoxID4) == 'number' && this.props.characterData.characters[this.state.slotBoxID4].units[1] == 'DEX'
                                            ? this.props.characterData.characters[this.state.slotBoxID4].units[13] / 2
                                            : typeof (this.state.slotBoxID4) == 'number' && this.props.characterData.characters[this.state.slotBoxID4].units[1] != 'DEX' && this.props.characterData.characters[this.state.slotBoxID4].units[1] != 'QCK'
                                                ? this.props.characterData.characters[this.state.slotBoxID4].units[13]
                                                : 0)
                                    + (typeof (this.state.slotBoxID5) == 'number' && this.props.characterData.characters[this.state.slotBoxID5].units[1] == 'QCK'
                                        ? this.props.characterData.characters[this.state.slotBoxID5].units[13] * 2
                                        : typeof (this.state.slotBoxID5) == 'number' && this.props.characterData.characters[this.state.slotBoxID5].units[1] == 'DEX'
                                            ? this.props.characterData.characters[this.state.slotBoxID5].units[13] / 2
                                            : typeof (this.state.slotBoxID5) == 'number' && this.props.characterData.characters[this.state.slotBoxID5].units[1] != 'DEX' && this.props.characterData.characters[this.state.slotBoxID5].units[1] != 'QCK'
                                                ? this.props.characterData.characters[this.state.slotBoxID5].units[13]
                                                : 0)
                                    + (typeof (this.state.slotBoxID6) == 'number' && this.props.characterData.characters[this.state.slotBoxID6].units[1] == 'QCK'
                                        ? this.props.characterData.characters[this.state.slotBoxID6].units[13] * 2
                                        : typeof (this.state.slotBoxID6) == 'number' && this.props.characterData.characters[this.state.slotBoxID6].units[1] == 'DEX'
                                            ? this.props.characterData.characters[this.state.slotBoxID6].units[13] / 2
                                            : typeof (this.state.slotBoxID6) == 'number' && this.props.characterData.characters[this.state.slotBoxID6].units[1] != 'DEX' && this.props.characterData.characters[this.state.slotBoxID6].units[1] != 'QCK'
                                                ? this.props.characterData.characters[this.state.slotBoxID6].units[13]
                                                : 0)) * this.props.multiplier1 * this.props.multiplier2
                            }</Text>
                        </View>
                        <View style={qck}>
                            <Text style={{ textAlign: 'center' }}>Damage against QCK</Text>
                            <Text style={{ marginTop: 7, fontSize: 25 }}>
                                {
                                    ((typeof (this.state.slotBoxID1) == 'number' && this.props.characterData.characters[this.state.slotBoxID1].units[1] == 'DEX'
                                        ? this.props.characterData.characters[this.state.slotBoxID1].units[13] * 2
                                        : typeof (this.state.slotBoxID1) == 'number' && this.props.characterData.characters[this.state.slotBoxID1].units[1] == 'STR'
                                            ? this.props.characterData.characters[this.state.slotBoxID1].units[13] / 2
                                            : typeof (this.state.slotBoxID1) == 'number' && this.props.characterData.characters[this.state.slotBoxID1].units[1] != 'STR' && this.props.characterData.characters[this.state.slotBoxID1].units[1] != 'DEX'
                                                ? this.props.characterData.characters[this.state.slotBoxID1].units[13]
                                                : 0)
                                        + (typeof (this.state.slotBoxID2) == 'number' && this.props.characterData.characters[this.state.slotBoxID2].units[1] == 'DEX'
                                            ? this.props.characterData.characters[this.state.slotBoxID2].units[13] * 2
                                            : typeof (this.state.slotBoxID2) == 'number' && this.props.characterData.characters[this.state.slotBoxID2].units[1] == 'STR'
                                                ? this.props.characterData.characters[this.state.slotBoxID2].units[13] / 2
                                                : typeof (this.state.slotBoxID2) == 'number' && this.props.characterData.characters[this.state.slotBoxID2].units[1] != 'STR' && this.props.characterData.characters[this.state.slotBoxID2].units[1] != 'DEX'
                                                    ? this.props.characterData.characters[this.state.slotBoxID2].units[13]
                                                    : 0)
                                        + (typeof (this.state.slotBoxID3) == 'number' && this.props.characterData.characters[this.state.slotBoxID3].units[1] == 'DEX'
                                            ? this.props.characterData.characters[this.state.slotBoxID3].units[13] * 2
                                            : typeof (this.state.slotBoxID3) == 'number' && this.props.characterData.characters[this.state.slotBoxID3].units[1] == 'STR'
                                                ? this.props.characterData.characters[this.state.slotBoxID3].units[13] / 2
                                                : typeof (this.state.slotBoxID3) == 'number' && this.props.characterData.characters[this.state.slotBoxID3].units[1] != 'STR' && this.props.characterData.characters[this.state.slotBoxID3].units[1] != 'DEX'
                                                    ? this.props.characterData.characters[this.state.slotBoxID3].units[13]
                                                    : 0)
                                        + (typeof (this.state.slotBoxID4) == 'number' && this.props.characterData.characters[this.state.slotBoxID4].units[1] == 'DEX'
                                            ? this.props.characterData.characters[this.state.slotBoxID4].units[13] * 2
                                            : typeof (this.state.slotBoxID4) == 'number' && this.props.characterData.characters[this.state.slotBoxID4].units[1] == 'STR'
                                                ? this.props.characterData.characters[this.state.slotBoxID4].units[13] / 2
                                                : typeof (this.state.slotBoxID4) == 'number' && this.props.characterData.characters[this.state.slotBoxID4].units[1] != 'STR' && this.props.characterData.characters[this.state.slotBoxID4].units[1] != 'DEX'
                                                    ? this.props.characterData.characters[this.state.slotBoxID4].units[13]
                                                    : 0)
                                        + (typeof (this.state.slotBoxID5) == 'number' && this.props.characterData.characters[this.state.slotBoxID5].units[1] == 'DEX'
                                            ? this.props.characterData.characters[this.state.slotBoxID5].units[13] * 2
                                            : typeof (this.state.slotBoxID5) == 'number' && this.props.characterData.characters[this.state.slotBoxID5].units[1] == 'STR'
                                                ? this.props.characterData.characters[this.state.slotBoxID5].units[13] / 2
                                                : typeof (this.state.slotBoxID5) == 'number' && this.props.characterData.characters[this.state.slotBoxID5].units[1] != 'STR' && this.props.characterData.characters[this.state.slotBoxID5].units[1] != 'DEX'
                                                    ? this.props.characterData.characters[this.state.slotBoxID5].units[13]
                                                    : 0)
                                        + (typeof (this.state.slotBoxID6) == 'number' && this.props.characterData.characters[this.state.slotBoxID6].units[1] == 'DEX'
                                            ? this.props.characterData.characters[this.state.slotBoxID6].units[13] * 2
                                            : typeof (this.state.slotBoxID6) == 'number' && this.props.characterData.characters[this.state.slotBoxID6].units[1] == 'STR'
                                                ? this.props.characterData.characters[this.state.slotBoxID6].units[13] / 2
                                                : typeof (this.state.slotBoxID6) == 'number' && this.props.characterData.characters[this.state.slotBoxID6].units[1] != 'STR' && this.props.characterData.characters[this.state.slotBoxID6].units[1] != 'DEX'
                                                    ? this.props.characterData.characters[this.state.slotBoxID6].units[13]
                                                    : 0)) * this.props.multiplier1 * this.props.multiplier2
                                }
                            </Text>
                        </View>
                        <View style={dex}>
                            <Text style={{ textAlign: 'center' }}>Damage against DEX</Text>
                            <Text style={{ marginTop: 7, fontSize: 25 }}>
                                {
                                    ((typeof (this.state.slotBoxID1) == 'number' && this.props.characterData.characters[this.state.slotBoxID1].units[1] == 'STR'
                                        ? this.props.characterData.characters[this.state.slotBoxID1].units[13] * 2
                                        : typeof (this.state.slotBoxID1) == 'number' && this.props.characterData.characters[this.state.slotBoxID1].units[1] == 'QCK'
                                            ? this.props.characterData.characters[this.state.slotBoxID1].units[13] / 2
                                            : typeof (this.state.slotBoxID1) == 'number' && this.props.characterData.characters[this.state.slotBoxID1].units[1] != 'QCK' && this.props.characterData.characters[this.state.slotBoxID1].units[1] != 'STR'
                                                ? this.props.characterData.characters[this.state.slotBoxID1].units[13]
                                                : 0)
                                        + (typeof (this.state.slotBoxID2) == 'number' && this.props.characterData.characters[this.state.slotBoxID2].units[1] == 'STR'
                                            ? this.props.characterData.characters[this.state.slotBoxID2].units[13] * 2
                                            : typeof (this.state.slotBoxID2) == 'number' && this.props.characterData.characters[this.state.slotBoxID2].units[1] == 'QCK'
                                                ? this.props.characterData.characters[this.state.slotBoxID2].units[13] / 2
                                                : typeof (this.state.slotBoxID2) == 'number' && this.props.characterData.characters[this.state.slotBoxID2].units[1] != 'QCK' && this.props.characterData.characters[this.state.slotBoxID2].units[1] != 'STR'
                                                    ? this.props.characterData.characters[this.state.slotBoxID2].units[13]
                                                    : 0)
                                        + (typeof (this.state.slotBoxID3) == 'number' && this.props.characterData.characters[this.state.slotBoxID3].units[1] == 'STR'
                                            ? this.props.characterData.characters[this.state.slotBoxID3].units[13] * 2
                                            : typeof (this.state.slotBoxID3) == 'number' && this.props.characterData.characters[this.state.slotBoxID3].units[1] == 'QCK'
                                                ? this.props.characterData.characters[this.state.slotBoxID3].units[13] / 2
                                                : typeof (this.state.slotBoxID3) == 'number' && this.props.characterData.characters[this.state.slotBoxID3].units[1] != 'QCK' && this.props.characterData.characters[this.state.slotBoxID3].units[1] != 'STR'
                                                    ? this.props.characterData.characters[this.state.slotBoxID3].units[13]
                                                    : 0)
                                        + (typeof (this.state.slotBoxID4) == 'number' && this.props.characterData.characters[this.state.slotBoxID4].units[1] == 'STR'
                                            ? this.props.characterData.characters[this.state.slotBoxID4].units[13] * 2
                                            : typeof (this.state.slotBoxID4) == 'number' && this.props.characterData.characters[this.state.slotBoxID4].units[1] == 'QCK'
                                                ? this.props.characterData.characters[this.state.slotBoxID4].units[13] / 2
                                                : typeof (this.state.slotBoxID4) == 'number' && this.props.characterData.characters[this.state.slotBoxID4].units[1] != 'QCK' && this.props.characterData.characters[this.state.slotBoxID4].units[1] != 'STR'
                                                    ? this.props.characterData.characters[this.state.slotBoxID4].units[13]
                                                    : 0)
                                        + (typeof (this.state.slotBoxID5) == 'number' && this.props.characterData.characters[this.state.slotBoxID5].units[1] == 'STR'
                                            ? this.props.characterData.characters[this.state.slotBoxID5].units[13] * 2
                                            : typeof (this.state.slotBoxID5) == 'number' && this.props.characterData.characters[this.state.slotBoxID5].units[1] == 'QCK'
                                                ? this.props.characterData.characters[this.state.slotBoxID5].units[13] / 2
                                                : typeof (this.state.slotBoxID5) == 'number' && this.props.characterData.characters[this.state.slotBoxID5].units[1] != 'QCK' && this.props.characterData.characters[this.state.slotBoxID5].units[1] != 'STR'
                                                    ? this.props.characterData.characters[this.state.slotBoxID5].units[13]
                                                    : 0)
                                        + (typeof (this.state.slotBoxID6) == 'number' && this.props.characterData.characters[this.state.slotBoxID6].units[1] == 'STR'
                                            ? this.props.characterData.characters[this.state.slotBoxID6].units[13] * 2
                                            : typeof (this.state.slotBoxID6) == 'number' && this.props.characterData.characters[this.state.slotBoxID6].units[1] == 'QCK'
                                                ? this.props.characterData.characters[this.state.slotBoxID6].units[13] / 2
                                                : typeof (this.state.slotBoxID6) == 'number' && this.props.characterData.characters[this.state.slotBoxID6].units[1] != 'QCK' && this.props.characterData.characters[this.state.slotBoxID6].units[1] != 'STR'
                                                    ? this.props.characterData.characters[this.state.slotBoxID6].units[13]
                                                    : 0)) * this.props.multiplier1 * this.props.multiplier2
                                }
                            </Text>
                        </View>
                        <View style={psy}>
                            <Text style={{ textAlign: 'center' }}>Damage against PSY</Text>
                            <Text style={{ marginTop: 7, fontSize: 25 }}>
                                {
                                    ((typeof (this.state.slotBoxID1) == 'number' && this.props.characterData.characters[this.state.slotBoxID1].units[1] == 'INT'
                                        ? this.props.characterData.characters[this.state.slotBoxID1].units[13] * 2
                                        : typeof (this.state.slotBoxID1) == 'number' && this.props.characterData.characters[this.state.slotBoxID1].units[1] != 'INT'
                                            ? this.props.characterData.characters[this.state.slotBoxID1].units[13]
                                            : 0)
                                        + (typeof (this.state.slotBoxID2) == 'number' && this.props.characterData.characters[this.state.slotBoxID2].units[1] == 'INT'
                                            ? this.props.characterData.characters[this.state.slotBoxID2].units[13] * 2
                                            : typeof (this.state.slotBoxID2) == 'number' && this.props.characterData.characters[this.state.slotBoxID2].units[1] != 'INT'
                                                ? this.props.characterData.characters[this.state.slotBoxID2].units[13]
                                                : 0)
                                        + (typeof (this.state.slotBoxID3) == 'number' && this.props.characterData.characters[this.state.slotBoxID3].units[1] == 'INT'
                                            ? this.props.characterData.characters[this.state.slotBoxID3].units[13] * 2
                                            : typeof (this.state.slotBoxID3) == 'number' && this.props.characterData.characters[this.state.slotBoxID3].units[1] != 'INT'
                                                ? this.props.characterData.characters[this.state.slotBoxID3].units[13]
                                                : 0)
                                        + (typeof (this.state.slotBoxID4) == 'number' && this.props.characterData.characters[this.state.slotBoxID4].units[1] == 'INT'
                                            ? this.props.characterData.characters[this.state.slotBoxID4].units[13] * 2
                                            : typeof (this.state.slotBoxID4) == 'number' && this.props.characterData.characters[this.state.slotBoxID4].units[1] != 'INT'
                                                ? this.props.characterData.characters[this.state.slotBoxID4].units[13]
                                                : 0)
                                        + (typeof (this.state.slotBoxID5) == 'number' && this.props.characterData.characters[this.state.slotBoxID5].units[1] == 'INT'
                                            ? this.props.characterData.characters[this.state.slotBoxID5].units[13] * 2
                                            : typeof (this.state.slotBoxID5) == 'number' && this.props.characterData.characters[this.state.slotBoxID5].units[1] != 'INT'
                                                ? this.props.characterData.characters[this.state.slotBoxID5].units[13]
                                                : 0)
                                        + (typeof (this.state.slotBoxID6) == 'number' && this.props.characterData.characters[this.state.slotBoxID6].units[1] == 'INT'
                                            ? this.props.characterData.characters[this.state.slotBoxID6].units[13] * 2
                                            : typeof (this.state.slotBoxID6) == 'number' && this.props.characterData.characters[this.state.slotBoxID6].units[1] != 'INT'
                                                ? this.props.characterData.characters[this.state.slotBoxID6].units[13]
                                                : 0)) * this.props.multiplier1 * this.props.multiplier2
                                }
                            </Text>
                        </View>
                        <View style={int}>
                            <Text style={{ textAlign: 'center' }}>Damage against INT</Text>
                            <Text style={{ marginTop: 7, fontSize: 25 }}>
                                {
                                    (((typeof (this.state.slotBoxID1) == 'number' && this.props.characterData.characters[this.state.slotBoxID1].units[1] == 'PSY'
                                        ? this.props.characterData.characters[this.state.slotBoxID1].units[13] * 2
                                        : typeof (this.state.slotBoxID1) == 'number' && this.props.characterData.characters[this.state.slotBoxID1].units[1] != 'PSY'
                                            ? this.props.characterData.characters[this.state.slotBoxID1].units[13]
                                            : 0)
                                        + (typeof (this.state.slotBoxID2) == 'number' && this.props.characterData.characters[this.state.slotBoxID2].units[1] == 'PSY'
                                            ? this.props.characterData.characters[this.state.slotBoxID2].units[13] * 2
                                            : typeof (this.state.slotBoxID2) == 'number' && this.props.characterData.characters[this.state.slotBoxID2].units[1] != 'PSY'
                                                ? this.props.characterData.characters[this.state.slotBoxID2].units[13]
                                                : 0)
                                        + (typeof (this.state.slotBoxID3) == 'number' && this.props.characterData.characters[this.state.slotBoxID3].units[1] == 'PSY'
                                            ? this.props.characterData.characters[this.state.slotBoxID3].units[13] * 2
                                            : typeof (this.state.slotBoxID3) == 'number' && this.props.characterData.characters[this.state.slotBoxID3].units[1] != 'PSY'
                                                ? this.props.characterData.characters[this.state.slotBoxID3].units[13]
                                                : 0)
                                        + (typeof (this.state.slotBoxID4) == 'number' && this.props.characterData.characters[this.state.slotBoxID4].units[1] == 'PSY'
                                            ? this.props.characterData.characters[this.state.slotBoxID4].units[13] * 2
                                            : typeof (this.state.slotBoxID4) == 'number' && this.props.characterData.characters[this.state.slotBoxID4].units[1] != 'PSY'
                                                ? this.props.characterData.characters[this.state.slotBoxID4].units[13]
                                                : 0)
                                        + (typeof (this.state.slotBoxID5) == 'number' && this.props.characterData.characters[this.state.slotBoxID5].units[1] == 'PSY'
                                            ? this.props.characterData.characters[this.state.slotBoxID5].units[13] * 2
                                            : typeof (this.state.slotBoxID5) == 'number' && this.props.characterData.characters[this.state.slotBoxID5].units[1] != 'PSY'
                                                ? this.props.characterData.characters[this.state.slotBoxID5].units[13]
                                                : 0)
                                        + (typeof (this.state.slotBoxID6) == 'number' && this.props.characterData.characters[this.state.slotBoxID6].units[1] == 'PSY'
                                            ? this.props.characterData.characters[this.state.slotBoxID6].units[13] * 2
                                            : typeof (this.state.slotBoxID6) == 'number' && this.props.characterData.characters[this.state.slotBoxID6].units[1] != 'PSY'
                                                ? this.props.characterData.characters[this.state.slotBoxID6].units[13]
                                                : 0)) * this.props.multiplier1 * this.props.multiplier2)
                                }
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    characterData: state.characters.characterData,
    multiplier1: state.characters.captain1,
    multiplier2: state.characters.captain2
})

const mapDispatchToProps = dispatch => ({
    getCharacters: () => dispatch(getCharacters()),
    captain1: (id, p) => dispatch(getCaptainMultiplier1(id, p)),
    captain2: (id, p) => dispatch(getCaptainMultiplier2(id, p)),
    reset1: () => dispatch(resetCaptain1()),
    reset2: () => dispatch(resetCaptain2()),
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamCalculator);

const styles = StyleSheet.create({
    addStyle: {
        borderWidth: 1,
        width: 110,
        height: 110,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 3
    },

    str: {
        backgroundColor: '#FF4136',
        width: 125,
        height: 75,
        marginBottom: 15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        alignItems: 'center'
    },

    qck: {
        backgroundColor: '#00CCFF',
        width: 125,
        height: 75,
        marginBottom: 15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        alignItems: 'center'
    },

    dex: {
        backgroundColor: '#98FB98',
        width: 125,
        height: 75,
        marginBottom: 15,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        alignItems: 'center'
    },

    psy: {
        backgroundColor: '#FFD700',
        width: 125,
        height: 75,
        marginBottom: 15,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        alignItems: 'center'
    },

    int: {
        backgroundColor: '#EE82EE',
        width: 125,
        height: 75,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center'
    },
    modal: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalText: {
        backgroundColor: 'white',
        width: 300,
        height: 435,
        borderRadius: 10,
    }
})