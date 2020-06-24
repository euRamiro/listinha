import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, TouchableOpacity} from 'react-native';
import conexao from '../../database/conexao';
import novaLista from '../../database/schemas/listasSchema';
import {Jiro} from 'react-native-textinput-effects';

import styles from './styles';

export default function NovaLista() {
  const [descricao, setDescricao] = useState('');
  const navegar = useNavigation();

  function handleVoltar() {
    navegar.goBack();
  }
  async function handleGravar() {
    const novaLista = {
      descricao: descricao,
    };
    //conexão com o Realm
    const realm = await conexao();
    var ID =
      (await realm.objects('Listas').max('id')) > 0
        ? realm.objects('Listas').max('id') + 1
        : (ID = 1);
    novaLista.id = ID;
    //todo create, update ou remove deve ser encapsulado em um write
    await realm.write(() => {
      //aqui dentro da conexão com a base de dados está aberta.
      realm.create('Listas', novaLista, 'modified');
    });
    console.log(novaLista);
    handleVoltar();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Nova lista</Text>
      </View>
      <View style={styles.nomeDaLista}>
        <Jiro
          style={styles.nomeDaListaInput}
          label={'Nome da lista'}
          borderColor={'#e02041'}
          inputPadding={20}
          inputStyle={{color: 'white'}}
          value={descricao}
          onChangeText={setDescricao}
        />
      </View>

      <View style={styles.acoes}>
        <TouchableOpacity style={styles.acao} onPress={handleVoltar}>
          <Text style={styles.botaoTexto}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.acao} onPress={handleGravar}>
          <Text style={styles.botaoTexto}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
