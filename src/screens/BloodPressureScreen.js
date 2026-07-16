// src/screens/BloodPressureScreen.js
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Circle, Line as SvgLine, Text as SvgText } from 'react-native-svg';
import { CTAButton } from '../components';
import { colors, radii, shadow } from '../theme';
import { bpWeek } from '../data/mockData';

const PERIODS = ['Day', 'Week', 'Month', 'Year'];
const W = Dimensions.get('window').width - 64;
const H = 220;

function toPoints(values, max = 200) {
  const step = (W - 50) / (values.length - 1);
  return values.map((v, i) => ({ x: 40 + i * step, y: 20 + (1 - v / max) * (H - 60) }));
}
function smoothPath(pts) {
  return pts.reduce((d, p, i, a) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = a[i - 1];
    const cx = (prev.x + p.x) / 2;
    return `${d} C ${cx} ${prev.y}, ${cx} ${p.y}, ${p.x} ${p.y}`;
  }, '');
}

export default function BloodPressureScreen({ navigation }) {
  const [period, setPeriod] = useState('Week');
  const sys = toPoints(bpWeek.systole);
  const dia = toPoints(bpWeek.diastole);

  return (
    <View style={s.wrap}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 120 }}>
        {/* Header */}
        <View style={s.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color={colors.ink} />
          </TouchableOpacity>
          <Text style={s.headerTitle}>Blood pressure</Text>
          <Ionicons name="ellipsis-vertical" size={18} color={colors.ink3} />
        </View>

        {/* Period segmented control */}
        <View style={s.seg}>
          {PERIODS.map((p) => (
            <TouchableOpacity
              key={p}
              style={[s.segBtn, period === p && s.segOn]}
              onPress={() => setPeriod(p)}>
              <Text style={[s.segText, period === p && s.segTextOn]}>{p}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stat cards */}
        <View style={s.statRow}>
          <View style={s.stat}>
            <Text style={s.statLbl}>Avg pressure</Text>
            <Text style={s.statNum}>{bpWeek.avg} <Text style={s.statUnit}>mmHg</Text></Text>
            <View style={[s.badge, { backgroundColor: colors.pinkSoft }]}>
              <Text style={[s.badgeText, { color: colors.pink }]}>{bpWeek.status}</Text>
            </View>
          </View>
          <View style={s.stat}>
            <Text style={s.statLbl}>Last measurment</Text>
            <Text style={s.statNum}>{bpWeek.lastBpm} <Text style={s.statUnit}>bpm</Text></Text>
            <View style={[s.badge, { backgroundColor: colors.tealChip }]}>
              <Text style={[s.badgeText, { color: colors.teal }]}>{bpWeek.lastAgo}</Text>
            </View>
          </View>
        </View>

        {/* Chart */}
        <View style={s.chartCard}>
          <Svg width={W} height={H + 20}>
            {[200, 160, 120, 80, 40, 0].map((v, i) => {
              const y = 20 + (i * (H - 60)) / 5;
              return (
                <React.Fragment key={v}>
                  <SvgLine x1="40" x2={W - 8} y1={y} y2={y} stroke={colors.line} strokeDasharray="3 4" />
                  <SvgText x="32" y={y + 3} fontSize="10" fill={colors.ink3} textAnchor="end">{v}</SvgText>
                </React.Fragment>
              );
            })}
            <Path d={smoothPath(sys)} stroke="#4BB8D6" strokeWidth="2" fill="none" />
            <Path d={smoothPath(dia)} stroke={colors.pink} strokeWidth="2" fill="none" />
            {sys.map((p, i) => (
              <React.Fragment key={`s${i}`}>
                <Circle cx={p.x} cy={p.y} r="5" fill="#4BB8D6" opacity="0.25" />
                <Circle cx={p.x} cy={p.y} r="2.8" fill="#4BB8D6" />
              </React.Fragment>
            ))}
            {dia.map((p, i) => (
              <React.Fragment key={`d${i}`}>
                <Circle cx={p.x} cy={p.y} r="5" fill={colors.pink} opacity="0.25" />
                <Circle cx={p.x} cy={p.y} r="2.8" fill={colors.pink} />
              </React.Fragment>
            ))}
            {bpWeek.labels.map((l, i) => (
              <SvgText key={l} x={sys[i].x} y={H} fontSize="10" fill={colors.ink3} textAnchor="middle">{l}</SvgText>
            ))}
          </Svg>
          <View style={s.legend}>
            <View style={s.legendItem}><View style={[s.legendDot, { backgroundColor: '#4BB8D6' }]} /><Text style={s.legendText}>Systole</Text></View>
            <View style={s.legendItem}><View style={[s.legendDot, { backgroundColor: colors.pink }]} /><Text style={s.legendText}>Diastole</Text></View>
          </View>
        </View>
      </ScrollView>

      <View style={s.footer}>
        <CTAButton label="Measure Now" onPress={() => navigation.navigate('Measure')} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 },
  headerTitle: { fontSize: 17, fontWeight: '800', color: colors.ink },
  seg: { flexDirection: 'row', backgroundColor: '#fff', borderWidth: 1, borderColor: colors.line, borderRadius: radii.pill, padding: 5, marginVertical: 14, ...shadow.card },
  segBtn: { flex: 1, paddingVertical: 9, borderRadius: radii.pill, alignItems: 'center' },
  segOn: { backgroundColor: colors.tealChip },
  segText: { fontWeight: '700', fontSize: 14, color: colors.ink3 },
  segTextOn: { color: colors.tealDeep },
  statRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  stat: { flex: 1, backgroundColor: '#fff', borderWidth: 1, borderColor: colors.line, borderRadius: radii.lg, padding: 16, ...shadow.card },
  statLbl: { fontSize: 13, color: colors.ink2, fontWeight: '600' },
  statNum: { fontSize: 24, fontWeight: '800', color: colors.ink, marginVertical: 6 },
  statUnit: { fontSize: 12, fontWeight: '600', color: colors.ink3 },
  badge: { alignSelf: 'flex-start', borderRadius: radii.pill, paddingHorizontal: 14, paddingVertical: 4 },
  badgeText: { fontSize: 12, fontWeight: '800' },
  chartCard: { backgroundColor: '#fff', borderWidth: 1, borderColor: colors.line, borderRadius: radii.lg, padding: 12, ...shadow.card },
  legend: { flexDirection: 'row', justifyContent: 'center', gap: 24, paddingVertical: 8 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 9, height: 9, borderRadius: 5 },
  legendText: { fontSize: 13, color: colors.ink2, fontWeight: '600' },
  footer: { position: 'absolute', left: 20, right: 20, bottom: 24 },
});
