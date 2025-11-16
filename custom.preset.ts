import {definePreset} from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const customPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554',
    },
    colorScheme: {
      light: {
        primary: {
          color: '#2563eb',
          inverseColor: '#ffffff',
          hoverColor: '#1d4ed8',
          activeColor: '#1e40af',
        },
        highlight: {
          background: '#3b82f6',
          focusBackground: '#2563eb',
          color: '#ffffff',
          focusColor: '#ffffff',
        },
        surface: {
          0: '#ffffff',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      dark: {
        primary: {
          color: '#3b82f6',
          inverseColor: '#0a0e1a',
          hoverColor: '#60a5fa',
          activeColor: '#2563eb',
        },
        highlight: {
          background: 'rgba(59, 130, 246, 0.15)',
          focusBackground: 'rgba(59, 130, 246, 0.25)',
          color: '#e8edf5',
          focusColor: '#ffffff',
        },
        surface: {
          0: '#0a0e1a',
          50: '#0f1420',
          100: '#151b2e',
          200: '#1a2238',
          300: '#1e293b',
          400: '#334155',
          500: '#475569',
          600: '#64748b',
          700: '#94a3b8',
          800: '#cbd5e1',
          900: '#e2e8f0',
          950: '#f1f5f9',
        },
        content: {
          background: '#151b2e',
          hoverBackground: '#1a2238',
          borderColor: '#1e293b',
          color: '#e8edf5',
          hoverColor: '#ffffff',
        },
      },
    },
  },
});
