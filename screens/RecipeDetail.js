import React, { useContext } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { RecipeContext } from '../contexts/RecipeContext';
import HeaderBack from '../components/HeaderBack';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function RecipeDetail() {
    const { recipes, toggleFavorite } = useContext(RecipeContext);
    const nav = useNavigation();
    const { params } = useRoute();
    const recipe = recipes.find(r => r.id === params.id);

    if (!recipe) return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Recipe not found</Text></View>;

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
            <HeaderBack title="" right={
                <TouchableOpacity onPress={() => toggleFavorite(recipe.id)}>
                    <Text style={{ fontSize: 20 }}>{recipe.favorite ? '❤️' : '🤍'}</Text>
                </TouchableOpacity>
            } />
            <Image source={recipe.image ? { uri: recipe.image } : require('../assets/placeholder.png')} style={{ width: '100%', height: 240 }} />
            <View style={{ padding: 16 }}>
                <Text style={{ fontSize: 22, fontWeight: '800' }}>{recipe.title}</Text>
                <Text style={{ color: '#777', marginTop: 6 }}>{recipe.category} | {recipe.time} | {recipe.servings} servings</Text>

                <View style={{ flexDirection: 'row', marginTop: 16, justifyContent: 'space-between' }}>
                    <View style={styles.stat}><Text style={styles.statVal}>{recipe.time}</Text><Text style={styles.statLabel}>Time</Text></View>
                    <View style={styles.stat}><Text style={styles.statVal}>{String(recipe.servings).padStart(2, '0')}</Text><Text style={styles.statLabel}>Servings</Text></View>
                    <View style={styles.stat}><Text style={styles.statVal}>{recipe.calories}</Text><Text style={styles.statLabel}>Cal</Text></View>
                    <View style={styles.stat}><Text style={styles.statVal}>{recipe.difficulty}</Text><Text style={styles.statLabel}>Difficulty</Text></View>
                </View>

                <Text style={{ fontSize: 18, fontWeight: '700', marginTop: 18 }}>Ingredients</Text>
                {recipe.ingredients.map((ing, idx) => (
                    <View key={idx} style={styles.ingredient}>
                        <Text>{ing}</Text>
                    </View>
                ))}

                <Text style={{ fontSize: 18, fontWeight: '700', marginTop: 18 }}>Steps</Text>
                {recipe.steps.map((s, idx) => (
                    <View key={idx} style={{ marginVertical: 6 }}>
                        <Text style={{ fontWeight: '700' }}>Step {idx + 1}</Text>
                        <Text>{s}</Text>
                    </View>
                ))}

                <View style={{ height: 40 }} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    stat: { alignItems: 'center', backgroundColor: '#fff', padding: 8, borderRadius: 8, borderWidth: 1, borderColor: '#eee', flex: 1, marginRight: 6 },
    statVal: { fontWeight: '700' },
    statLabel: { color: '#777', fontSize: 12 },
    ingredient: { backgroundColor: '#fff5d9', padding: 10, borderRadius: 8, marginTop: 8 }
});
