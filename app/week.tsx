import { Image, StyleSheet, Platform, View, Text, TouchableOpacity, ImageBackground, TextInput } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function HomeScreen() {

  const bg = { uri: "https://avatars.mds.yandex.net/i?id=82df1ea8f3ff7fb944f8d83ba400f5ec_l-9156331-images-thumbs&n=13" }

  const router = useRouter()

  const handlePress = () => {
    router.push('/')
  }

  return (
    <SafeAreaProvider>
      <ImageBackground source={bg} resizeMode='cover' style={styles.container}>

        <TextInput style={styles.input} />

        <TouchableOpacity>
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
    justifyContent: "center"
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
});
