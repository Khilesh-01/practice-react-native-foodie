import React, { useContext } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { RecipeContext } from '../contexts/RecipeContext';
import RecipeCard from '../components/RecipeCard';
import HeaderBack from '../components/HeaderBack';

export default function MyRecipes({ navigation }) {
    const { recipes, deleteRecipe } = useContext(RecipeContext);
    const mine = recipes.filter(r => r.owner);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderBack title="My Recipes" right={
                <TouchableOpacity onPress={() => navigation.navigate('AddEditRecipe', { mode: 'add' })}>
                    <Text style={{ fontWeight: '700', color: '#f39c12' }}>Add New</Text>
                </TouchableOpacity>
            } />
            {mine.length === 0 ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>No recipes added yet.</Text>
                </View>
            ) : (
                <FlatList
                    data={mine}
                    keyExtractor={i => i.id}
                    contentContainerStyle={{ padding: 12 }}
                    renderItem={({ item }) => (
                        <RecipeCard item={item} onPress={() => navigation.navigate('RecipeDetail', { id: item.id })} />
                    )}
                />
            )}
        </SafeAreaView>
    );
}
