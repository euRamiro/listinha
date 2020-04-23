import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import conexao from '../../database/conexao';
import novaLista from '../../database/schemas/listasSchema';

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
        <TextInput
          style={styles.nomeDaListaInput}
          placeholder="Nome da lista"
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
