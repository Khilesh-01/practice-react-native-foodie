import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RecipeProvider } from './contexts/RecipeContext';
import HomeScreen from './screens/HomeScreen';
import RecipeDetail from './screens/RecipeDetail';
import MyRecipes from './screens/MyRecipes';
import AddEditRecipe from './screens/AddEditRecipe';
import Favorites from './screens/Favorites';
import { Text } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Feed" component={HomeScreen} />
            <Tab.Screen name="MyFood" component={MyRecipes} />
            <Tab.Screen name="Favorites" component={Favorites} />
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <RecipeProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
                    <Stack.Screen name="RecipeDetail" component={RecipeDetail} options={{ headerShown: false }} />
                    <Stack.Screen name="AddEditRecipe" component={AddEditRecipe} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </RecipeProvider>
    );
}
