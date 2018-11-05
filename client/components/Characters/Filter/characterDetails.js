import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet, Modal, ScrollView, Dimensions, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { List, List2 } from './buttons/custom'
import _ from 'lodash'
// import { connect } from 'react-redux';
// import { getDog } from './actions';
// import { loginPageWallpaper } from './images/loginPageWallpaper.jpg';


class CharacterDetails extends Component {

    renderSeparator = () => {
        return (<Image source={require('../../../assets/plus.png')}
            style={{ height: 20, width: 20, marginTop: 10 }}
        />)
    }

    render() {
        let { detailsTable, tableDesign1 } = styles;
        let { characterData, characterID } = this.props
        let { height, width } = Dimensions.get('window');

        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.props.detailsModal}
                onRequestClose={() => {
                    this.props.detailsModalHandler(false);
                }}
            >
                <ScrollView>
                    <Text style={{ backgroundColor: '#87cefa', fontSize: 20, textAlign: 'center' }}>{characterData.characters[characterID].units[0]}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={{ uri: characterData.characters[characterID].res.image }}
                            style={{ height: height * 0.345, width: width * 0.93, marginTop: 20 }}
                        />
                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                            <TouchableOpacity onPress={() => this.props.detailsModalHandler(false)}><Text style={{ fontSize: 20 }}>X</Text></TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ borderBottomWidth: 2, marginTop: 15, marginLeft: 10, marginRight: 10 }}>
                        <Text style={{ fontSize: 20, marginLeft: 5 }}>Details</Text>
                    </View>
                    {/* Character Details */}
                    <View style={[tableDesign1, { backgroundColor: '#C0C0C0', marginTop: 5, }]}>
                        <List text='Class' />
                        <List text='Type' />
                        <List text='Stars' />
                        <List text='Cost' />
                    </View>
                    {/* // [ "Name", "Type", [ "Class1", "Class2" ], Stars, Cost, Combo, Sockets, maxLVL, EXPToMax, lvl1HP, lvl1ATK, lvl1RCV, MAXHP, MAXATK, MAXRCV, Growth Rate ], */}
                    <View style={tableDesign1}>
                        <View style={{ flex: 1 }}>
                            {characterData.characters[characterID].units[2].length == 2
                                ? <View><Text style={detailsTable}>{characterData.characters[characterID].units[2][0]}</Text><Text style={detailsTable}>{characterData.characters[characterID].units[2][1]}</Text></View>
                                : <Text style={detailsTable}>{characterData.characters[characterID].units[2]}</Text>
                            }
                        </View>
                        <List2 {...this.props} statNumber={1} />
                        <List2 {...this.props} statNumber={3} />
                        <List2 {...this.props} statNumber={4} />

                    </View>
                    <View style={[tableDesign1, { backgroundColor: '#C0C0C0' }]}>
                        <List text='Combo' />
                        <List text='Slots' />
                        <List text='Max Level' />
                        <List text='Exp to Max' />
                    </View>
                    <View style={[tableDesign1, { marginBottom: 0 }]}>
                        <List2 {...this.props} statNumber={5} />
                        <List2 {...this.props} statNumber={6} />
                        <List2 {...this.props} statNumber={7} />
                        <List2 {...this.props} statNumber={8} />
                    </View>

                    {/* Character Stats */}
                    <View style={{ borderBottomWidth: 2, marginTop: 15, marginLeft: 10, marginRight: 10 }}>
                        <Text style={{ fontSize: 20, marginLeft: 5 }}>Stats</Text>
                    </View>
                    <View style={[tableDesign1, { backgroundColor: '#C0C0C0', marginTop: 5, }]}>
                        <List text='Level' />
                        <List text='HP' />
                        <List text='ATK' />
                        <List text='RCV' />
                    </View>
                    {/* // [ "Name", "Type", [ "Class1", "Class2" ], Stars, Cost, Combo, Sockets, maxLVL, EXPToMax, lvl1HP, lvl1ATK, lvl1RCV, MAXHP, MAXATK, MAXRCV, Growth Rate ], */}
                    <View style={tableDesign1}>
                        <View style={{ flex: 1 }}><Text style={styles.detailsTable}>1</Text></View>
                        <List2 {...this.props} statNumber={9} />
                        <List2 {...this.props} statNumber={10} />
                        <List2 {...this.props} statNumber={11} />
                    </View>
                    <View style={[tableDesign1, { backgroundColor: '#C0C0C0', marginBottom: 0 }]}>
                        <List2 {...this.props} statNumber={7} />
                        <List2 {...this.props} statNumber={12} />
                        <List2 {...this.props} statNumber={13} />
                        <List2 {...this.props} statNumber={14} />
                    </View>

                    {/* Character Abilities */}
                    <View style={{ borderBottomWidth: 2, marginTop: 15, marginLeft: 10, marginRight: 10 }}>
                        <Text style={{ fontSize: 20, marginLeft: 5 }}>Character Abilities</Text>
                    </View>
                    <View style={[tableDesign1, { marginTop: 5 }]}>
                        <List text='Captain Ability' />
                        {characterData.characters[characterID].abilityDetails == undefined
                            ? <View style={{ flex: 1 }}><Text style={detailsTable}>None</Text></View>
                            : characterData.characters[characterID].abilityDetails.captain == undefined
                                ? <View style={{ flex: 1 }}><Text style={detailsTable}>None</Text></View>
                                : typeof (characterData.characters[characterID].abilityDetails.captain) == 'object'
                                    ? <View style={{ flex: 1 }}><Text style={detailsTable}>{characterData.characters[characterID].abilityDetails.captain.base}</Text></View>
                                    : <View style={{ flex: 1 }}><Text style={detailsTable}>{characterData.characters[characterID].abilityDetails.captain}</Text></View>
                        }
                    </View>
                    <View style={tableDesign1}>
                        <List text='Sailor Ability' />
                        <View style={{ flex: 1 }}><Text style={detailsTable}>None</Text></View>
                    </View>
                    <View style={tableDesign1}>
                        <List text='Special' />

                        {characterData.characters[characterID].abilityDetails != undefined
                            ? <View style={{ flex: 1 }}>
                                <List text={characterData.characters[characterID].abilityDetails.specialName} />
                                <Text style={detailsTable}>{characterData.characters[characterID].abilityDetails.special}</Text>
                            </View>
                            : <View style={{ flex: 1 }}>
                                <List text='None' />
                                <Text style={detailsTable}>None</Text>
                            </View>
                        }
                    </View>
                    <View style={tableDesign1}>
                        <View style={{ flex: 1 }}><Text style={[detailsTable, { fontWeight: 'bold', marginBottom: 0 }]}>Cooldown</Text></View>
                        {characterData.characters[characterID].cooldowns != undefined
                            ? <View style={{ flex: 1 }}><Text style={detailsTable}>Min: {characterData.characters[characterID].cooldowns.join(', Max: ')}</Text></View>
                            : <View style={{ flex: 1 }}><Text style={detailsTable}>None</Text></View>
                        }
                    </View>

                    
                    {/* Evolution */}
                    <View style={{ borderBottomWidth: 2, marginTop: 15, marginLeft: 10, marginRight: 10 }}>
                        <Text style={{ fontSize: 20, marginLeft: 5 }}>Evolution</Text>
                    </View>
                    {characterData.characters[characterID].evolutions == undefined
                        ? <View></View>
                        : characterData.characters[characterID].evolutions.evolution.length >= 2
                            ? <View>
                                <View style={[tableDesign1, { marginTop: 5, marginBottom: 15, flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }]}>
                                    <View>
                                        <FlatList
                                            data={characterData.characters[characterID].evolutions.evolvers[0]}
                                            numColumns={5}
                                            ListEmptyComponent={<Text style={{ fontSize: 25, textAlign: 'center' }}>Nothing Was Found</Text>}
                                            keyExtractor={(item, index) => index + ''}
                                            renderItem={({ item, index }) => (
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Image source={{ uri: characterData.characters[item].res.thumbnail }}
                                                        style={{ height: 30, width: 30, margin: 5 }}
                                                    />
                                                    {index < characterData.characters[characterID].evolutions.evolvers[0].length - 1
                                                        && this.renderSeparator()}
                                                </View>
                                            )}
                                        />
                                    </View>
                                    <Image source={require('../../../assets/equal.png')} style={{ height: 20, width: 20 }} />
                                    <Image source={{ uri: characterData.characters[characterData.characters[characterID].evolutions.evolution[0]].res.thumbnail }}
                                        style={{ height: 30, width: 30, margin: 5 }}
                                    />
                                </View>
                                <View style={[tableDesign1, { marginTop: 5, marginBottom: 15, flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }]}>
                                    <View>
                                        <FlatList
                                            data={characterData.characters[characterID].evolutions.evolvers[1]}
                                            numColumns={5}
                                            ListEmptyComponent={<Text style={{ fontSize: 25, textAlign: 'center' }}>Nothing Was Found</Text>}
                                            keyExtractor={(item, index) => index + ''}
                                            renderItem={({ item, index }) => (
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Image source={{ uri: characterData.characters[item].res.thumbnail }}
                                                        style={{ height: 30, width: 30, margin: 5 }}
                                                    />
                                                    {index < characterData.characters[characterID].evolutions.evolvers[1].length - 1
                                                        && this.renderSeparator()}
                                                </View>
                                            )}
                                        />
                                    </View>
                                    <Image source={require('../../../assets/equal.png')} style={{ height: 20, width: 20 }} />
                                    <Image source={{ uri: characterData.characters[characterData.characters[characterID].evolutions.evolution[1]].res.thumbnail }}
                                        style={{ height: 30, width: 30, margin: 5 }}
                                    />
                                </View>
                            </View>
                            : <View style={[tableDesign1, { marginTop: 5, marginBottom: 15, flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }]}>
                                <View>
                                    <FlatList
                                        numColumns={5}
                                        data={characterData.characters[characterID].evolutions.evolvers}
                                        ListEmptyComponent={<Text style={{ fontSize: 25, textAlign: 'center' }}>Nothing Was Found</Text>}
                                        keyExtractor={(item, index) => index + ''}
                                        renderItem={({ item, index }) => (
                                            <View style={{ flexDirection: 'row' }}>
                                                <Image source={{ uri: characterData.characters[item].res.thumbnail }}
                                                    style={{ height: 30, width: 30, margin: 5 }}
                                                />
                                                {index < characterData.characters[characterID].evolutions.evolvers.length - 1
                                                    && this.renderSeparator()}
                                            </View>
                                        )}
                                    />
                                </View>
                                <Image source={require('../../../assets/equal.png')} style={{ height: 20, width: 20 }} />
                                <Image source={{ uri: characterData.characters[characterData.characters[characterID].evolutions.evolution].res.thumbnail }}
                                    style={{ height: 30, width: 30, margin: 5 }}
                                />
                            </View>
                    }
                </ScrollView>

            </Modal>
        )
    }
}

const mapStateToProps = state => ({
    characterData: state.characters.characterData
})

export default connect(mapStateToProps)(CharacterDetails);

const styles = StyleSheet.create({
    detailsTable: {
        fontSize: 17,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
    },
    tableDesign1: {
        borderColor: '#DCDCDC',
        borderWidth: 1,
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: -1
    },
})