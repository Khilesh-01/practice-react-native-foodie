import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const RecipeContext = createContext();

const STORAGE_KEY = 'FOODIE_RECIPES_V1';

const sampleRecipes = [
    {
        id: 'r1',
        title: 'Beef and Mustard Pie',
        image: null,
        category: 'Beef',
        time: '35 Mins',
        servings: 3,
        calories: 103,
        difficulty: 'Medium',
        ingredients: ['1kg Beef', '2 tbs Plain Flour', '2 tbs Rapeseed Oil'],
        steps: ['Preheat oven...', 'Mix ingredients...', 'Bake 30 mins'],
        favorite: false,
        owner: true
    },
    {
        id: 'r2',
        title: 'Margherita Pizza',
        image: null,
        category: 'Pizza',
        time: '20 Mins',
        servings: 2,
        calories: 250,
        difficulty: 'Easy',
        ingredients: ['1 cup pizza sauce', '2 cups flour', 'yeast'],
        steps: ['Activate yeast', 'Make dough', 'Bake'],
        favorite: false,
        owner: true
    }
];

export function RecipeProvider({ children }) {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const raw = await AsyncStorage.getItem(STORAGE_KEY);
                if (raw) setRecipes(JSON.parse(raw));
                else {
                    setRecipes(sampleRecipes);
                    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(sampleRecipes));
                }
            } catch (e) {
                console.warn('Failed loading recipes', e);
            }
        })();
    }, []);

    useEffect(() => {
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(recipes)).catch(e => console.warn(e));
    }, [recipes]);

    const addRecipe = recipe => {
        setRecipes(prev => [{ ...recipe, id: `r${Date.now()}` }, ...prev]);
    };

    const updateRecipe = updated => {
        setRecipes(prev => prev.map(r => (r.id === updated.id ? updated : r)));
    };

    const deleteRecipe = id => {
        setRecipes(prev => prev.filter(r => r.id !== id));
    };

    const toggleFavorite = id => {
        setRecipes(prev => prev.map(r => (r.id === id ? { ...r, favorite: !r.favorite } : r)));
    };

    return (
        <RecipeContext.Provider value={{ recipes, addRecipe, updateRecipe, deleteRecipe, toggleFavorite }}>
            {children}
        </RecipeContext.Provider>
    );
}
