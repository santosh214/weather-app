import {
    Dimensions,
    ImageBackground,
    StyleSheet,
    Text,
    View,
} from "react-native";
import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
const haze = require("../assets/haze.jpg");
const rainy = require("../assets/rainy.jpg");
const cloudy = require("../assets/sunny.jpg");
const snow = require("../assets/snow.jpg");
const Weather = ({ weatherData,fetchWeatherData }) => {
    const {
        weather,
        name,
        main: { temp, humidity },
        wind: { speed },
    } = weatherData;
    const [{ main }] = weather;
    const [first, setfirst] = useState(null);
    const [backroundImage, setbackroundImage] = useState(null);
    useEffect(() => {
        setbackroundImage(getBackroundImage(main));
        // console.log(main);
        return () => { };
    }, []);

    function getBackroundImage(weather) {
        if (weather == "Haze") {
            return haze;
        } else if (weather == "Rain") {
            return rainy;
        } else if (weather == "Clouds") {
            return cloudy;
        } else if (weather == "Snow") {
            return snow;
        } else {
            return haze;
        }
    }
    let textColor = backroundImage !== haze ? 'black' : 'white'

    return (
        <View style={styles.container}>
            <ImageBackground
                source={backroundImage}
                style={styles.backroundImg}
                resizeMode="cover"
            >
                <SearchBar fetchWeatherData={fetchWeatherData} />
                <View style={{ alignItems: "center" }}>
                    <Text style={{ ...styles.headerText, color: textColor, fontWeight: 'bold', fontSize: 46 }}>{name}</Text>
                    <Text style={{ ...styles.headerText, color: textColor, fontWeight: 'bold' }}>{main}</Text>
                    <Text style={{ ...styles.headerText, color: textColor, fontWeight: 'bold' }}>{temp}°c</Text>
                </View>
                <View style={styles.extraInfo}>
                    <View style={styles.info}>
                        <Text style={{ fontSize: 22, color: 'white' }}>Humidity</Text>
                        <Text style={{ fontSize: 22, color: 'white' }}>{humidity} %</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={{ fontSize: 22, color: 'white' }}>Wind Speed</Text>
                        <Text style={{ fontSize: 22, color: 'white' }}>{speed} m/s</Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

export default Weather;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    backroundImg: {
        flex: 1,
        width: Dimensions.get("screen").width,
    },
    headerText: {
        fontSize: 30,
        marginTop: 10
    },
    extraInfo: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
        padding: 10
    },
    info: {
        width: Dimensions.get("screen").width/2.5,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
