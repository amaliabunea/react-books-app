import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import { BookEdit } from './BookEdit';
import { BookList } from './BookList';
import { Chart } from './Chart';
import { MapsIntent } from './MapsIntent'

export const Screens = createStackNavigator({
    BookList: { screen: BookList },
    BookEdit: { screen: BookEdit },
    Chart: {screen: Chart},
    MapsIntent: {screen: MapsIntent}
});

export * from './BookStore';

