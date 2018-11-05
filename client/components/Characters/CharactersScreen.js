import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet, Dimensions, TextInput, FlatList, ImageBackground, Switch, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { getCharacters } from '../Redux/Actions';
import Filter from './Filter/filter';
import CharacterDetails from './Filter/characterDetails'
import { _ } from 'lodash'
// import { connect } from 'react-redux';
// import { getDog } from './actions';
// import { loginPageWallpaper } from './images/loginPageWallpaper.jpg';


//class MyListItem extends React.PureComponent {

class Characters extends React.PureComponent {
    state = {
        numberRender: 100, // amount of characters I want added to the character list
        filterModal: false,
        detailsModal: false,
        search: '',
        characterID: 1,
        isCompleteLoaded: false,
        characterThumbnail: [],
        arrayNames: [],
        test: [],
        newSearchID: [],
        toggleView: false,
        characterDetails: '',
        offset: 1
    }

    changeFilterList = (thumbnails, ID) => {
        this.setState({
            characterThumbnail: thumbnails,
            newSearchID: ID
        })
    }

    onEndChange = () => {
        this.setState({
            numberRender: this.state.numberRender + 100,
            offset: this.state.offset + 100
        },
            () => {
                this.getCharacterThumbnails();
            }
        )
    }

    filterModalHandler = (visible) => {
        this.setState({
            filterModal: visible
        })
    }

    detailsModalHandler = (visible) => {
        this.setState({
            detailsModal: visible
        })
    }

    switchView = () => {
        this.setState({
            toggleView: !this.state.toggleView
        })
    }

    contains = ({ aliases, id, units }, query) => {
        let newAliases = aliases.join(' ')
        if (newAliases.includes(query) || id == (query) || units[0].toLowerCase().includes(query)) {
            return true;
        }
        return false;
    }

    getArrayNames = search => {
        let newArrayNames = [];
        let { characterData } = this.props;
        for (i = 1; i <= this.state.numberRender; i++) {
            newArrayNames[i - 1] = { ...characterData.characters[i], aliases: characterData.characters[i].aliases.map(function (x) { return x.toLowerCase() }) }
        } // where I store in all the character Data while editing the aliases of the character datas
        this.getCharacterThumbnails() //Reseting my characterThumbnails to refill it 
        this.setSearchID()  //Resetting my search ID list which is just an array of numbers corresponding to the characterThumbnails array ID number
        this.setState({
            arrayNames: newArrayNames
        },
            () => { //This is a function call which gets called after I set the state, its just for ordering
                const formatSearch = search.toLowerCase() //Setting my search to lowercase for matching
                const data = _.filter(this.state.arrayNames, user => {
                    return this.contains(user, formatSearch);
                }); //My actual filter, takes in the arrayNames that I defined before
                this.setState({
                    test: data
                }, //Setting a new state into the data sets I need to render them
                    () => {
                        let newArrayIndex = []
                        let searchID = []
                        for (let i = 1; i <= this.state.numberRender; i++) {
                            for (let j = 0; j < this.state.test.length; j++) {
                                if (this.state.test[j].units[0].toLowerCase() == characterData.characters[i].units[0].toLowerCase()) {
                                    newArrayIndex[j] = this.state.characterThumbnail[characterData.characters[i].id - 1]
                                    searchID[j] = characterData.characters[i].id
                                } //Just filtering out the images for the ArrayNames that were filtered out before and also changing the searchID that corresponds to each image accordingly
                            }
                        }
                        this.setState({
                            characterThumbnail: newArrayIndex,
                            newSearchID: searchID
                        })
                    }
                )
            }
        )
    }

    getCharacterThumbnails = () => { //Function to refill my characterThumbnail state with all the images
        let newCharacterThumbnail = []
        let { characterDetails, offset } = this.state
        if (this.state.numberRender < 2255) {
            for (let i = offset; i <= this.state.numberRender; i++) {
                newCharacterThumbnail[i-offset] = { 
                    thumbnail: characterDetails.characters[i].res.thumbnail,
                    id: characterDetails.characters[i].id
                }
            }
        } else {
            for (let i = offset; i < 2255; i++) {
                newCharacterThumbnail[i] = {
                    thumbnail: characterDetails.characters[i].res.thumbnail,
                    id: characterDetails.characters[i].id
                }
            }
        }
        let newTest = [...this.state.characterThumbnail, ...newCharacterThumbnail]
        this.setState({
            characterThumbnail: newTest
        })
    }

    componentDidMount() {
        this.props.navigation.setParams({
            filterModal: this.filterModalHandler
        });
        this.setState({
            characterDetails: this.props.characterData,
            isCompleteLoaded: true,
        },
        () => {
            this.getCharacterThumbnails() //Setting characterThumbnails array
        })
    }

