<img src="./docs/github-banner.png" alt="TravelMap banner" align="center" />



## 📑 Concept
TravelMap is an application that scans the metadata of photos from a user's gallery to determine the locations and dates of past trips. It then allows users to visualize these locations on an interactive map and add personal notes or additional details for each trip.

<img src="https://img.shields.io/badge/Language-React%20Native-blue" alt="React Native" align="center" />
<img src="https://img.shields.io/github/last-commit/AlexysGromard/TravelMap" alt="Last update" align="center" />


## 🛠 Main features

1. **Photo metadata analysis** :
   - The application scans the user's gallery to extract geolocation information (latitude, longitude) and shooting dates (via EXIF metadata).
   - It then displays a color on the country (or state/region) the person has visited.

2. **Interactive map** :
   - Once the analysis is complete, a world map (or regional map depending on the zoom level) displays the user's trips, with "clusters" of photos taken in close proximity. By tapping on a specific point, the user can view the photos associated with that location.
   - Each country/state/region on the map is clickable, allowing the user to view trip details (photos, dates, etc.).

3. **Trip organization** :
   - The application automatically groups photos by trip based on geographic and temporal proximity.

4. **Security and privacy** :
   - All analyzed data is stored locally on the device.
   - No data is sent to third-party servers without the explicit consent of the user.

## 🏗️ Build and Run
### Requirements
Before starting, make sure you have the following installed on your machine:
- Node.js (v20.17.0 or higher)
- npm or yarn
- Expo CLI (installed globally via `npm install -g expo-cli`)
- React Native
- Android Studio or Xcode (for running on simulators)
- Watchman (optional: for macOS users)

### Installing Dependencies
Clone the project and install the necessary dependencies using npm or yarn.
```bash
git clone https://github.com/AlexysGromard/TravelMap.git
cd TravelMap
npm install # or yarn install
```

### Running the Project Locally
To run the app in development mode, use the following command:
```bash
npm start       # To start the Expo development server
npm run android # To run the app on an Android simulator
npm run ios     # To run the app on an iOS simulator
```
> Note: Make sure you have either Android Studio or Xcode installed and configured properly for the respective platforms.

### Building for Production
To build the app for production, use the following command:
```bash
# Build a native Android app
npx expo run:android

# Build a native iOS app
npx expo run:ios
```