import { createVuetify } from 'vuetify';
import 'vuetify/styles';

const kikkoTheme = {
  dark: false,
  colors: {
    background: '#f0f2f2',
    surface: '#ffffff',
    primary: '#35bfab',
    secondary: '#7b888e',
    accent: '#1fc9e7',
    error: '#e0556a',
    info: '#4da8da',
    success: '#35bfab',
    warning: '#e8a840',
  },
};

export default createVuetify({
  theme: {
    defaultTheme: 'kikkoTheme',
    themes: {
      kikkoTheme,
    },
  },
  defaults: {
    VBtn: {
      rounded: 'xl',
      elevation: 0,
    },
    VCard: {
      rounded: 'xl',
      elevation: 0,
    },
    VChip: {
      rounded: 'lg',
    },
  },
});
