# CarePulse — Home Healthcare App (React Native / Expo)

Home healthcare monitoring app UI, built with clean modular architecture.

<img width="407" height="410" alt="Screenshot 2026-07-15 223242" src="https://github.com/user-attachments/assets/eb22e22f-77ae-44bf-a49b-b2758e59f45b" />
<img width="407" height="410" alt="Screenshot 2026-07-15 223242" src="https://github.com/user-attachments/assets/161a4051-99a9-4624-b16a-1f04da839b7c" />
<img width="410" height="410" alt="Screenshot 2026-07-15 223338" src="https://github.com/user-attachments/assets/69e8e014-5650-4f04-8d53-7f6374f0ece5" />
## Architecture

```
carepulse/
├── App.js                        # Entry point (SafeArea + StatusBar + Navigator)
├── src/
│   ├── theme/index.js            # Design tokens: colors, radii, spacing, shadows
│   ├── data/mockData.js          # Mock data layer (swap with real API later)
│   ├── components/index.js       # Reusable UI: TopBar, SearchBar, PillButton, CTA, PersonRow...
│   ├── navigation/AppNavigator.js# Bottom tabs + nested stacks
│   └── screens/                  # One file per screen
│       ├── DashboardScreen.js    # Greeting, mood check-in, reminders, metric cards
│       ├── MyHealthScreen.js     # Metrics grid + connected devices
│       ├── BloodPressureScreen.js# Day/Week/Month/Year, stats, SVG line chart
│       ├── MeasureScreen.js      # Animated heart, live progress, ECG line
│       ├── CareScreen.js         # Doctors + Family lists (Call/Chat)
│       └── BrowseScreen.js       # Reports, appointments, settings
```

## Run it — step by step

1. Install Node.js 18+ and the Expo Go app on your phone.
2. `cd carepulse`
3. `npm install`
4. `npx expo start`
5. Scan the QR code with Expo Go (Android) or the Camera app (iOS).

## Navigation flow

- Tabs: Dashboard · My Health · Care · Browse
- Dashboard → tap "Blood Pressure" card → BP detail → "Measure Now" → Measure screen
- My Health → tap "Blood Pressure" tile → same BP flow
- Measure auto-completes at 100% and returns to results; Pause/Resume works.

## Next steps (when you want real functionality)

- Replace `src/data/mockData.js` with an API service (`src/services/api.js`)
- Add state management (Zustand or React Query) for live vitals
- Bluetooth device integration: `react-native-ble-plx` for BP cuffs / oximeters
- Push notifications for alerts: `expo-notifications`
- Auth: `expo-auth-session` or Firebase Auth
