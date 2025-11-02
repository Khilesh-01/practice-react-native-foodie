import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HeaderBack({ title, right }) {
    const nav = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => nav.goBack()} style={styles.back}>
                <Text style={{ fontSize: 16 }}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <View style={{ width: 60 }}>{right}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { paddingTop: 40, paddingBottom: 10, alignItems: 'center', backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#eee', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 12 },
    back: { width: 60 },
    title: { fontWeight: '700', fontSize: 18 }
});
