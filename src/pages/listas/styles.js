import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    //pega o tamanho da statuBar e soma + 20px
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 15,
    color: '#737380',
    fontWeight: 'bold',
  },
  botaoNovaLista: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  botaoNovaListaText: {
    fontSize: 14,
    color: '#41414b',
    fontWeight: 'bold',
  },
  titulo: {
    fontSize: 30,
    marginBottom: 16,
    marginTop: 48,
    color: '#13131a',
    fontWeight: 'bold',
  },
  instrucao: {
    fontSize: 16,
    lineHeight: 24,
    color: '#737380',
  },
  listas: {
    marginTop: 32,
  },
  item: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#dcda48',
    marginBottom: 15,
  },
  tituloLista: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tituloDestacado: {
    fontSize: 20,
    fontWeight: 'bold',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  botaoExcluirLista: {},
  quantidadeItens: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 5,
  },
  propriedade: {
    fontSize: 14,
    color: '#41414b',
    fontWeight: 'bold',
  },
  conteudo: {
    marginLeft: 10,
    marginTop: 5,
    fontSize: 15,
    marginBottom: 5,
    color: '#737380',
  },
  botaoItensDaLista: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  botaoItensDaListaText: {
    color: '#e02041',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
