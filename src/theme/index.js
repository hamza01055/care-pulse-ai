// src/theme/index.js
// Single source of truth for all design tokens (colors, spacing, radii, type)

export const colors = {
  teal: '#2E9DBF',
  tealDeep: '#1F87A8',
  tealSoft: '#E4F4F9',
  tealChip: '#DCF1F7',
  ink: '#101820',
  ink2: '#4A5560',
  ink3: '#8A96A0',
  pink: '#F2557E',
  pinkSoft: '#FDE8EF',
  amber: '#F2755A',
  card: '#FFFFFF',
  bg: '#F5F8FA',
  line: '#EDF1F4',
};

export const radii = { md: 16, lg: 22, pill: 100 };

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 28 };

export const typography = {
  title: { fontSize: 26, fontWeight: '800', color: colors.ink },
  h2: { fontSize: 17, fontWeight: '800', color: colors.ink },
  body: { fontSize: 14, fontWeight: '600', color: colors.ink },
  caption: { fontSize: 12, fontWeight: '600', color: colors.ink3 },
};

export const shadow = {
  card: {
    shadowColor: '#14405A',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
};
