module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {},
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
    daisyui: {
        styled: true,
        rtl: false,
        themes: [
            {
                mytheme: {
                    primary: '#6365f1',
                    'primary-focus': '#5557d4',
                    'primary-content': '#ffffff',
                    secondary: '#f000b8',
                    'secondary-focus': '#bd0091',
                    'secondary-content': '#ffffff',
                    accent: '#37cdbe',
                    'accent-focus': '#2aa79b',
                    'accent-content': '#ffffff',
                    neutral: '#292a4f',
                    'neutral-focus': '#2a2e37',
                    'neutral-content': '#ffffff',
                    'base-100': '#ffffff',
                    'base-200': '#f9fafb',
                    'base-300': '#d1d5db',
                    'base-content': '#1f2937',
                    info: '#2094f3',
                    success: '#009485',
                    warning: '#ff9900',
                    error: '#ff5724'
                }
            }
        ]
    }
}
