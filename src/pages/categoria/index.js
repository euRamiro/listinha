import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {Jiro} from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/Feather';

import conexao from '../../database/conexao';

import styles from './styles';

export default function Categoria() {
  const navegar = useNavigation();

  const [descricao, setDescricao] = useState('');
  const [categoriasList, setCategoriasList] = useState([]);

  async function carregarCategorias() {
    const realm = await conexao();
    const data = await realm.objects('Categoria').sorted('descricao', false);
    setCategoriasList(data); 
  }

  useEffect(() => {
    carregarCategorias();
  }, []);

  function handleVoltar() {
    navegar.goBack();
  }

  async function handleGravar() {
    const novaCategoria = {
      descricao,
    };
    try {
      const realm = await conexao();
      let ID;
      ID = await realm.objects('Categoria').max('id');
      ID > 0 ? (novaCategoria.id = ID + 1) : (novaCategoria.id = 1);

      await realm.write(() => {
        realm.create('Categoria', novaCategoria, 'modified');
      });
      setDescricao('');
    } catch (error) {
      console.log(novaCategoria);
      console.log('erro gravar nova categoria: ', error);
    }
  }

  async function removerItem(item) {
    const realm = await conexao();
    realm.write(() => {
      const itemExluir = realm
        .objects('Categoria')
        .filtered('id == $0', item.id);
      realm.delete(itemExluir);
    });
    carregarCategorias();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Adiciona nova categoria</Text>
      </View>

      <View style={styles.containerInputs}>
        <Jiro
          label={'Descrição da categoria'}
          labelStyle={{fontSize: 18, fontWeight: 'bold'}}
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

      <FlatList
        style={styles.containerItens}
        data={categoriasList}
        keyExtractor={(item) => String(item.id)}
        renderItem={({item}) => {
          return (
            <View id="viewContainer" style={styles.containerItem}>
              <View style={styles.categoria}>
                <Text style={styles.descricaoItem}>{item.descricao}</Text>
                <TouchableOpacity
                  onPress={() => {
                    removerItem(item);
                  }}>
                  <Icon name="trash-2" size={18} />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
