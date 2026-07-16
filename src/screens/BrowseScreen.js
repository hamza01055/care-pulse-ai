// src/screens/BrowseScreen.js
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TopBar } from '../components';
import { colors, radii, shadow } from '../theme';
import { user } from '../data/mockData';

const ITEMS = [
  { icon: 'document-text-outline', label: 'Health Reports' },
  { icon: 'calendar-outline', label: 'Appointments' },
  { icon: 'chatbubbles-outline', label: 'Messages' },
  { icon: 'settings-outline', label: 'Settings' },
  { icon: 'shield-checkmark-outline', label: 'Privacy & Sharing' },
  { icon: 'help-circle-outline', label: 'Help & Support' },
];

export default function BrowseScreen() {
  return (
    <ScrollView style={s.wrap} contentContainerStyle={{ padding: 20 }}>
      <TopBar title="Browse" avatar={user.avatar} />
      {ITEMS.map((it) => (
        <TouchableOpacity key={it.label} style={s.row}>
          <View style={s.icon}>
            <Ionicons name={it.icon} size={20} color={colors.teal} />
          </View>
          <Text style={s.label}>{it.label}</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.ink3} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#fff' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: '#fff', borderWidth: 1, borderColor: colors.line, borderRadius: radii.md, padding: 16, marginBottom: 10, ...shadow.card },
  icon: { width: 40, height: 40, borderRadius: 12, backgroundColor: colors.tealSoft, alignItems: 'center', justifyContent: 'center' },
  label: { flex: 1, fontWeight: '700', fontSize: 15, color: colors.ink },
});