    render() {
        let { search } = this.state;
        let { width } = Dimensions.get('window'); //Getting the width of the device
        let { characterData } = this.props;
        return (
                <View>
                    {/* My Filter Modal */}
                    <Filter filterModalHandler={this.filterModalHandler} filterModal={this.state.filterModal} {...this.props} numberRender={this.state.numberRender} characterThumbnail={this.state.characterThumbnail} changeFilterList={this.changeFilterList} />

                    {/*  Modal for Each Character Details  */}

                    {characterData && (<CharacterDetails detailsModalHandler={this.detailsModalHandler} detailsModal={this.state.detailsModal} characterID={this.state.characterID} characterThumbnail={this.state.characterThumbnail} />)}

                    {/* My Search Bar and Buttons Besides it */}
                    <View style={{ flexDirection: 'row', backgroundColor: 'white', margin: 10, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Switch
                            onValueChange={this.switchView}
                            value={this.state.toggleView}
                            style={{ marginLeft: 5 }}
                        />
                        <TextInput
                            style={{ height: 50, borderColor: 'gray', flex: 1, marginLeft: 10 }}
                            placeholder='Type to Filter'
                            underlineColorAndroid='transparent'
                            clearButtonMode='always'
                            onChangeText={search => { this.setState({ search }) }}
                            value={search}
                        />
                        <TouchableOpacity onPress={() => this.getArrayNames(this.state.search)}>
                            <Icon name='search' containerStyle={{ marginRight: 5 }} />
                        </TouchableOpacity>

                    </View>

                    {/* My Flatlist that renders the images on the */}
                    {this.state.isCompleteLoaded == true && this.state.toggleView == false
                        ? <View style={{ justifyContent: 'center', alignItems: 'center', margin: 2 }}>
                            <FlatList
                                data={this.state.characterThumbnail}
                                numColumns={Math.floor(width / 45)}
                                // initialNumToRender={10}
                                onEndReached={() => this.onEndChange()}
                                onEndReachedThreshold={0}
                                ListFooterComponent={() => (<View style={{ height: 150 }} />)}
                                ListEmptyComponent={<Text style={{ fontSize: 25, textAlign: 'center' }}>Nothing Was Found</Text>}
                                keyExtractor={(item, index) => item.id + ''}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity onPress={() => this.setState({ detailsModal: true, characterID: item.id})}>
                                        <Image
                                            source={{ uri: item.thumbnail }}
                                            style={{ width: 45, height: 45 }}
                                        />
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                        : this.state.isCompleteLoaded == false && this.state.toggleView == false && <Image source={require('../../assets/loading.gif')} />
                    }
                    {/* Flatlist that Toggles my View on the Characters List, List view with character details in there */}
                    {this.state.isCompleteLoaded == true && this.state.toggleView == true
                        ?
                        <ScrollView horizontal>
                            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', opacity: 0.7, marginRight: 10, marginLeft: 10 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 10, backgroundColor: '#808080' }}>
                                    <View style={{ width: 51, alignItems: 'flex-start', marginLeft: 5, marginRight: 5, }}></View>
                                    <Text style={{ marginLeft: 5, marginRight: 5, width: 150 }}>Name</Text>
                                    <Text style={{ marginLeft: 5, marginRight: 5, width: 60 }}>Class</Text>
                                    <Text style={{ marginLeft: 5, marginRight: 5, fontSize: 12, fontWeight: 'bold', width: 50 }}>HP</Text>
                                    <Text style={{ marginLeft: 5, marginRight: 5, fontSize: 12, fontWeight: 'bold', width: 50 }}>ATK</Text>
                                    <Text style={{ marginLeft: 5, marginRight: 5, fontSize: 12, fontWeight: 'bold', width: 50 }}>RCV</Text>
                                    <Text style={{ marginLeft: 5, marginRight: 5, fontSize: 12, fontWeight: 'bold', width: 50 }}>Cost</Text>
                                    <Text style={{ marginLeft: 5, marginRight: 5, fontSize: 12, fontWeight: 'bold', width: 40 }}>Rarity</Text>
                                </View>
                                {characterData && (<FlatList
                                    data={this.state.characterThumbnail}
                                    initialNumToRender={14}
                                    onEndReached={() => this.onEndChange()}
                                    onEndReachedThreshold={0.9}
                                    ListFooterComponent={() => (<View style={{ height: 100 }} />)}
                                    ListEmptyComponent={<Text style={{ fontSize: 25, textAlign: 'center' }}>Nothing Was Found</Text>}
                                    keyExtractor={(item, index) => index + ''}
                                    renderItem={({ item, index }) => (
                                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} onPress={() => this.setState({ detailsModal: true, characterID: item.id })}>
                                            <Image
                                                source={{ uri: item.thumbnail }}
                                                style={{ width: 51, height: 51, alignItems: 'flex-start', margin: 5 }}
                                            />
                                            <Text style={{ margin: 5, width: 150 }}>{characterData.characters[item.id].units[0]}</Text>
                                            {characterData.characters[item.id].units[2].length == 2
                                                ? <Text style={{ margin: 5, width: 60 }}>{characterData.characters[item.id].units[2].join(', ')}</Text>
                                                : <Text style={{ margin: 5, width: 60 }}>{characterData.characters[item.id].units[2]}</Text>
                                            }
                                            <Text style={{ margin: 5, fontSize: 18, fontWeight: 'bold', width: 50 }}>{characterData.characters[item.id].units[12]}</Text>
                                            <Text style={{ margin: 5, fontSize: 18, fontWeight: 'bold', width: 50 }}>{characterData.characters[item.id].units[13]}</Text>
                                            <Text style={{ margin: 5, fontSize: 18, fontWeight: 'bold', width: 50 }}>{characterData.characters[item.id].units[14]}</Text>
                                            <Text style={{ margin: 5, fontSize: 18, fontWeight: 'bold', width: 50 }}>{characterData.characters[item.id].units[4]}</Text>
                                            <Text style={{ fontSize: 18, fontWeight: 'bold', width: 40 }}>{characterData.characters[item.id].units[3]}</Text>
                                        </TouchableOpacity>
                                    )}
                                />)}
                            </View>
                        </ScrollView>
                        : this.state.isCompleteLoaded == false && this.state.toggleView == true && <Image source={require('../../assets/loading.gif')} />
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(Characters);
