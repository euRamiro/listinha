import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, TouchableOpacity} from 'react-native';
import {Jiro} from 'react-native-textinput-effects';

import conexao from '../../database/conexao';

import styles from './styles';

export default function novoItem({route}) {
  const {listaSelecionada} = route.params;
  const {itemSelecionado} = route.params || undefined;
  const navegar = useNavigation();

  const [produto, setProduto] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [valor, setValor] = useState(0);

  useEffect(() => {
    if (itemSelecionado) {
      setProduto(itemSelecionado.produto);
      setQuantidade(String(itemSelecionado.quantidade));
      setValor(String(itemSelecionado.valor));
    }
  }, []);

  function handleVoltar() {
    navegar.goBack();
  }

  async function handleGravar() {
    const novoItem = {
      Lista: listaSelecionada,
      produto,
      quantidade: Number(quantidade),
      valor: Number(valor),
      subTotal: quantidade * valor,
    };
    try {
      const realm = await conexao();
      let ID;
      if (itemSelecionado !== undefined) {
        novoItem.id = itemSelecionado.id;
      } else {
        ID = await realm
          .objects('ItensDaLista')
          .filtered('Lista.id == $0', listaSelecionada.id)
          .max('id');
        ID > 0 ? (novoItem.id = ID + 1) : (novoItem.id = 1);
      }

      await realm.write(() => {
        realm.create('ItensDaLista', novoItem, 'modified');
      });

      atualizarQtdeItensDaLista();
      atualizarTotalDaLista(novoItem);
      handleVoltar();
    } catch (error) {
      console.log(novoItem);
      console.log('erro gravar novo item: ', error);
    }
  }

  async function atualizarQtdeItensDaLista() {
    const realm = await conexao();
    let quantidadeItens = await realm
      .objects('ItensDaLista')
      .filtered('Lista.id == $0', listaSelecionada.id).length;

    await realm.write(() => {
      listaSelecionada.quantidadeItens = quantidadeItens;
      realm.create('Listas', listaSelecionada, 'modified');
    });
  }

  async function atualizarTotalDaLista(item) {
    const realm = await conexao();
    let somaSubTotalItens = await realm
      .objects('ItensDaLista')
      .filtered('Lista.id == $0', listaSelecionada.id)
      .sum('subTotal');

    await realm.write(() => {
      listaSelecionada.total = somaSubTotalItens;
      realm.create('Listas', listaSelecionada, 'modified');
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Adiciona novo item</Text>
        <Text style={styles.headerTexta}>{listaSelecionada.descricao}</Text>
      </View>

      <View style={styles.containerInputs}>
        <Jiro
          label={'Descrição do item'}
          labelStyle={{fontSize: 18, fontWeight: 'bold'}}
          borderColor={'#e02041'}
          inputPadding={20}
          inputStyle={{color: 'white'}}
          value={produto}
          onChangeText={setProduto}
        />
        <Jiro
          keyboardType={'numeric'}
          label={'Quantidade'}
          labelStyle={{fontSize: 18, fontWeight: 'bold'}}
          borderColor={'#e02041'}
          inputPadding={20}
          inputStyle={{color: 'white'}}
          value={quantidade}
          onChangeText={setQuantidade}
        />
        <Jiro
          keyboardType={'decimal-pad'}
          label={'Valor'}
          labelStyle={{fontSize: 18, fontWeight: 'bold'}}
          borderColor={'#e02041'}
          inputPadding={20}
          inputStyle={{color: 'white'}}
          value={valor}
          onChangeText={setValor}
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
