# TravelMap

## Concept
TravelMap is an application that scans the metadata of photos from a user's gallery to determine the locations and dates of past trips. It then allows users to visualize these locations on an interactive map and add personal notes or additional details for each trip.

## Main features

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

