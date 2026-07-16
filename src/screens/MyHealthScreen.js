// src/screens/MyHealthScreen.js
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TopBar, SearchBar, SectionHead } from '../components';
import { colors, radii, shadow } from '../theme';
import { user, healthTiles, devices } from '../data/mockData';

export default function MyHealthScreen({ navigation }) {
  return (
    <ScrollView style={s.wrap} contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
      <TopBar title="My Health" avatar={user.avatar} />
      <SearchBar />

      <SectionHead title="My metrics" />
      <View style={s.grid}>
        {healthTiles.map((t) => (
          <TouchableOpacity
            key={t.id}
            style={s.tile}
            onPress={() => t.id === 'bp' && navigation.navigate('BloodPressure')}>
            <View style={s.tileIcon}>
              <Ionicons name={`${t.icon}-outline`} size={20} color={colors.teal} />
            </View>
            <Text style={s.tileLabel}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <SectionHead title="Connected devices" />
      {devices.map((d) => (
        <View key={d.id} style={s.device}>
          <Text style={{ fontSize: 16 }}>{d.icon}</Text>
          <Text style={s.deviceName}>{d.name}</Text>
          <View style={s.status}>
            <Text style={s.statusText}>{d.status}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#fff' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 10 },
  tile: { width: '47.8%', backgroundColor: '#fff', borderWidth: 1, borderColor: colors.line, borderRadius: radii.lg, paddingVertical: 22, alignItems: 'center', gap: 12, ...shadow.card },
  tileIcon: { width: 46, height: 46, borderRadius: 23, borderWidth: 1.5, borderColor: colors.teal, alignItems: 'center', justifyContent: 'center' },
  tileLabel: { fontWeight: '700', fontSize: 14, color: colors.ink },
  device: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#fff', borderWidth: 1, borderColor: colors.line, borderRadius: radii.md, padding: 16, marginBottom: 10, ...shadow.card },
  deviceName: { flex: 1, fontWeight: '700', fontSize: 14, color: colors.ink },
  status: { backgroundColor: colors.tealChip, borderRadius: radii.pill, paddingHorizontal: 12, paddingVertical: 4 },
  statusText: { color: colors.teal, fontSize: 12, fontWeight: '800' },
});
