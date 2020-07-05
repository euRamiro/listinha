import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, TouchableOpacity} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import {Jiro} from 'react-native-textinput-effects';

import conexao from '../../database/conexao';

import styles from './styles';

export default function novoItem({navigation, route}) {
  const {listaSelecionada} = route.params;
  const {itemSelecionado} = route.params || undefined;
  const navegar = useNavigation();

  const [produto, setProduto] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [valor, setValor] = useState(0);

  useEffect(() => {
    if (itemSelecionado) {
      setProduto(itemSelecionado.produto);
      setQuantidade(itemSelecionado.quantidade);
      setValor(itemSelecionado.valor);
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
      valor: valor,
      subTotal: quantidade * valor,
    };
    try {
      const realm = await conexao();

      itemSelecionado !== undefined
        ? (novoItem.id = itemSelecionado.id)
        : (novoItem.id =
            realm
              .objects('ItensDaLista')
              .filtered('Lista.id == $0', listaSelecionada.id)
              .max('id') + 1);
      await realm.write(() => {
        realm.create('ItensDaLista', novoItem, 'modified');
      });

      atualizarQtdeItensDaLista();
      atualizarTotalDaLista(novoItem);
      handleVoltar();
    } catch (error) {
      console.log('erro gravar novo item: ' + valor, error);
    }
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
          returnKeyType={'go'}
          label={'Quantidade'}
          labelStyle={{fontSize: 18, fontWeight: 'bold'}}
          borderColor={'#e02041'}
          inputPadding={20}
          inputStyle={{color: 'white'}}
          value={quantidade}
          onChangeText={setQuantidade}
        />
        {/* <Text style={styles.textInputs}>Quantidade</Text>
        <TextInputMask
          type={'only-numbers'}
          keyboardType={'number-pad'}
          options={{
            precision: 0,
            suffixUnit: '',
          }}
          selectTextOnFocus={true}
          value={quantidade}
          onChangeText={setQuantidade}
          style={styles.quantidade}
        /> */}
        <Jiro
          keyboardType={'decimal-pad'}
          returnKeyType={'go'}
          label={'Valor'}
          labelStyle={{fontSize: 18, fontWeight: 'bold'}}
          borderColor={'#e02041'}
          inputPadding={20}
          inputStyle={{color: 'white'}}
          value={valor}
          onChangeText={setValor}
        />
        {/* <Text style={styles.textInputs}>Valor Unitário</Text>
        <TextInputMask
          style={styles.valor}
          type={'money'}
          options={{
            precision: 2,
            separator: ',',
            delimiter: '.',
            unit: 'R$',
            suffixUnit: '',
          }}
          value={valor}
          onChangeText={setValor}
        /> */}
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
