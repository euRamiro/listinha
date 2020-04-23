import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import InputSpinner from 'react-native-input-spinner';
import conexao from '../../database/conexao';

import styles from './styles';

export default function novoItem({navigation, route}) {
  const {listaSelecionada} = route.params;
  const navegar = useNavigation();

  const [produto, setProduto] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [valor, setValor] = useState('');

  function handleVoltar() {
    navegar.goBack();
  }

  async function handleGravar() {
    const novoItem = {
      Lista: listaSelecionada,
      produto,
      quantidade,
      valor,
      subTotal: quantidade.toFixed(2) * valor.toFixed(2),
    };
    const realm = await conexao();
    var ID =
      (await realm
        .objects('ItensDaLista')
        .filtered('Lista.id == $0', listaSelecionada.id)
        .max('id')) > 0
        ? realm
            .objects('ItensDaLista')
            .filtered('Lista.id == $0', listaSelecionada.id)
            .max('id') + 1
        : (ID = 1);
    novoItem.id = ID;
    await realm.write(() => {
      realm.create('ItensDaLista', novoItem, 'modified');
    });
    atualizarQtdeItensDaLista();
    atualizarTotalDaLista(novoItem);
    handleVoltar();
  }

  async function atualizarQtdeItensDaLista() {
    const realm = await conexao();
    await realm.write(() => {
      listaSelecionada.quantidadeItens = ++listaSelecionada.quantidadeItens;
      realm.create('Listas', listaSelecionada, 'modified');
    });
  }

  async function atualizarTotalDaLista(item) {
    const realm = await conexao();
    await realm.write(() => {
      listaSelecionada.total = listaSelecionada.total + item.subTotal;
      realm.create('Listas', listaSelecionada, 'modified');
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Adiciona novo produto {listaSelecionada.descricao}
        </Text>
      </View>

      <View style={styles.containerInputs}>
        <TextInput
          style={styles.produto}
          placeholder="Nome do produto"
          value={produto}
          onChangeText={setProduto}
        />
        <Text>Quantidade</Text>
        <InputSpinner
          value={Number(quantidade).toFixed(2)}
          onChange={setQuantidade}
          width={200}
          type="float"
        />
        <Text>Valor Unitário</Text>
        <InputSpinner
          width={200}
          step={0.1}
          precision={2}
          type="float"
          value={Number(valor).toFixed(2)}
          onChange={setValor}
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
