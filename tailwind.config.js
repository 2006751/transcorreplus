module.exports = {
    content: [
        "./src/**/*.{html,js,vue}",
        "./src/components/**/*.{js,vue,ts}",
        "./src/layouts/**/*.vue",
        "./src/pages/**/*.vue",
        "./src/plugins/**/*.{js,ts}",
        "./vite.config.{js,ts}",
    ],
    theme: {
        extend: {},
        colors: {
            primary: '#1c5ca2',
            secondary: '#183f6a',
            accent: '#f2f2f2',
            white: '#FFFFFF',
            'black': '#484848',
        },
    },
    plugins: [],
}
