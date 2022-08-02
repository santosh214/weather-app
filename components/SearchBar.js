import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { EvilIcons } from '@expo/vector-icons'
const SearchBar = ({ fetchWeatherData }) => {
    const [cityName, setCityName] = useState('')
    return (
        <View style={styles.searchBar}>
            <TextInput style={styles.input} placeholder="Enter City Name" value={cityName} onChangeText={(text) => {  setCityName(text) }} />
            <EvilIcons name='search' size={28} color='black' onPress={() => fetchWeatherData(cityName)} />
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    searchBar: {
        marginTop: 35,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Dimensions.get('screen').width - 60,
        borderWidth: 1.5,
        paddingVertical: 10,
        borderRadius: 25,
        marginHorizontal: 10,
        backgroundColor: 'lightgray',
        borderColor: 'lightgray',
        paddingHorizontal: 10
    },

})