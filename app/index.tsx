import weatherRequest from '@/shared/api';
import { Link, useRouter } from 'expo-router';
import { SetStateAction, useState } from 'react';
import { StyleSheet, Image, Platform, Text, SafeAreaView, View, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { red } from 'react-native-reanimated/lib/typescript/Colors';

import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Index() {

  const [city, setCity] = useState('')
  const [icon, setIcon] = useState('')
  const [wind, setWind] = useState('')
  const [wType, setwType] = useState('')
  const [pressure, setPressure] = useState('')
  const [temp, setTemp] = useState<undefined | number>(undefined)

  const bg = { uri: "https://avatars.mds.yandex.net/i?id=82df1ea8f3ff7fb944f8d83ba400f5ec_l-9156331-images-thumbs&n=13" }

  const router = useRouter()

  const handleChange = (e: string) => {
    setCity(e)
  }

  const handleSubmit = async () => {
    const cityRes = (await weatherRequest.cityReq((city)))

    if (cityRes.length < 1) return

    const cityKey = cityRes[0].Key
    const weatherRes = (await weatherRequest.weatherReq(cityKey))

    setTemp(weatherRes[0].Temperature.Metric.Value)

    const pic = weatherRes[0].WeatherIcon.toString()
    setIcon("https://developer.accuweather.com/sites/default/files/" + pic.padStart(2, '0') + "-s.png")

    setWind(weatherRes[0].Wind.Speed.Metric.Value.toString())

    setwType(weatherRes[0].WeatherText.toString().toUpperCase())

    setPressure(weatherRes[0].Pressure.Metric.Value.toString())
  }

  const handlePress = () => {
    router.push('/week')
  }

  const icon1 = { uri: "https://static.tildacdn.com/tild3863-6237-4836-b635-323930613138/noun_1065028.png" }
  const icon2 = { uri: "https://cdn4.iconfinder.com/data/icons/weather-meteorology-1/32/weather-wind-1024.png" }
  const icon3 = { uri: "https://fcar-rus.ru/wa-data/public/shop/catimg2/10/image/chestirenka_4.png" }
  const icon4 = { uri: icon }

  return (
    <SafeAreaProvider>
      <ImageBackground source={bg} resizeMode='cover' style={styles.container}>

        <View style={styles.cntr}>
          <View style={{ flexDirection: 'row' }}>
            <Image source={icon4} style={styles.icons} />
            <Text style={styles.text2}>
              {wType}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Image source={icon1} style={styles.icons} />
            <Text style={styles.text2}>
              Температура: {temp} °C
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Image source={icon2} style={styles.icons} />
            <Text style={styles.text2}>
              Ветер: {wind} км/ч
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Image source={icon3} style={styles.icons} />
            <Text style={styles.text2}>
              Давление: {pressure} мм рт.ст.
            </Text>
          </View>

        </View>

        <TextInput style={styles.input} onChangeText={handleChange} value={city} placeholder='Введите название города'/>
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.text}>
            ПРОГНОЗ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.text}>
            ПРОГНОЗ НА 5 ДНЕЙ
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  icons: {
    width: 75,
    height: 75,
    backgroundColor: 'transparent',
  },
  cntr: {
    backgroundColor: "lavender",
    maxWidth: 350,
    minWidth: 350,
    flexDirection: 'column',
    minHeight: 400,
    maxHeight: 400,
    alignSelf: 'center',
    borderColor: 'navy',
    borderRadius: 10,
    borderWidth: 2,
    paddingTop: 40,
    paddingLeft: 10
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
    fontSize: 24,
    alignItems: 'center',
    alignContent: 'center',
    textAlignVertical: 'center',
    verticalAlign: 'middle',
    textAlign: 'center',
    alignSelf: 'center',
    margin: 7
  }
});
