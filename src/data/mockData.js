// src/data/mockData.js
// Mock data — replace with real API/device SDK responses later.

export const user = {
  name: 'Jon',
  avatar: 'https://i.pravatar.cc/100?img=13',
};

export const moods = ['👍 Great', '🤞 Ok', '😴 Tired', '🥴 Not Well'];

export const reminders = [
  { id: 'r1', icon: '💊', text: 'Take beta blocker pills', when: 'Now' },
  { id: 'r2', icon: '📞', text: 'Call nurse Maria', when: '2 hours ago' },
  { id: 'r3', icon: '⚠️', text: 'Glucose very high', when: 'at 8:12 AM' },
];

export const metrics = [
  { id: 'bp', label: 'Blood Pressure', value: '147/95', unit: 'mmHg', status: 'Stable', level: 3 },
  { id: 'glucose', label: 'Glucose', value: '122', unit: 'mg/dL', status: 'High', level: 4 },
];

export const healthTiles = [
  { id: 'bp', label: 'Blood Pressure', icon: 'water' },
  { id: 'spo2', label: 'Oxygen (SpO₂)', icon: 'leaf' },
  { id: 'glucose', label: 'Glucose', icon: 'speedometer' },
  { id: 'hr', label: 'Heart Rate', icon: 'heart' },
  { id: 'sleep', label: 'Sleep', icon: 'moon' },
  { id: 'meds', label: 'Medication', icon: 'medkit' },
  { id: 'symptoms', label: 'Symptoms', icon: 'clipboard' },
  { id: 'other', label: 'Other Data', icon: 'grid' },
];

export const devices = [
  { id: 'd1', icon: '🩺', name: 'Blood Pressure Device', status: 'Connected' },
  { id: 'd2', icon: '🫁', name: 'Pulse Oximeter', status: 'Connected' },
  { id: 'd3', icon: '🩸', name: 'Glucometer', status: 'Paired' },
];

export const bpWeek = {
  labels: ['Mn', 'Tu', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  systole: [150, 188, 130, 158, 128, 186, 155],
  diastole: [78, 100, 96, 108, 88, 84, 124],
  avg: '147/95',
  lastBpm: 97,
  lastAgo: '3h. ago',
  status: 'High',
};

export const careCircle = {
  doctors: [
    { id: 'c1', name: 'Dr.McKinney', role: 'Therapist', avatar: 'https://i.pravatar.cc/100?img=47', action: 'Call' },
    { id: 'c2', name: 'Dr.Cooper', role: 'Cardiologist', avatar: 'https://i.pravatar.cc/100?img=59', action: 'Call' },
  ],
  family: [
    { id: 'c3', name: 'Annette', role: 'Wife', avatar: 'https://i.pravatar.cc/100?img=44', action: 'Chat' },
    { id: 'c4', name: 'Jacob Jones', role: 'Son', avatar: 'https://i.pravatar.cc/100?img=68', action: 'Chat' },
    { id: 'c5', name: 'Maria Lopez', role: 'Nurse', avatar: 'https://i.pravatar.cc/100?img=32', action: 'Chat' },
  ],
};
