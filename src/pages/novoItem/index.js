import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, TouchableOpacity} from 'react-native';

import NumericInput from 'react-native-numeric-input';
import {TextInputMask} from 'react-native-masked-text';
import {Jiro} from 'react-native-textinput-effects';

import conexao from '../../database/conexao';

import styles from './styles';

export default function novoItem({navigation, route}) {
  const {listaSelecionada} = route.params;
  const navegar = useNavigation();

  const [produto, setProduto] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [valor, setValor] = useState(0);

  function handleVoltar() {
    navegar.goBack();
  }

  async function handleGravar() {
    const novoItem = {
      Lista: listaSelecionada,
      produto,
      quantidade,
      valor,
      subTotal: quantidade > 0 && valor > 0 ? quantidade * valor : 0,
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
        <Text style={styles.headerText}>Adiciona novo item</Text>
        <Text style={styles.headerTexta}>{listaSelecionada.descricao}</Text>
      </View>

      <View style={styles.containerInputs}>
        <Jiro
          label={'Descricção do item'}
          labelStyle={{fontSize: 18, fontWeight: 'bold'}}
          borderColor={'#e02041'}
          inputPadding={20}
          inputStyle={{color: 'white'}}
          value={produto}
          onChangeText={setProduto}
        />
        <Text style={styles.textInputs}>Quantidade</Text>
        <NumericInput
          value={quantidade}
          onChange={setQuantidade}
          minValue={0}
          maxValue={99}
          textColor={'#000'}
          totalWidth={240}
          totalHeight={40}
          iconSize={20}
          step={1}
          valueType="integer"
          iconStyle={{color: 'white'}}
          rightButtonBackgroundColor="#e02041"
          leftButtonBackgroundColor="#E56B70"
        />
        <Text style={styles.textInputs}>Valor Unitário</Text>
        <TextInputMask
          type={'money'}
          options={{
            precision: 2,
            separator: '.',
            delimiter: ',',
            unit: 'R$',
            suffixUnit: '',
          }}
          value={valor}
          onChangeText={setValor}
          style={styles.valor}
          placeholder="R$ 0,00"
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
