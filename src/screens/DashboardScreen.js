// src/screens/DashboardScreen.js
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { TopBar, SectionHead, PillButton } from '../components';
import { colors, radii, shadow } from '../theme';
import { user, moods, reminders, metrics, careCircle } from '../data/mockData';
import { Image } from 'react-native';

export default function DashboardScreen({ navigation }) {
  const [mood, setMood] = useState(null);

  return (
    <ScrollView style={s.wrap} contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
      <TopBar title={`Morning, ${user.name}`} avatar={user.avatar} />

      <SectionHead title="How are you feeling today?" />
      <View style={s.moodRow}>
        {moods.map((m) => (
          <TouchableOpacity
            key={m}
            style={[s.mood, mood === m && s.moodSel]}
            onPress={() => setMood(m)}>
            <Text style={s.moodText}>{m}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <SectionHead title="Reminders & Alerts" onViewAll={() => {}} />
      {reminders.map((r) => (
        <View key={r.id} style={s.reminder}>
          <Text style={{ fontSize: 16 }}>{r.icon}</Text>
          <Text style={s.reminderText}>{r.text}</Text>
          <Text style={s.when}>{r.when}</Text>
        </View>
      ))}

      <SectionHead title="Health Metrics" onViewAll={() => {}} />
      {metrics.map((m) => (
        <TouchableOpacity
          key={m.id}
          activeOpacity={0.9}
          onPress={() => m.id === 'bp' && navigation.navigate('BloodPressure')}>
          <LinearGradient
            colors={['#3FAACB', '#2E9DBF', '#2691B3']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={s.metric}>
            <View style={s.metricRow}>
              <Text style={s.metricLabel}>{m.label}</Text>
              <Text style={s.metricLabel}>{m.status}</Text>
            </View>
            <Text style={s.metricVal}>
              {m.value} <Text style={s.metricUnit}>{m.unit}</Text>
            </Text>
            <View style={s.dots}>
              {[0, 1, 2, 3, 4].map((i) => (
                <View key={i} style={[s.dot, i < m.level && s.dotOn]} />
              ))}
            </View>
          </LinearGradient>
        </TouchableOpacity>
      ))}

      <SectionHead title="Quick Actions" />
      <View style={s.qaGrid}>
        {[
          { icon: 'briefcase-outline', label: 'Add Symptom' },
          { icon: 'call-outline', label: 'Call Doctor' },
          { icon: 'reader-outline', label: 'Add Measure' },
        ].map((q) => (
          <TouchableOpacity key={q.label} style={s.qa}>
            <View style={s.qaIcon}>
              <Ionicons name={q.icon} size={20} color={colors.teal} />
            </View>
            <Text style={s.qaLabel}>{q.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <SectionHead title="Care Circle" onViewAll={() => navigation.navigate('CareTab')} />
      <View style={s.personGrid}>
        {[careCircle.doctors[0], careCircle.family[1]].map((p) => (
          <View key={p.id} style={s.person}>
            <Image source={{ uri: p.avatar }} style={s.personAvatar} />
            <Text style={s.personName}>{p.name}</Text>
            <Text style={s.personRole}>{p.role}</Text>
            <PillButton label="Call" />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#fff' },
  moodRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 8 },
  mood: { backgroundColor: '#fff', borderWidth: 1, borderColor: colors.line, borderRadius: radii.pill, paddingHorizontal: 18, paddingVertical: 10, ...shadow.card },
  moodSel: { borderColor: colors.teal, backgroundColor: colors.tealSoft },
  moodText: { fontWeight: '700', fontSize: 14, color: colors.ink },
  reminder: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#fff', borderWidth: 1, borderColor: colors.line, borderRadius: radii.pill, paddingHorizontal: 18, paddingVertical: 13, marginBottom: 10, ...shadow.card },
  reminderText: { flex: 1, fontSize: 14, fontWeight: '600', color: colors.ink },
  when: { color: colors.ink3, fontSize: 12, fontWeight: '600' },
  metric: { borderRadius: radii.lg, padding: 18, marginBottom: 12 },
  metricRow: { flexDirection: 'row', justifyContent: 'space-between' },
  metricLabel: { color: '#fff', fontSize: 13, fontWeight: '700', opacity: 0.95 },
  metricVal: { color: '#fff', fontSize: 26, fontWeight: '800', marginTop: 2 },
  metricUnit: { fontSize: 13, fontWeight: '600', opacity: 0.85 },
  dots: { flexDirection: 'row', gap: 5, marginTop: 10 },
  dot: { width: 9, height: 9, borderRadius: 5, backgroundColor: 'rgba(255,255,255,.35)' },
  dotOn: { backgroundColor: '#fff' },
  qaGrid: { flexDirection: 'row', gap: 12, marginBottom: 8 },
  qa: { flex: 1, backgroundColor: '#fff', borderWidth: 1, borderColor: colors.line, borderRadius: radii.lg, paddingVertical: 18, alignItems: 'center', gap: 10, ...shadow.card },
  qaIcon: { width: 44, height: 44, borderRadius: 14, backgroundColor: colors.tealSoft, alignItems: 'center', justifyContent: 'center' },
  qaLabel: { fontWeight: '700', fontSize: 12.5, color: colors.ink, textAlign: 'center' },
  personGrid: { flexDirection: 'row', gap: 12 },
  person: { flex: 1, backgroundColor: '#fff', borderWidth: 1, borderColor: colors.line, borderRadius: radii.lg, padding: 16, alignItems: 'center', ...shadow.card },
  personAvatar: { width: 56, height: 56, borderRadius: 28, marginBottom: 10 },
  personName: { fontSize: 15, fontWeight: '800', color: colors.ink },
  personRole: { fontSize: 13, color: colors.ink3, marginBottom: 12 },
});
