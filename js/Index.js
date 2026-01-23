        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        brand: {
                            primary: '#002651', // Azul Profundo
                            purple: '#8A2BE2',  // Morado
                            cyan: '#00CED1',    // Turquesa
                            dark: '#0f172a',    // Slate 900
                            light: '#f8fafc',   // Slate 50
                        }
                    },
                    backgroundImage: {
                        'gradient-brand': 'linear-gradient(135deg, #8A2BE2 0%, #00CED1 100%)',
                        'gradient-hero': 'linear-gradient(to bottom right, #002651, #1e1b4b, #0f172a)',
                    },
                    fontFamily: {
                        sans: ['Inter', 'system-ui', 'sans-serif'],
                    },
                    keyframes: {
                        fadeInUp: {
                            '0%': { opacity: '0', transform: 'translateY(20px)' },
                            '100%': { opacity: '1', transform: 'translateY(0)' },
                        },
                        pulseLogo: {
                            '0%, 100%': { transform: 'scale(1)', opacity: '1' },
                            '50%': { transform: 'scale(1.05)', opacity: '0.9' },
                        }
                    },
                    animation: {
                        'pulse-logo': 'pulseLogo 2s infinite ease-in-out',
                    }
                }
            }
        }


        