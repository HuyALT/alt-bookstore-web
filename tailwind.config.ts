import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
 darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'surface-container': '#f0eee8',
        'surface-container-highest': '#e5e2dc',
        'surface-container-lowest': '#ffffff',
        'on-secondary-container': '#656464',
        'surface-variant': '#e5e2dc',
        secondary: '#5f5e5e',
        'on-primary': '#ffffff',
        'on-primary-container': '#644a02',
        'tertiary-container': '#cebda7',
        'error-container': '#ffdad6',
        'on-secondary': '#ffffff',
        'on-error-container': '#93000a',
        error: '#ba1a1a',
        'surface-container-low': '#f6f3ed',
        'on-primary-fixed': '#261a00',
        'on-tertiary-container': '#584c3a',
        'surface-tint': '#765a14',
        'outline-variant': '#d0c5b3',
        'inverse-primary': '#e7c272',
        'surface-dim': '#dcdad4',
        primary: '#765a14',
        'inverse-surface': '#31312d',
        outline: '#7f7667',
        'tertiary-fixed': '#f2e0c8',
        'on-error': '#ffffff',
        'on-tertiary-fixed': '#231a0c',
        'secondary-fixed': '#e4e2e1',
        'on-surface': '#1c1c18',
        'on-tertiary': '#ffffff',
        'primary-fixed': '#ffdf9e',
        'on-primary-fixed-variant': '#5b4300',
        'secondary-container': '#e4e2e1',
        'primary-container': '#e0bb6c',
        'primary-fixed-dim': '#e7c272',
        'tertiary-fixed-dim': '#d5c4ad',
        'on-background': '#1c1c18',
        'surface-container-high': '#ebe8e2',
        'secondary-fixed-dim': '#c8c6c5',
        'surface-bright': '#fcf9f3',
        'on-tertiary-fixed-variant': '#504534',
        tertiary: '#695d4a',
        'inverse-on-surface': '#f3f0ea',
        'on-secondary-fixed-variant': '#474747',
        surface: '#fcf9f3',
        'on-surface-variant': '#4d4638',
        background: '#fcf9f3',
        'on-secondary-fixed': '#1b1c1c',
      },

      borderRadius: {
        DEFAULT: '0.125rem',
        lg: '0.25rem',
        xl: '0.5rem',
        full: '0.75rem',
      },

      spacing: {
        'container-max': '1280px',
        'section-gap': '120px',
        unit: '4px',
        gutter: '32px',
        'margin-page': '80px',
      },

      fontFamily: {
        'body-md': ['Manrope'],
        'label-sm': ['Manrope'],
        'headline-xl': ['Newsreader'],
        'body-lg': ['Manrope'],
        'headline-md': ['Newsreader'],
        'headline-lg': ['Newsreader'],
      },

      fontSize: {
        'body-md': [
          '16px',
          {
            lineHeight: '1.6',
            fontWeight: '400',
          },
        ],

        'label-sm': [
          '12px',
          {
            lineHeight: '1',
            letterSpacing: '0.08em',
            fontWeight: '600',
          },
        ],

        'headline-xl': [
          '48px',
          {
            lineHeight: '1.2',
            letterSpacing: '-0.02em',
            fontWeight: '400',
          },
        ],

        'body-lg': [
          '18px',
          {
            lineHeight: '1.6',
            fontWeight: '400',
          },
        ],

        'headline-md': [
          '24px',
          {
            lineHeight: '1.4',
            fontWeight: '500',
          },
        ],

        'headline-lg': [
          '32px',
          {
            lineHeight: '1.3',
            fontWeight: '500',
          },
        ],
      },
    },
  },
} satisfies Config