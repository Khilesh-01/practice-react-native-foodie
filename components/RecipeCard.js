import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function RecipeCard({ item, onPress, onEdit, compact = false }) {
    return (
        <TouchableOpacity style={[styles.card, compact && styles.compact]} onPress={onPress}>
            <Image source={item.image ? { uri: item.image } : require('../assets/placeholder.png')} style={styles.image} />
            <View style={styles.meta}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.cat}>{item.category}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: { backgroundColor: '#fff', borderRadius: 12, margin: 8, overflow: 'hidden', elevation: 2, flexDirection: 'row' },
    compact: { flexDirection: 'row', alignItems: 'center', padding: 8 },
    image: { width: 120, height: 100, resizeMode: 'cover' },
    meta: { flex: 1, padding: 10, justifyContent: 'center' },
    title: { fontSize: 16, fontWeight: '700' },
    cat: { color: '#666', marginTop: 6 }
});
