# 🍽️ Foodie App

A modern **Recipe Discovery and Management App** built with **React Native (Expo)**.  
Foodie allows users to explore, save, and share their favorite recipes — all with a clean and intuitive UI.

---

## 🚀 Features

### 🏠 Main Feed
- Displays a scrollable feed of recipes shared by users.  
- Each recipe card shows an image, title, and category.  
- Horizontal scroll bar at the top for browsing by category.

### 📋 Recipe Details
- Full recipe view including:
  - Ingredients list  
  - Step-by-step cooking instructions  
  - Preparation time, servings, calories, and difficulty  
- “Favorite” toggle to quickly add/remove recipes from favorites.

### ❤️ Favorites Section
- Access and manage your saved recipes.
- View your most loved dishes anytime.

### 🍳 My Food (Personal Recipes)
- Add your own recipes via **Add New Recipe**.
- Upload an image, input ingredients, and write steps.
- Edit or delete your custom recipes anytime.

### 🧭 Additional
- Seamless navigation between screens.
- Back button on every page for easy navigation.

---

## 🧠 Tech Stack

| Category | Technology |
|-----------|-------------|
| Framework | [Expo](https://expo.dev/) (React Native) |
| Language | JavaScript / TypeScript |
| Navigation | React Navigation |
| Storage | AsyncStorage |
| State Management | React Hooks / Context |
| UI | Custom components + React Native Paper / Styled Components |

---

## 📦 Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/foodie-app.git
cd foodie-app
````

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start the Expo development server

```bash
npx expo start
```

Use **Expo Go** app (iOS / Android) to scan the QR code and run the app instantly.

---

## ⚙️ Common Scripts

| Command                | Description                        |
| ---------------------- | ---------------------------------- |
| `npx expo start -c`    | Start Metro with cache reset       |
| `npx expo run:android` | Build & run on Android             |
| `npx expo run:ios`     | Build & run on iOS (macOS only)    |
| `npx expo-doctor`      | Diagnose and fix dependency issues |
| `npm run lint`         | Check for code linting errors      |

---

## 🧩 Project Structure

```
Foodie/
├── assets/              # Images, icons, and static assets
├── components/          # Reusable UI components
├── screens/             # App screens (Home, Details, Favorites, etc.)
├── navigation/          # Navigation stacks and tabs
├── utils/               # Helper functions
├── App.js               # Entry point
└── README.md
```

---

## 🧰 Dependencies

Key libraries:

* `expo`
* `react`
* `react-native`
* `@react-navigation/native`
* `@react-navigation/bottom-tabs`
* `@react-native-async-storage/async-storage`
* `react-native-reanimated`
* `react-native-gesture-handler`
* `react-native-screens`

Install missing Expo-compatible versions anytime using:

```bash
npx expo install <package-name>
```

---

## 🧪 Troubleshooting

If you encounter dependency mismatches:

```bash
npx expo-doctor
npx expo-doctor fix-dependencies
```

If Metro bundler misbehaves:

```bash
npx expo start -c
```

If app crashes after editing packages:

```bash
rm -rf node_modules package-lock.json
npm install
```

---