import React, {useState, useEffect} from 'react';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import {CheckBox} from 'react-native-elements';
import conexao from '../../database/conexao';

import styles from './styles';

export default function ItensDaLista({navigation, route}) {
  const navegar = useNavigation();
  let {listaSelecionada} = route.params;
  const [itensDaLista, setItensDaLista] = useState([]);

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
  async function atualizarTotalDaLista() {
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
  async function atualizarLista() {
    atualizarQtdeItensDaLista();
    atualizarTotalDaLista();
    const realm = await conexao();
    const lista = await realm
      .objects('Listas')
      .filtered('Lista.id == $0', listaSelecionada.id);
    listaSelecionada = lista;
  }
  async function carregarItensDaLista() {
    atualizarLista();
    const realm = await conexao();
    const dados = await realm
      .objects('ItensDaLista')
      .filtered(
        'Lista.id == $0 SORT(riscado ASC, produto ASC, categoria ASC)',
        listaSelecionada.id,
      );
    setItensDaLista(dados);
  }

  useEffect(() => {
    carregarItensDaLista();
  }, []);

  useIsFocused(() => {
    carregarItensDaLista();
  });

  function navegarVoltar() {
    navegar.goBack();
  }
  function navegarNovoItem() {
    navegar.navigate('NovoItem', {
      listaSelecionada,
    });
  }
  function editarItem(itemSelecionado) {
    navegar.navigate('NovoItem', {
      listaSelecionada,
      itemSelecionado,
    });
  }

  async function removerItem(item) {
    const realm = await conexao();
    realm.write(() => {
      const itemExluir = realm
        .objects('ItensDaLista')
        .filtered('id == $0', item.id);
      realm.delete(itemExluir);
    });
    carregarItensDaLista();
  }

  async function riscarItem(item) {
    const realm = await conexao();
    await realm.write(() => {
      item.riscado ? (item.riscado = false) : (item.riscado = true);
      realm.create('ItensDaLista', item, 'modified');
    });
    carregarItensDaLista();
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.botaoItensDaLista}
          onPress={navegarVoltar}>
          <Icon name="arrow-left" size={20} color="#e02041" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{listaSelecionada.descricao}</Text>
        <TouchableOpacity
          style={styles.botaoItensDaLista}
          onPress={navegarNovoItem}>
          <Icon name="plus-circle" size={20} color="#e02041" />
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.containerItens}
        data={itensDaLista}
        keyExtractor={(item) => String(item.id)}
        renderItem={({item}) => {
          return (
            <View id="viewContainer" style={styles.containerItem}>
              <View style={styles.produto}>
                <Text style={styles.descricaoItem}>{item.produto}</Text>
                <TouchableOpacity
                  onPress={() => {
                    editarItem(item);
                  }}>
                  <Icon name="edit" size={18} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    removerItem(item);
                  }}>
                  <Icon name="trash-2" size={18} />
                </TouchableOpacity>
              </View>
              <View style={styles.qtdeValor}>
                <View style={styles.informarTitulo}>
                  <Text style={styles.informarTituloItem}> </Text>
                  <Text style={styles.informarTituloItem}>Qtde</Text>
                  <Text style={styles.informarTituloItem}>Valor Unitário</Text>
                  <Text style={styles.informarTituloItem}>Total</Text>
                </View>
                <View style={styles.informaQtdeValor}>
                  <View style={styles.informaQtdeValorInputView}>
                    <CheckBox
                      className="checkbox"
                      checked={item.riscado}
                      onPress={() => {
                        riscarItem(item);
                      }}
                      uncheckedColor="red"
                    />
                  </View>
                  <View style={styles.informaQtdeValorInputView}>
                    <Text style={styles.informaQtdeValorInput}>
                      {item.quantidade}
                    </Text>
                  </View>
                  <View style={styles.informaQtdeValorInputView}>
                    <Text style={styles.informaQtdeValorInput}>
                      {item.valor}
                    </Text>
                  </View>
                  <View style={styles.informaQtdeValorInputView}>
                    <Text style={styles.informaQtdeValorInput}>
                      {item.subTotal.toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
      />
      <View style={styles.rodape}>
        <Text style={styles.rodapeTexto}>
          Itens {listaSelecionada.quantidadeItens}
        </Text>
        <Text style={styles.rodapeTexto}>
          Total R$
          {listaSelecionada.total.toFixed(2)}
        </Text>
      </View>
    </View>
  );
}
