// src/screens/CareScreen.js
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { TopBar, SearchBar, SectionHead, PersonRow } from '../components';
import { colors, radii } from '../theme';
import { user, careCircle } from '../data/mockData';

export default function CareScreen() {
  return (
    <ScrollView style={s.wrap} contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
      <TopBar title="Care" avatar={user.avatar} />
      <SearchBar />

      <View style={s.chips}>
        <Text style={s.chipLabel}>Shared with</Text>
        <TouchableOpacity style={s.chip}>
          <Text style={s.chipText}>Supported</Text>
        </TouchableOpacity>
      </View>

      <SectionHead title="Doctors" />
      {careCircle.doctors.map((p) => (
        <PersonRow key={p.id} person={p} onAction={() => {}} />
      ))}

      <SectionHead title="Family" />
      {careCircle.family.map((p) => (
        <PersonRow key={p.id} person={p} onAction={() => {}} />
      ))}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#fff' },
  chips: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 18 },
  chipLabel: { fontSize: 14, color: colors.ink3, fontWeight: '600' },
  chip: { borderWidth: 1.5, borderColor: colors.teal, backgroundColor: colors.tealChip, borderRadius: radii.pill, paddingHorizontal: 18, paddingVertical: 7 },
  chipText: { color: colors.teal, fontWeight: '800', fontSize: 13 },
});
