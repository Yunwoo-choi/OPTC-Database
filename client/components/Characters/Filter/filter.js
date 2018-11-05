import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet, Modal, ScrollView, TextInput, ImageBackground, FlatList } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash'
// import { connect } from 'react-redux';
// import { getDog } from './actions';
// import { loginPageWallpaper } from './images/loginPageWallpaper.jpg';




export default class Filter extends Component {
    state = {
        arrayNames: {},
        test: '',
        characterThumbnail: '',
        newSearchID: ''
    }

    setSearchID = () => {
        let newSearchID = []
        for (let i = 0; i < this.props.numberRender; i++) {
            newSearchID[i] = i + 1;
        }
        this.setState({
            newSearchID: newSearchID
        })
    }

    containsType = ({ units }, query) => {
        if (units[1].length == 2) {
            if (units[1][0].toLowerCase().includes(query) || units[1][1].toLowerCase().includes(query)) {
                return true;
            }
        } else {
            if (units[1].toLowerCase().includes(query)) {
                return true;
            }
        }
        return false;
    }
    containsClass = ({ units }, query) => {
        let newUnits;
        if (units[2].length == 2) {
            newUnits = (units[2].join('')).toLowerCase()
        } else {
            newUnits = units[2].toLowerCase()
        }

        if (newUnits.includes(query)) {
            return true;
        }
        return false;
    }
    containsCaptain = ({ abilityDetails }, query) => {
        if (abilityDetails.captain.includes(query)) {
            return true;
        }
        return false;
    }
    containsSpecial = ({ abilityDetails }, query) => {
        if (abilityDetails.special.includes(query)) {
            return true;
        }
        return false;
    }


    getArrayNames = (filter, type) => {
        let newArrayNames = [];
        let { characterData, numberRender, characterThumbnail, changeFilterList } = this.props;
        for (i = 1; i <= numberRender; i++) {
            newArrayNames[i - 1] = { ...characterData.characters[i] }
        }
        this.setSearchID()
        this.setState({
            arrayNames: newArrayNames
        },
            () => {
                const formatSearch = filter.toLowerCase()
                const data = _.filter(this.state.arrayNames, user => {
                    if (type == 'type') { return this.containsType(user, formatSearch); }
                    else if (type == 'class') { return this.containsClass(user, formatSearch); }
                    else if (type == 'captain' && this.state.arrayNames.abilityDetails != undefined && this.state.arrayNames.captain != undefined) { return this.containsCaptain(user, formatSearch); }
                    else if (type == 'special' && this.state.arrayNames.abilityDetails != undefined && this.state.arrayNames.special != undefined) { return this.containsSpecial(user, formatSearch); }
                });
                this.setState({
                    test: data
                },
                    () => {
                        let newArrayIndex = []
                        let searchID = []
                        for (let i = 1; i <= numberRender; i++) {
                            for (let j = 0; j < this.state.test.length; j++) {
                                if (this.state.test[j].units[0].toLowerCase() == characterData.characters[i].units[0].toLowerCase()) {
                                    newArrayIndex[j] = characterThumbnail[characterData.characters[i].id - 1]
                                    searchID[j] = characterData.characters[i].id
                                }
                            }
                        }
                        this.setState({
                            characterThumbnail: newArrayIndex,
                            newSearchID: searchID
                        },
                            () => {
                                changeFilterList(this.state.characterThumbnail, this.state.newSearchID)
                            }
                        )
                    }
                )
            }
        )
    }


    render() {
        let { filterButtons, filterTitle, twoByTwoText } = styles;
        let types = ['STR', 'QCK', 'DEX', 'PSY', 'INT'];
        let classes = ['Fighter', 'Shooter', 'Slasher', 'Striker']
        let classes2 = ['Free Spirit', 'Cerebral', 'Power', 'Driven', 'Evolver', 'Booster']
        let captains = ['Type-Boosting Captains', 'Class-Boosting Captains', 'Universal Ask Boosting Captains', 'ATK Boosting Captains', 'RCV Boosting Captains', 'Special Boosting Captains', 'EXP Boosters', 'Drop Doublers', 'Beli Boosters', 'Healers', 'Damage Reducers'];
        let specials = ['Type-Boosting Specials', 'Class-Bosting Specials', 'Universal Atk Boosting Specials', 'Color Affinity Boosters', 'RCV Boosters', 'Orb Boosters', 'Orb Lockers', 'Delayers', 'Healers', 'Percent Healer Reducers', 'Poisoners', 'Poison Removers', 'Defense Reducers', 'Damage Nullifiers', 'Bind Reducers', 'Silence Reducers', 'Paralysis Reducers', 'Despair Reducers', 'Blindness Reducers', 'Chain Lockers', 'Chain Boosters'];
        let buttonColors = ['#FF4136', '#00CCFF', '#98FB98', '#FFD700', '#EE82EE']
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.props.filterModal}
                onRequestClose={() => {
                    this.props.filterModalHandler(false);
                }}
            >
                {/* Scroll View for All my Filters which are in a MODAL */}
                <ScrollView>
                    <View style={{ flex: 1, backgroundColor: '#505050' }}>
                        <TouchableOpacity style={{ backgroundColor: '#FFA07A' }}>
                            <Text style={filterButtons}>Clear Filters</Text>
                        </TouchableOpacity>
                        <View style={{ backgroundColor: 'black', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', marginRight: -100 }}>
                            <Text style={[filterTitle]}>Type Filters</Text>
                            <TouchableOpacity onPress={() => this.props.filterModalHandler(false)} style={{ alignSelf: 'flex-end' }}>
                                <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', textAlign: 'right' }}>X</Text>
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            data={types}
                            numColumns={5}
                            keyExtractor={(item, index) => index + item}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity style={{ backgroundColor: buttonColors[index], flex: 1 }} onPress={() => this.getArrayNames(item.toLowerCase(), 'type')}>
                                    <Text style={filterButtons}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <Text style={filterTitle}>Class Filters</Text>
                        <FlatList
                            data={classes}
                            numColumns={4}
                            keyExtractor={(item, index) => index + item}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity style={{ flex: 1 }} onPress={() => this.getArrayNames(item.toLowerCase(), 'class')}>
                                    <Text style={filterButtons}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />

                        <FlatList
                            data={classes2}
                            keyExtractor={(item, index) => index + item}
                            numColumns={3}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity style={{ flex: 1 }} onPress={() => this.getArrayNames(item.toLowerCase(), 'class')}>
                                    <Text style={filterButtons}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <Text style={filterTitle}>Captain Ability Filters</Text>
                        <View>
                            <FlatList
                                data={captains}
                                keyExtractor={(item, index) => index + item}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity onPress={() => this.getArrayNames(/Boosts (ATK|HP|RCV|ATK and HP|ATK and RCV|HP and RCV|ATK, HP and RCV) of[^,]+(STR|DEX|QCK|PSY|INT)\b/, 'captain')}>
                                        <Text style={twoByTwoText}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>

                        <Text style={filterTitle}>Special Filters</Text>
                        <View>
                            <FlatList
                                data={specials}
                                keyExtractor={(item, index) => index + item}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity onPress={() => this.getArrayNames(item.toLowerCase(), 'special')}>
                                        <Text style={twoByTwoText}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </View>
                </ScrollView>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    filterButtons: {
        textAlign: 'center',
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold',
        borderWidth: 0.3,
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

})