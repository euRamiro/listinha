import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, TouchableOpacity} from 'react-native';
import {Jiro} from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/Feather';
import {Picker} from '@react-native-picker/picker';

import conexao from '../../database/conexao';

import styles from './styles';

export default function novoItem({route}) {
  const {listaSelecionada} = route.params;
  const {itemSelecionado} = route.params || undefined;
  const navegar = useNavigation();

  const [produto, setProduto] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [valor, setValor] = useState(0);

  const [categoriasList, setCategoriasList] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');

  async function carregarCategorias() {
    const realm = await conexao();
    const data = await realm.objects('Categoria').sorted('descricao', false);
    setCategoriasList(data);
  }

  useEffect(() => {
    if (itemSelecionado) {
      setProduto(itemSelecionado.produto);
      setQuantidade(String(itemSelecionado.quantidade));
      setValor(String(itemSelecionado.valor));
    }
    carregarCategorias();
  }, []);

  function handleVoltar() {
    navegar.goBack();
  }

  async function handleGravar() {
    const novoItem = {
      Lista: listaSelecionada.id,
      produto,
      categoria: 1,
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

  function navegarNovaCategoria() {
    navegar.navigate('Categoria');
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
        <Text style={styles.headerText}>{listaSelecionada.descricao}</Text>
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
        <View>
          <Text style={styles.headerText}>Categoria</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Picker
              style={{height: 50, width: '60%'}}
              selectedValue={categoriaSelecionada}
              onValueChange={categoriaSelecionada => setCategoriaSelecionada(categoriaSelecionada)} >
              {categoriasList !== '' ? (
                categoriasList.map(categoria => (
                  <Picker.Item 
                    key={categoria.id}
                    label={categoria.descricao}
                    value={categoria.id}
                  />
                )
                  
                  )
              ) : (
                <Picker.Item label="cadastre categorias" value="0" />
              )}
            </Picker>

            <TouchableOpacity onPress={navegarNovaCategoria}>
              <Icon name="plus-circle" size={20} color="#e02041" />
            </TouchableOpacity>
          </View>
        </View>
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
