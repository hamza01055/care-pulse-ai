// src/components/index.js
// Small reusable UI building blocks shared across screens.

import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, shadow } from '../theme';

export function TopBar({ title, avatar, showBell = true }) {
  return (
    <View style={s.topbar}>
      <Text style={s.title}>{title}</Text>
      <View style={s.topIcons}>
        {showBell && (
          <View>
            <Ionicons name="notifications-outline" size={24} color={colors.ink} />
            <View style={s.dot} />
          </View>
        )}
        {avatar && <Image source={{ uri: avatar }} style={s.avatar} />}
      </View>
    </View>
  );
}

export function SearchBar({ placeholder = 'Search', onChangeText }) {
  return (
    <View style={s.search}>
      <Ionicons name="search" size={18} color={colors.ink3} />
      <TextInput
        style={s.searchInput}
        placeholder={placeholder}
        placeholderTextColor={colors.ink3}
        onChangeText={onChangeText}
      />
    </View>
  );
}

export function SectionHead({ title, onViewAll }) {
  return (
    <View style={s.sectionHead}>
      <Text style={s.h2}>{title}</Text>
      {onViewAll && (
        <TouchableOpacity onPress={onViewAll}>
          <Text style={s.link}>View all</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export function PillButton({ label, onPress, style }) {
  return (
    <TouchableOpacity style={[s.pill, style]} onPress={onPress}>
      <Text style={s.pillText}>{label}</Text>
    </TouchableOpacity>
  );
}

export function CTAButton({ label, onPress }) {
  return (
    <TouchableOpacity style={s.cta} onPress={onPress} activeOpacity={0.85}>
      <Text style={s.ctaText}>{label}</Text>
    </TouchableOpacity>
  );
}

export function PersonRow({ person, onAction }) {
  return (
    <View style={s.personRow}>
      <Image source={{ uri: person.avatar }} style={s.personAvatar} />
      <View style={{ flex: 1 }}>
        <Text style={s.personName}>{person.name}</Text>
        <Text style={s.personRole}>{person.role}</Text>
      </View>
      <PillButton label={person.action} onPress={() => onAction?.(person)} />
      <Ionicons name="ellipsis-vertical" size={16} color={colors.ink3} style={{ marginLeft: 8 }} />
    </View>
  );
}

const s = StyleSheet.create({
  topbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
  title: { fontSize: 26, fontWeight: '800', color: colors.ink },
  topIcons: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  dot: { position: 'absolute', top: 1, right: 2, width: 8, height: 8, borderRadius: 4, backgroundColor: colors.pink, borderWidth: 1.5, borderColor: '#fff' },
  avatar: { width: 38, height: 38, borderRadius: 19 },
  search: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.bg, borderRadius: radii.pill, paddingHorizontal: 18, paddingVertical: 4, marginBottom: 18 },
  searchInput: { flex: 1, fontSize: 15, color: colors.ink, paddingVertical: 10 },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, marginBottom: 12 },
  h2: { fontSize: 17, fontWeight: '800', color: colors.ink },
  link: { color: colors.teal, fontSize: 14, fontWeight: '700' },
  pill: { backgroundColor: colors.teal, borderRadius: radii.pill, paddingHorizontal: 22, paddingVertical: 8 },
  pillText: { color: '#fff', fontWeight: '800', fontSize: 13 },
  cta: { backgroundColor: colors.teal, borderRadius: radii.pill, paddingVertical: 16, alignItems: 'center', ...shadow.card },
  ctaText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  personRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#fff', borderRadius: radii.pill, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: colors.line, ...shadow.card },
  personAvatar: { width: 46, height: 46, borderRadius: 23 },
  personName: { fontSize: 15, fontWeight: '800', color: colors.ink },
  personRole: { fontSize: 13, color: colors.ink3 },
});
