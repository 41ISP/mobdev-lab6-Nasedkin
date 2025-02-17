import { Image, StyleSheet, Platform, View, Text, TouchableOpacity, ImageBackground, TextInput } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { IForecast } from '@/entities/forecast';
import weatherRequest from '@/shared/api';
import { customAlphabet } from 'nanoid/non-secure';
import { ScrollView } from 'react-native';

export default function HomeScreen() {
  const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10)
  const [city, setCity] = useState('')

  const [forecast, setForecast] = useState<IForecast | undefined>(undefined)

  const bg = { uri: "https://avatars.mds.yandex.net/i?id=82df1ea8f3ff7fb944f8d83ba400f5ec_l-9156331-images-thumbs&n=13" }

  const router = useRouter()

  const handlePress = () => {
    router.push('/')
  }

  const handleChange = (e: string) => {
    setCity(e)
  }

  const handleSubmit = async () => {
    const cityRes = (await weatherRequest.cityReq(city))

    if (cityRes.length < 1) return

    const cityKey = cityRes[0].Key
    setForecast(await weatherRequest.forecastReq(cityKey))
  }

  return (
    <SafeAreaProvider>
      <ImageBackground source={bg} resizeMode='cover' style={styles.container}>

        <View style={styles.cntr}>

          <ScrollView>
            <Text>
              {forecast && forecast.DailyForecasts.map((el) =>

                <View style={styles.grid}>
                  <Image style={styles.icons} src={"https://developer.accuweather.com/sites/default/files/" + el.Day.Icon.toString().padStart(2, '0') + "-s.png"} alt='picture' />
                  <View key={nanoid()}>
                    <Text style={styles.text2}>
                      {el.Date.substring(5, 10).replace('-', '.')} | {el.Day.IconPhrase}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.text2}>
                      Макс:  {el.Temperature.Maximum.Value} °C | Мин:  {el.Temperature.Minimum.Value} °C
                    </Text>
                  </View>
                </View>
              )}
            </Text>
            <Text>
            </Text>
              <Text style={styles.text2}>
                {forecast?.Headline.Text}
              </Text>
          </ScrollView>
        </View>

        <TextInput style={styles.input} onChangeText={handleChange} placeholder='Введите название города'/>

        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.text}>
            ПРОГНОЗ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.text}>
            ПРОГНОЗ НА 1 ДЕНЬ
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  grid: {
    width: 350,
    padding: 15,
  },
  icons: {
    width: 100,
    height: 100,
    backgroundColor: 'gray',
    borderColor: 'navy',
    alignSelf: 'center',
    borderRadius: 20,
    borderWidth: 2,
  },
  cntr: {
    backgroundColor: "lavender",
    maxWidth: 350,
    minWidth: 350,
    flexDirection: 'column',
    minHeight: 500,
    maxHeight: 500,
    alignSelf: 'center',
    borderColor: 'navy',
    borderRadius: 10,
    borderWidth: 2,
  },
  text: {
    alignSelf: "center",
    verticalAlign: 'bottom',
    backgroundColor: 'lavender',
    padding: 10,
    margin: 5,
    color: 'navy',
    borderColor: 'navy',
    borderRadius: 10,
    borderWidth: 2
  },
  input: {
    alignSelf: 'center',
    backgroundColor: 'lavender',
    margin: 10,
    color: 'navy',
    borderColor: 'navy',
    borderRadius: 10,
    borderWidth: 2,
    width: 250
  },
  text2: {
    color: 'navy',
    fontSize: 20,
    alignItems: 'center',
    alignContent: 'center',
    textAlignVertical: 'center',
    verticalAlign: 'middle',
    textAlign: 'center',
    alignSelf: 'center',
  }
});
