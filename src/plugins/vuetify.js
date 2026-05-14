import { createVuetify } from 'vuetify';
import 'vuetify/styles';

const kikkoTheme = {
  dark: true,
  colors: {
    background: '#080c12',
    surface: '#080c12',
    primary: '#A7F3D0',
    secondary: '#93C5FD',
    accent: '#FDE68A',
    error: '#FCA5A5',
    info: '#7DD3FC',
    success: '#86EFAC',
    warning: '#FCD34D',
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
