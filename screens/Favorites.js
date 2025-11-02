import React, { useContext } from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import { RecipeContext } from '../contexts/RecipeContext';
import RecipeCard from '../components/RecipeCard';
import HeaderBack from '../components/HeaderBack';

export default function Favorites({ navigation }) {
    const { recipes } = useContext(RecipeContext);
    const favs = recipes.filter(r => r.favorite);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderBack title="My Favorite Recipes" />
            <FlatList
                data={favs}
                keyExtractor={i => i.id}
                contentContainerStyle={{ padding: 12 }}
                renderItem={({ item }) => (
                    <RecipeCard item={item} onPress={() => navigation.navigate('RecipeDetail', { id: item.id })} />
                )}
                ListEmptyComponent={<SafeAreaView style={{ alignItems: 'center', marginTop: 40 }}><Text>No favorites yet</Text></SafeAreaView>}
            />
        </SafeAreaView>
    );
}
