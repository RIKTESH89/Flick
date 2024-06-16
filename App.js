
import FlickVideo from './components/Video';
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen  from './components/Home';
import CameraScreen from './components/CameraScreen';
import Feed from './components/Feed';

function DetailsScreen(){
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  )
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} options={{ title:"Snapshot"}} />
        <Stack.Screen name="Feed" component={Feed} />
        <Stack.Screen name="Video" component={FlickVideo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;