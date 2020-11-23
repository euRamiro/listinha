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
    marginTop: 20,
    marginBottom: 20,
  },
  containerInputs: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    borderRadius: 8,
    backgroundColor: '#FFF',
    paddingBottom: 30,
  },
  textInputs: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },
  descricaoItem: {
    fontSize: 22,
    color: '#41414d',
    fontWeight: 'bold',
  },
  acoes: {
    marginTop: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  acao: {
    backgroundColor: '#e02041',
    borderRadius: 8,
    height: 50,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  containerItens: {
    marginTop: 5,
  },
  containerItem: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#d9d9d9',
    marginBottom: 10,
  },
  categoria: {
    marginLeft: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
