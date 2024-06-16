import { useState, useEffect } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Feed() {
    const [feed, setFeed] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const keys = await AsyncStorage.getAllKeys();
                setFeed(keys);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            {feed.map(function(value){
                return (
                <Text style={styles.title}>{value}</Text>
                )
            })}
            <Text style={styles.title}>Feed</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
        flex: 1,
        width: '100%',
    },
    title: {
        fontSize: 4,
        textAlign: 'center',
    },
});
