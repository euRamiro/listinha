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
  valor: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 15,
  },
  acoes: {
    marginTop: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});
