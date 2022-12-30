const path = require('path');

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src/'),
            '@components': path.resolve(__dirname, 'src/components/'),
            '@pages': path.resolve(__dirname, 'src/components/pages/'),
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@reducers': path.resolve(__dirname, 'src/reducers/'),
            '@hooks': path.resolve(__dirname, 'src/hooks/'),
            '@general': path.resolve(__dirname, 'src/components/pages/general/'),
            '@user': path.resolve(__dirname, 'src/components/pages/user/'),
            '@rental': path.resolve(__dirname, 'src/components/pages/rental/'),
            '@reusables': path.resolve(__dirname, 'src/components/reusables/'),
        },
    },
};
