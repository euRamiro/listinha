export default class ItensDaListaSchema {
  static schema = {
    name: 'ItensDaLista',
    primaryKey: 'id',
    properties: {
      id: {type: 'int', indexed: true},
      Lista: {type: 'Listas'},
      produto: 'string',
      quantidade: 'double',
      valor: 'double',
      subTotal: 'double',
      riscado: {type: 'bool', default: false},
    },
  };
}
