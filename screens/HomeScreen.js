import React, { useContext, useMemo, useState } from 'react';
import { View, Text, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { RecipeContext } from '../contexts/RecipeContext';
import RecipeCard from '../components/RecipeCard';

const categories = ['All', 'My Food', 'My Favorites', 'Beef', 'Chicken', 'Dessert', 'Lamb', 'Miscellaneous', 'Pizza'];

export default function HomeScreen({ navigation }) {
    const { recipes } = useContext(RecipeContext);
    const [filter, setFilter] = useState('All');

    const filtered = useMemo(() => {
        if (filter === 'All') return recipes;
        if (filter === 'My Favorites') return recipes.filter(r => r.favorite);
        if (filter === 'My Food') return recipes.filter(r => r.owner);
        return recipes.filter(r => r.category === filter);
    }, [recipes, filter]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.header}>
                <Text style={styles.h1}>Make your own food, stay at <Text style={{ color: '#f39c12' }}>home</Text></Text>
            </View>

            <View style={{ height: 100 }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center', padding: 12 }}>
                    {categories.map(c => (
                        <TouchableOpacity key={c} onPress={() => setFilter(c)} style={[styles.cat, filter === c && styles.catActive]}>
                            <Text style={{ color: filter === c ? '#fff' : '#333' }}>{c}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <FlatList
                data={filtered}
                keyExtractor={i => i.id}
                contentContainerStyle={{ padding: 8 }}
                renderItem={({ item }) => (
                    <RecipeCard item={item} onPress={() => navigation.navigate('RecipeDetail', { id: item.id })} />
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: { padding: 16 },
    h1: { fontSize: 24, fontWeight: '700' },
    cat: { backgroundColor: '#fff', borderRadius: 999, padding: 12, marginRight: 8, borderWidth: 1, borderColor: '#eee' },
    catActive: { backgroundColor: '#2ecc71', borderColor: '#2ecc71' }
});
