import { useEffect,useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
function HomeScreen({navigation}) {

    const [state, setState] = useState("");

    useEffect(() => {
        setState("Hello");
    }, []);

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>

        <TouchableOpacity style={styles.button} onPress={function(){navigation.push('Details',{
            sendData:state
        })}}>
            <Text style={styles.text}>Go to Details</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.button} onPress={function(){navigation.push('Camera')}}>
            <Text style={styles.text}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={function(){navigation.push('Video')}}>
            <Text style={styles.text}>Take Video</Text>
          </TouchableOpacity>
      </View>
    );
  }

  const styles = StyleSheet.create({
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      margin: 4,
    },
    button: {
      flex: 1,
      alignSelf: 'flex-center',
      alignItems: 'center',
    },
    text: {
      fontSize: 12,
      fontWeight: 'bold',
      color: 'black',
    },
  });
  
  export default HomeScreen;