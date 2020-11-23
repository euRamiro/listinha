import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Listas from './pages/listas';
import NovaLista from './pages/novaLista';
import ItensDaLista from './pages/itensDaLista';
import NovoItem from './pages/novoItem';
import Categoria from './pages/categoria';

export default function Routes() {
  return (
    <NavigationContainer>
      {/* passando screenOptions={{ headerShown: false}} para o AppStack */}
      {/* desabilito o cabeçalho da página */}
      <AppStack.Navigator screenOptions={{headerShown: false}}>
        <AppStack.Screen name="Home" component={Listas} />
        <AppStack.Screen name="NovaLista" component={NovaLista} />
        <AppStack.Screen name="ItensDaLista" component={ItensDaLista} />
        <AppStack.Screen name="NovoItem" component={NovoItem} />
        <AppStack.Screen name="Categoria" component={Categoria} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
