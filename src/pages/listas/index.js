import React, {useState, useEffect} from 'react';
import Icons from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {View, FlatList, Text, Image, TouchableOpacity} from 'react-native';
import conexao from '../../database/conexao';
import {AdMobBanner, setTestDeviceAsync} from 'react-native-admob';

import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Listas({navigation}) {
  const navegar = useNavigation();
  const [listas, setListas] = useState([]);

  async function carregarListas() {
    const realm = await conexao();
    const data = await realm.objects('Listas').sorted('id', false);
    setListas(data);
    addCategorias();    
  }

  async function addCategorias() {
    const realm = await conexao();
    const CategoriasList = await realm.objects('Categoria');
    if (CategoriasList.length < 2) {
      let objs = [
        {id: 1, descricao: 'Mercearia'},
        {id: 2, descricao: 'Bebidas'},
        {id: 3, descricao: 'Carnes'},
        {id: 4, descricao: 'Frios'},
        {id: 5, descricao: 'Frutas e verduras'},
        {id: 6, descricao: 'Higiêne pessoal'},
        {id: 7, descricao: 'Limpeza'},
        {id: 8, descricao: 'Saúde e beleza'},
        {id: 9, descricao: 'Diversos'},
      ];
      realm.write(() => {
        objs.forEach((obj) => {
          realm.create('Categoria', obj);
        });
      });
    }
  }

  useEffect(() => {
    carregarListas();    
  }, [listas]);

  function navegarParaItensDaLista(listaSelecionada) {
    navegar.navigate('ItensDaLista', {
      listaSelecionada,
    });
  }
  function navegarParaNovaLista() {
    navegar.navigate('NovaLista');
  }
  async function removerLista(lista) {
    const realm = await conexao();
    realm.write(() => {
      // const itensDaListaExcluir = realm
      //   .objects('ItensDaLista')
      //   .filtered('Lista.id == $0', lista.id);
      // realm.deleteAll(itensDaListaExcluir);

      const listaExcluir = realm
        .objects('Listas')
        .filtered('id == $0', lista.id);
      realm.delete(listaExcluir);
    });
    //carregarListas();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.titulo}>Bem-vindo!</Text>
      </View>
      <Text style={styles.instrucao}>
        Clique em uma lista para ver os items.
      </Text>
      <View style={styles.header}>
        {/* <TouchableOpacity onPress={carregarListas}>
          <Text>Atualizar Lista</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.botaoNovaLista}
          onPress={navegarParaNovaLista}>
          <Text style={styles.botaoNovaListaText}>Nova Lista</Text>
          <Icons name="plus-circle" size={30} color="#e02041" />
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.listas}
        data={listas}
        keyExtractor={(item) => String(item.id)}
        renderItem={({item}) => {
          return (
            <View style={styles.item}>
              <View style={styles.tituloLista}>
                <Text style={styles.tituloDestacado}>{item.descricao}</Text>
                <TouchableOpacity
                  style={styles.botaoExcluirLista}
                  onPress={() => {
                    removerLista(item);
                  }}>
                  <Icons name="trash-2" size={18} />
                </TouchableOpacity>
              </View>
              <View style={styles.quantidadeItens}>
                <Text style={styles.propriedade}>
                  Quantidade de itens {item.quantidadeItens}
                </Text>
                <Text style={styles.propriedade}>
                  Total R$ {item.total.toFixed(2)}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.botaoItensDaLista}
                onPress={() => {
                  navegarParaItensDaLista(item);
                }}>
                <Text style={styles.botaoItensDaListaText}>
                  ver itens da lista
                </Text>
                <Icons name="arrow-right" size={20} color="#e02041" />
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <View style={styles.bannerAds}>
        <AdMobBanner
          adSize="fullBanner"
          adUnitID="ca-app-pub-8374324571031415/1519150634"
          onAdFailedToLoad={(err) => {
            console.log(err);
          }}
        />
      </View>
    </View>
  );
}
