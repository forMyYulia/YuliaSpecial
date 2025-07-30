module.exports = {
    theme: {
        extend: {
            animation: {
                'color-change': 'color-change 1s ease-out forwards', // 'fadeIn' refers to the keyframe name
            },
            keyframes: {
                fadeIn: {
                    '0%': {
                        'background-color': '#EBADAE'
                    },
                    '25%': {
                        'background-color': '#F1CFD0'
                    },
                    '50%': {
                        'background-color': '#F7C5C8'
                    },
                    '75%': {
                        'background-color': '#F4B6B7'
                    },
                    '100%': {
                        'background-color': '#F3CACE'
                    },
                },
            },
        },
    },
}