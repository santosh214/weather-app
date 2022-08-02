import { StyleSheet, Text, View, ActivityIndicator, Platform,  StatusBar } from 'react-native';
import { useState, useEffect } from 'react';
import Weather from './components/Weather';
export default function App() {
  const API_KEY = 'f7072d079d831fbc934f912cd1669a54'
  // const API = 'https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}'
  const [weatherData, setWeatherData] = useState(null)
  const [loaded, setLoader] = useState(false)

  async function fetchWeatherData(city) {
    setLoader(true)
    console.log(city, "cityName")
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    try {

      const response = await fetch(api)

      if (response.status == 200) {
        const data = await response.json()
        // console.log(data)
        setWeatherData(data)
      }
      else {
        console.log("else")
        setWeatherData(null)
      }
      setLoader(false)
    } catch (error) {
      console.log(error)

    }
    // setLoader(true)
  }
  useEffect(() => {
    fetchWeatherData('Indore')

    return () => {
    }
  }, [])

  if (loaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    )
  }
  else if (weatherData == null) {
    return (
      <View style={{...styles.container,backgroundColor:'black'}}>
        <Text style={{color:'#fff'}}>Not Found</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
