import { Link } from 'expo-router';
import { StyleSheet, Image, Platform, Text, SafeAreaView, View, TouchableOpacity } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Index() {



  return (
    <SafeAreaProvider>
        <View>
          <Text style={{ color: "#ffffff", padding: 50}}>1</Text>
        </View>
        <TouchableOpacity style={{ backgroundColor: "#ffffff"}}>
          <Link href={'/week'}/>
        </TouchableOpacity>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
