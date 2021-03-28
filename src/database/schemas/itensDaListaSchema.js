export default class ItensDaListaSchema {
  static schema = {
    name: 'ItensDaLista',
    primaryKey: 'id',
    properties: {
      id: {type: 'int', indexed: true},
      Lista: {type: 'Listas'},
      produto: 'string',
      quantidade: {type: 'int?', default: 0},
      valor: {type: 'double?', default: 0},
      subTotal: {type: 'double?', default: 0},
      riscado: {type: 'bool', default: false},
      categoria: {type: 'int?', default: 0},
    },
  };
}
