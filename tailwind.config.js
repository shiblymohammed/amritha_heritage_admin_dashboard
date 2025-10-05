/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export default {
  // Add 'dark' mode strategy
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // =================================================================
      // == THEME FOUNDATION: COLORS & FONTS
      // =================================================================
      colors: {
        // Using CSS variables for easy light/dark mode theming
        background: 'rgb(var(--color-background) / <alpha-value>)',
        'background-secondary': 'rgb(var(--color-background-secondary) / <alpha-value>)',
        'background-tertiary': 'rgb(var(--color-background-tertiary) / <alpha-value>)',

        foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
        'foreground-subtle': 'rgb(var(--color-foreground-subtle) / <alpha-value>)',
        'foreground-on-color': 'rgb(var(--color-foreground-on-color) / <alpha-value>)',

        border: 'rgb(var(--color-border) / <alpha-value>)',
        'border-interactive': 'rgb(var(--color-border-interactive) / <alpha-value>)',

        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          hover: 'rgb(var(--color-primary-hover) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'rgb(var(--color-secondary) / <alpha-value>)',
          hover: 'rgb(var(--color-secondary-hover) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
          hover: 'rgb(var(--color-accent-hover) / <alpha-value>)',
          gold: 'rgb(var(--color-accent-gold) / <alpha-value>)',
        },

        // Additional color variables to match component usage
        'border-soft': 'rgb(var(--color-border-soft) / <alpha-value>)',
        text: {
          DEFAULT: 'rgb(var(--color-text) / <alpha-value>)',
          heading: 'rgb(var(--color-text-heading) / <alpha-value>)',
          subtle: 'rgb(var(--color-text-subtle) / <alpha-value>)',
          'on-color': 'rgb(var(--color-text-on-color) / <alpha-value>)',
        },

        textShadow: {
            sm: '0 1px 2px var(--tw-shadow-color)',
            DEFAULT: '0 2px 4px var(--tw-shadow-color)',
            lg: '0 8px 16px var(--tw-shadow-color)',
            // Custom glowing effect for the heading
            glow: '0 0 5px var(--tw-shadow-color), 0 0 10px var(--tw-shadow-color)',
        },

        action: {
          primary: 'rgb(var(--color-action-primary) / <alpha-value>)',
          'primary-hover': 'rgb(var(--color-action-primary-hover) / <alpha-value>)',
          accent: 'rgb(var(--color-action-accent) / <alpha-value>)',
          'accent-hover': 'rgb(var(--color-action-accent-hover) / <alpha-value>)',
        },
      },
      fontFamily: {
        // Elegant, classic serifs for headings
        'cinzel': ['Cinzel', 'serif'],
        'playfair': ['Playfair Display', 'serif'],
        // Readable, slightly stylized serif for body/long-form text
        'cormorant': ['Cormorant Garamond', 'serif'],
        // Modern, clean sans-serif for UI elements and secondary text
        'poppins': ['Poppins', 'sans-serif'],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      letterSpacing: {
        tightest: '-.075em',
        tighter: '-.05em',
        tight: '-.025em',
        normal: '0',
        wide: '.025em',
        wider: '.05em',
        widest: '.1em',
      },
      backgroundImage: {
        'sunrise': 'linear-gradient(to right, #F39C12, #DAA520)',
        'sunset': 'linear-gradient(to right, #8E44AD, #C0392B)',
        'forest': 'linear-gradient(to right, #228B22, #556B2F)',
        'ocean': 'linear-gradient(to right, #008080, #20B2AA)',
      },

      // =================================================================
      // == TYPOGRAPHIC SYSTEM
      // =================================================================
      fontSize: {
        'xs': '0.75rem', 'sm': '0.875rem', 'base': '1rem', 'lg': '1.125rem', 'xl': '1.25rem',
        'body': ['1.125rem', { lineHeight: '1.7', letterSpacing: '0.01em' }],
        'h4': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'h3': ['1.75rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h2': ['2.25rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h1': ['3rem', { lineHeight: '1.1', fontWeight: '700' }],
        'h3-sm': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h2-sm': ['1.875rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h1-sm': ['2.25rem', { lineHeight: '1.1', fontWeight: '700' }],
      },

      // =================================================================
      // == SPACING, BORDERS, & SHADOWS
      // =================================================================
      spacing: {
        // Extend spacing for larger section padding
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        'sm': '0.125rem', 'DEFAULT': '0.25rem', 'md': '0.375rem', 'lg': '0.5rem',
        'xl': '0.75rem', '2xl': '1rem', '3xl': '1.5rem', 'full': '9999px',
      },
      boxShadow: {
        // Natural soft shadows
        'soft-sunlight': '0 10px 30px -5px rgb(var(--color-shadow-base) / 0.1), 0 4px 6px -2px rgb(var(--color-shadow-base) / 0.05)',
        'soft-sunlight-lg': '0 25px 50px -12px rgb(var(--color-shadow-base) / 0.25)',
        // Luxurious golden glow
        'golden-glow': '0 0 25px 5px rgb(var(--color-accent-gold) / 0.3)',
        'golden-glow-sm': '0 0 15px 0 rgb(var(--color-accent-gold) / 0.25)',
        // Layered shadows for depth
        'layered': '0 1px 3px rgb(var(--color-shadow-base) / 0.1), 0 8px 16px rgb(var(--color-shadow-base) / 0.1)',
        'interactive': '0 0 0 3px rgb(var(--color-primary) / 0.4)',
        // Heritage shadows for simpler styling
        'heritage': '0 4px 20px -2px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.06)',
        'heritage-lg': '0 10px 40px -4px rgb(0 0 0 / 0.15), 0 4px 8px -2px rgb(0 0 0 / 0.08)',
      },

      // =================================================================
      // == ANIMATION SYSTEM
      // =================================================================
      keyframes: {

        scaleIn: {
                '0%': { opacity: '0', transform: 'scale(0.95)' },
                '100%': { opacity: '1', transform: 'scale(1)' },
              },
        // Existing
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'fade-in-up': { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'slide-down': { '0%': { opacity: '0', transform: 'translateY(-10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'shimmer': { '100%': { transform: 'translateX(100%)' } },

        // New animations
        'float': {
          '0%, 100%': { 'transform': 'translateY(0)' },
          '50%': { 'transform': 'translateY(-10px)' },
        },
        'gradient-flow': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'text-shimmer': {
          '0%': { 'background-position': '-200% 0' },
          '100%': { 'background-position': '200% 0' },
        },
        // New Interactive Animations
        'hover-pulse': {
          '0%, 100%': { 'transform': 'scale(1)', opacity: '1' },
          '50%': { 'transform': 'scale(1.05)', opacity: '0.9' },
        },
        'tilt-3d': {
          '0%': { 'transform': 'rotateX(0deg) rotateY(0deg)' },
          '25%': { 'transform': 'rotateX(5deg) rotateY(-5deg)' },
          '50%': { 'transform': 'rotateX(-5deg) rotateY(5deg)' },
          '75%': { 'transform': 'rotateX(5deg) rotateY(-5deg)' },
          '100%': { 'transform': 'rotateX(0deg) rotateY(0deg)' },
        },
        'bounce-gentle': {
          '0%, 100%': { 'transform': 'translateY(0px)' },
          '50%': { 'transform': 'translateY(-4px)' },
        },
        'scale-breath': {
          '0%, 100%': { 'transform': 'scale(1)' },
          '50%': { 'transform': 'scale(1.02)' },
        },
      },
      animation: {
        // Existing extended
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'slide-down': 'slideDown 0.5s ease-out forwards',

        // New animations
        'float': 'float 4s ease-in-out infinite',
        'gradient-flow': 'gradient-flow 10s ease infinite',
        'text-shimmer': 'text-shimmer 3s infinite linear',
        // Interactive Hover Animations
        'hover-pulse': 'hover-pulse 2s ease-in-out infinite',
        'tilt-3d': 'tilt-3d 4s ease-in-out infinite',
        'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
        'scale-breath': 'scale-breath 3s ease-in-out infinite',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
      },
      // Required for gradient-flow animation
      backgroundSize: {
        '400%': '400% 400%',
      },
    },
  },
  plugins: [
    // =================================================================
    // == PLUGIN 1: THEME & COLOR VARIABLES
    // =================================================================


    plugin(function({ addUtilities, theme }) {
      addUtilities({
        '.text-glow-gold': {
          textShadow: `
            0 0 7px rgb(var(--color-accent-gold) / 0.5),
            0 0 20px rgb(var(--color-accent-gold) / 0.3)
          `,
        },
        '.text-glow-primary': {
          textShadow: `
            0 0 7px rgb(var(--color-primary) / 0.5),
            0 0 20px rgb(var(--color-primary) / 0.3)
          `,
        },
      })
    }),



    plugin(function ({ matchUtilities, theme }) {
        matchUtilities(
        {
            'text-shadow': (value) => ({
            textShadow: value,
            }),
        },
        { values: theme('textShadow') }
        );
    }),



    plugin(function({ addBase }) {
      addBase({
        ':root': { // Light Theme (Default)
          '--color-background': '251 249 246', // #FBF9F6
          '--color-background-secondary': '245 240 230', // #F5F0E6
          '--color-background-tertiary': '237 232 218', // #EDE8DA
          '--color-foreground': '67 85 71',   // #435547
          '--color-foreground-subtle': '90 89 77',   // #5A594D
          '--color-foreground-on-color': '251 249 246', // #FBF9F6
          '--color-border': '220 215 201', // #DCD7C9
          '--color-border-interactive': '142 132 113', // #8E8471
          '--color-border-soft': '220 215 201', // #DCD7C9 (softer border)
          '--color-primary': '58 74 62',    // #3A4A3E (Forest Green)
          '--color-primary-hover': '44 62 80',     // #2C3E50
          '--color-secondary': '176 146 106', // #B0926A (Terracotta)
          '--color-secondary-hover': '141 117 85',  // #8D7555
          '--color-accent': '165 113 86',   // #A57156 (Muted Brown)
          '--color-accent-hover': '156 106 80',   // #9C6A50
          '--color-accent-gold': '218 165 32',   // #DAA520
          '--color-shadow-base': '142 132 113', // #8E8471
          // New text color variables
          '--color-text': '67 85 71',       // #435547 (same as foreground)
          '--color-text-heading': '58 74 62', // #3A4A3E (primary green)
          '--color-text-subtle': '90 89 77', // #5A594D (same as foreground-subtle)
          '--color-text-on-color': '251 249 246', // #FBF9F6 (white on colored backgrounds)
          // Action color variables
          '--color-action-primary': '58 74 62',    // #3A4A3E (Forest Green)
          '--color-action-primary-hover': '44 62 80', // #2C3E50
          '--color-action-accent': '165 113 86',   // #A57156 (Muted Brown)
          '--color-action-accent-hover': '156 106 80', // #9C6A50
        },
        '.dark': { // Dark Theme
          '--color-background': '25 35 45',    // #19232D (Deep Blue/Grey)
          '--color-background-secondary': '34 47 62',    // #222F3E
          '--color-background-tertiary': '53 71 90',    // #35475A
          '--color-foreground': '220 215 201', // #DCD7C9
          '--color-foreground-subtle': '177 171 157', // #B1AB9D
          '--color-foreground-on-color': '25 35 45',    // #19232D
          '--color-border': '83 92 104',   // #535C68
          '--color-border-interactive': '142 132 113', // #8E8471
          '--color-border-soft': '83 92 104',   // #535C68 (softer border for dark)
          '--color-primary': '176 146 106', // #B0926A (Terracotta Highlight)
          '--color-primary-hover': '212 175 122', // #D4AF7A
          '--color-secondary': '0 95 85',     // #005F55 (Deep Emerald)
          '--color-secondary-hover': '0 120 107',  // #00786B
          '--color-accent': '218 165 32',   // #DAA520 (Gold)
          '--color-accent-hover': '248 191 35',   // #F8BF23
          '--color-accent-gold': '218 165 32',   // #DAA520
          '--color-shadow-base': '10 10 10',      // #0A0A0A
          // New text color variables for dark mode
          '--color-text': '220 215 201',       // #DCD7C9 (same as foreground)
          '--color-text-heading': '218 165 32', // #DAA520 (gold for headings)
          '--color-text-subtle': '177 171 157', // #B1AB9D (same as foreground-subtle)
          '--color-text-on-color': '25 35 45',   // #19232D (dark text on colored backgrounds)
          // Action color variables for dark mode
          '--color-action-primary': '176 146 106', // #B0926A (Terracotta)
          '--color-action-primary-hover': '212 175 122', // #D4AF7A
          '--color-action-accent': '218 165 32',   // #DAA520 (Gold)
          '--color-action-accent-hover': '248 191 35', // #F8BF23
        },
      });
    }),

    // =================================================================
    // == PLUGIN 2: BASE STYLES & TYPOGRAPHY
    // =================================================================
    plugin(function({ addBase, theme }) {
      addBase({
        'body': {
          backgroundColor: theme('colors.background'),
          color: theme('colors.foreground'),
          fontFamily: theme('fontFamily.cormorant'),
        },
        'h1': { fontFamily: theme('fontFamily.cinzel'), fontSize: theme('fontSize.h1-sm'), '@screen sm': { fontSize: theme('fontSize.h1') }, color: theme('colors.foreground'), letterSpacing: theme('letterSpacing.wide') },
        'h2': { fontFamily: theme('fontFamily.playfair'), fontSize: theme('fontSize.h2-sm'), '@screen sm': { fontSize: theme('fontSize.h2') }, color: theme('colors.foreground') },
        'h3': { fontFamily: theme('fontFamily.playfair'), fontSize: theme('fontSize.h3-sm'), '@screen sm': { fontSize: theme('fontSize.h3') }, color: theme('colors.foreground') },
        'h4': { fontFamily: theme('fontFamily.playfair'), fontSize: theme('fontSize.h4'), color: theme('colors.foreground-subtle') },
        'p': { fontSize: theme('fontSize.body'), color: theme('colors.foreground-subtle'), },
        'strong': { fontWeight: theme('fontWeight.semibold'), color: theme('colors.foreground') },
      })
    }),

    // =================================================================
    // == PLUGIN 3: CUSTOM UTILITIES (Buttons, Glassmorphism, Overlays)
    // =================================================================
    plugin(function({ addComponents, theme }) {
      addComponents({
        // Button System
        '.btn': {
          padding: `${theme('spacing.3')} ${theme('spacing.6')}`,
          borderRadius: theme('borderRadius.lg'),
          fontFamily: theme('fontFamily.poppins'),
          fontWeight: theme('fontWeight.semibold'),
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          outline: 'none',
          '&:focus-visible': {
            boxShadow: theme('boxShadow.interactive'),
          },
        },
        '.btn-primary': {
          color: '#FFFFFF',
          backgroundColor: '#435547',
          '&:hover': {
            backgroundColor: '#5A594D',
            boxShadow: theme('boxShadow.soft-sunlight'),
          },
          '.dark &': {
            backgroundColor: '#DCD7C9',
            color: '#435547',
            '&:hover': {
              backgroundColor: '#B1AB9D',
              color: '#435547',
            }
          }
        },
        '.btn-secondary': {
          backgroundColor: theme('colors.background-secondary'),
          color: theme('colors.primary.DEFAULT'),
          border: `1px solid ${theme('colors.border')}`,
          '&:hover': {
            backgroundColor: theme('colors.background-tertiary'),
            borderColor: theme('colors.border-interactive'),
            transform: 'translateY(-2px)',
          },
        },
        '.btn-ghost': {
          backgroundColor: 'transparent',
          color: theme('colors.primary.DEFAULT'),
          border: `1px solid ${theme('colors.primary.DEFAULT')}`,
          '&:hover': {
            backgroundColor: 'rgb(var(--color-primary) / 0.1)',
            boxShadow: `0 0 15px 0 rgb(var(--color-primary) / 0.2)`,
          },
        },
        // Card Variants with Enhanced Hover Effects
        '.card-base': {
          backgroundColor: theme('colors.background-secondary'),
          borderRadius: theme('borderRadius.xl'),
          boxShadow: theme('boxShadow.soft-sunlight'),
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          overflow: 'hidden',
          transformStyle: 'preserve-3d',
          '&:hover': {
            transform: 'translateY(-10px) scale(1.03) rotateX(5deg) rotateY(2deg)',
            boxShadow: theme('boxShadow.golden-glow'),
          },
        },
        '.card-interactive': {
          backgroundColor: theme('colors.background-secondary'),
          borderRadius: theme('borderRadius.xl'),
          boxShadow: theme('boxShadow.heritage'),
          transition: 'all 0.5s cubic-bezier(0.23, 1, 0.320, 1)',
          overflow: 'hidden',
          transformStyle: 'preserve-3d',
          '&:hover': {
            transform: 'translateY(-8px) scale(1.05) rotateZ(1deg)',
            boxShadow: theme('boxShadow.heritage-lg'),
          },
        },
        '.card-tilt': {
          backgroundColor: theme('colors.background-secondary'),
          borderRadius: theme('borderRadius.xl'),
          boxShadow: theme('boxShadow.soft-sunlight'),
          transition: 'all 0.6s cubic-bezier(0.23, 1, 0.320, 1)',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-6px) scale(1.02) rotateZ(2deg)',
            boxShadow: theme('boxShadow.golden-glow-sm'),
          },
        },
        '.card-bordered': {
            border: `1px solid ${theme('colors.border')}`,
        },
        // Glassmorphism
        '.glassmorphic': {
            backgroundColor: 'rgb(var(--color-background-secondary) / 0.5)',
            backdropFilter: 'blur(10px)',
            border: `1px solid rgb(var(--color-border) / 0.2)`,
            boxShadow: theme('boxShadow.soft-sunlight'),
        },
        // Glass effect without blur for form elements
        '.glass-card': {
            backgroundColor: 'rgb(var(--color-background-secondary) / 0.8)',
            border: `1px solid rgb(var(--color-border) / 0.3)`,
            boxShadow: theme('boxShadow.soft-sunlight'),
        },
        // Image overlay with enhanced hover effects
        '.img-overlay': {
            position: 'relative',
            overflow: 'hidden',
            '&::after': {
                content: '""',
                position: 'absolute',
                inset: '0',
                width: '100%',
                height: '100%',
                backgroundImage: 'linear-gradient(to top, rgb(0 0 0 / 0.1), transparent)',
                opacity: '0',
                transition: 'opacity 0.4s ease',
            },
            '&:hover::after': {
                opacity: '0.5',
            },
            '&:hover img': {
                transform: 'scale(1.1) rotate(1deg)',
                transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.320, 1)',
            }
        },
        
        // Interactive Hover Effects
        '.hover-lift': {
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
                transform: 'translateY(-4px) scale(1.02)',
                boxShadow: theme('boxShadow.soft-sunlight-lg'),
            }
        },
        '.hover-tilt-left': {
            transition: 'all 0.4s cubic-bezier(0.23, 1, 0.320, 1)',
            '&:hover': {
                transform: 'translateY(-3px) rotateZ(-2deg) scale(1.05)',
            }
        },
        '.hover-tilt-right': {
            transition: 'all 0.4s cubic-bezier(0.23, 1, 0.320, 1)',
            '&:hover': {
                transform: 'translateY(-3px) rotateZ(2deg) scale(1.05)',
            }
        },
        '.hover-3d': {
            transition: 'all 0.5s cubic-bezier(0.23, 1, 0.320, 1)',
            '&:hover': {
                transform: 'translateY(-8px) scale(1.03) rotateZ(1deg)',
                boxShadow: theme('boxShadow.golden-glow'),
            }
        },
        '.hover-bounce': {
            transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            '&:hover': {
                transform: 'translateY(-6px) scale(1.1)',
                boxShadow: theme('boxShadow.heritage-lg'),
            }
        },
        '.hover-glow': {
            transition: 'all 0.3s ease',
            '&:hover': {
                boxShadow: theme('boxShadow.golden-glow'),
                transform: 'scale(1.02)',
            }
        },
      });
    }),
  ],
}
