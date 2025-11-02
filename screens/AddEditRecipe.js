import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Image, StyleSheet, Alert } from 'react-native';
import HeaderBack from '../components/HeaderBack';
import { RecipeContext } from '../contexts/RecipeContext';
import * as ImagePicker from 'expo-image-picker';

export default function AddEditRecipe({ navigation, route }) {
    const { addRecipe, updateRecipe, recipes } = useContext(RecipeContext);
    const mode = route.params?.mode || 'add';
    const editingId = route.params?.id;
    const existing = recipes.find(r => r.id === editingId) || {};

    const [title, setTitle] = useState(existing.title || '');
    const [category, setCategory] = useState(existing.category || '');
    const [time, setTime] = useState(existing.time || '');
    const [servings, setServings] = useState(String(existing.servings || '1'));
    const [calories, setCalories] = useState(String(existing.calories || '0'));
    const [difficulty, setDifficulty] = useState(existing.difficulty || 'Easy');
    const [image, setImage] = useState(existing.image || null);
    const [ingredientsText, setIngredientsText] = useState(existing.ingredients ? existing.ingredients.join(',') : '');
    const [stepsText, setStepsText] = useState(existing.steps ? existing.steps.join('\n') : '');

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permissions required', 'This app needs permission to access your photos.');
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({ quality: 0.7, base64: false });
        if (!result.cancelled) setImage(result.uri);
    };

    const save = () => {
        if (!title.trim()) return Alert.alert('Validation', 'Title is required.');
        const recipe = {
            id: existing.id,
            title: title.trim(),
            image,
            category,
            time,
            servings: Number(servings) || 1,
            calories: Number(calories) || 0,
            difficulty,
            ingredients: ingredientsText.split(',').map(s => s.trim()).filter(Boolean),
            steps: stepsText.split('\n').map(s => s.trim()).filter(Boolean),
            favorite: existing.favorite || false,
            owner: true
        };

        if (mode === 'edit') updateRecipe(recipe);
        else addRecipe(recipe);
        navigation.goBack();
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderBack title={mode === 'edit' ? 'Edit Recipe' : 'Add New Recipe'} />
            <ScrollView style={{ padding: 12 }}>
                <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
                    {image ? <Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} /> : <Text>Tap to pick image</Text>}
                </TouchableOpacity>

                <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} />
                <TextInput placeholder="Category" value={category} onChangeText={setCategory} style={styles.input} />
                <TextInput placeholder="Time (eg. 35 Mins)" value={time} onChangeText={setTime} style={styles.input} />
                <TextInput placeholder="Servings" value={servings} onChangeText={setServings} keyboardType="numeric" style={styles.input} />
                <TextInput placeholder="Calories" value={calories} onChangeText={setCalories} keyboardType="numeric" style={styles.input} />
                <TextInput placeholder="Difficulty" value={difficulty} onChangeText={setDifficulty} style={styles.input} />

                <Text style={{ fontWeight: '700', marginTop: 10 }}>Ingredients (comma separated)</Text>
                <TextInput value={ingredientsText} onChangeText={setIngredientsText} style={[styles.input, { height: 60 }]} multiline />

                <Text style={{ fontWeight: '700', marginTop: 10 }}>Steps (newline separated)</Text>
                <TextInput value={stepsText} onChangeText={setStepsText} style={[styles.input, { height: 120 }]} multiline />

                <TouchableOpacity style={styles.saveBtn} onPress={save}><Text style={{ color: '#fff', fontWeight: '700' }}>Save Recipe</Text></TouchableOpacity>
                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    imageBox: { height: 180, backgroundColor: '#eee', borderRadius: 12, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
    input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginTop: 8, borderWidth: 1, borderColor: '#eee' },
    saveBtn: { backgroundColor: '#f39c12', padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 20 }
});
