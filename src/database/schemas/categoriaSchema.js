export default class CategoriaSchema {
  static schema = {
    name: 'Categoria',
    primaryKey: 'id',
    properties: {
      id: {type: 'int', indexed: true},
      descricao: 'string',
    },
  };
}
