// src/screens/MeasureScreen.js
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Defs, RadialGradient, Stop, LinearGradient as SvgLinear } from 'react-native-svg';
import { CTAButton } from '../components';
import { colors } from '../theme';

const W = Dimensions.get('window').width - 40;

export default function MeasureScreen({ navigation }) {
  const scale = useRef(new Animated.Value(1)).current;
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  // heartbeat animation
  useEffect(() => {
    const beat = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.08, duration: 180, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 180, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1.05, duration: 160, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 880, useNativeDriver: true }),
      ])
    );
    beat.start();
    return () => beat.stop();
  }, []);

  // measurement progress
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(t);
          navigation.goBack(); // measurement done → back to results
          return 100;
        }
        return p + 1;
      });
    }, 120);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <View style={s.wrap}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.ink} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Blood pressure</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={s.body}>
        <Text style={s.big}>Please stay still{'\n'}and relaxed</Text>

        <Animated.View style={{ transform: [{ scale }] }}>
          <Svg width={150} height={140} viewBox="0 0 200 190">
            <Defs>
              <RadialGradient id="hg" cx="35%" cy="30%" r="80%">
                <Stop offset="0%" stopColor="#FF7DA0" />
                <Stop offset="45%" stopColor="#F2557E" />
                <Stop offset="100%" stopColor="#C2255C" />
              </RadialGradient>
            </Defs>
            <Path
              fill="url(#hg)"
              d="M100 175S18 122 8 72C2 40 26 14 56 14c20 0 34 11 44 26 10-15 24-26 44-26 30 0 54 26 48 58-10 50-92 103-92 103z"
            />
          </Svg>
        </Animated.View>

        <Text style={s.progress}>
          Progress: <Text style={{ color: colors.pink, fontWeight: '800' }}>{progress}%</Text>
        </Text>

        <Svg width={W} height={100} viewBox="0 0 320 110">
          <Defs>
            <SvgLinear id="fade" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor={colors.pink} stopOpacity="0.22" />
              <Stop offset="100%" stopColor={colors.pink} stopOpacity="0" />
            </SvgLinear>
          </Defs>
          <Path
            fill="url(#fade)"
            d="M8 70 L28 60 L44 72 L58 50 L66 78 L74 14 L84 92 L94 58 L112 66 L128 52 L142 70 L158 58 L172 66 L188 48 L202 72 L218 60 L234 68 L252 54 L268 74 L288 62 L310 68 L310 110 L8 110 Z"
          />
          <Path
            stroke={colors.pink} strokeWidth="2" fill="none"
            d="M8 70 L28 60 L44 72 L58 50 L66 78 L74 14 L84 92 L94 58 L112 66 L128 52 L142 70 L158 58 L172 66 L188 48 L202 72 L218 60 L234 68 L252 54 L268 74 L288 62 L310 68"
          />
        </Svg>
      </View>

      <View style={s.footer}>
        <CTAButton label={paused ? 'Resume' : 'Pause'} onPress={() => setPaused(!paused)} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 },
  headerTitle: { fontSize: 17, fontWeight: '800', color: colors.ink },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 26 },
  big: { fontSize: 26, fontWeight: '800', textAlign: 'center', color: colors.ink, lineHeight: 34 },
  progress: { fontSize: 15, fontWeight: '700', fontStyle: 'italic', color: colors.ink2 },
  footer: { paddingBottom: 16 },
});
