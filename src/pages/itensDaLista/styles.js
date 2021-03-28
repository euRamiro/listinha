import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: '#737380',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
  },
  containerItens: {
    marginTop: 5,
    marginBottom: 25,
  },
  containerItem: {
    paddingTop: 8,
    paddingLeft: 1,
    paddingRight: 8,
    paddingBottom: 1,
    borderRadius: 15,
    backgroundColor: '#d9d9d9',
    marginBottom: 5,
  },
  // containerItem: {
  //   opacity: 0.8,
  // },
  produto: {
    marginLeft: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  descricaoItem: {
    fontSize: 22,
    color: '#41414d',
    fontWeight: 'bold',
  },
  qtdeValor: {},
  informarTitulo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  informarTituloItem: {
    fontSize: 15,
    color: '#41414d',
    fontWeight: 'bold',
  },
  informaQtdeValor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  informaQtdeValorInput: {
    textAlign: 'center',
    borderBottomColor: '#e02041',
    borderBottomWidth: 0.5,
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  rodape: {
    position: 'absolute',
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: -2,
    padding: 20,
    backgroundColor: '#ff6666',
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rodapeTexto: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
