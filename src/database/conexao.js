import Realm from 'realm';
import ListasSchema from './schemas/listasSchema';
import ItensDaLista from './schemas/itensDaListaSchema';
import Categoria from './schemas/categoriaSchema';

export default function getRealm() {
  return Realm.open({
    schema: [ListasSchema, ItensDaLista, Categoria],
  });
}
