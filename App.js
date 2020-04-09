  
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import React from 'react';

import Routes from './src/routes';

console.disableYellowBox = true;

export default function App() {
    return (
        <Routes />
    );
};