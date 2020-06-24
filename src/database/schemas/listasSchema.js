export default class ListasSchema {
  static schema = {
    name: 'Listas',
    primaryKey: 'id',
    properties: {
      id: {type: 'int', indexed: true},
      descricao: 'string',
      quantidadeItens: {type: 'int?', default: 0},
      total: {type: 'double?', default: 0},
    },
  };
}
