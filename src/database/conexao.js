import Realm from 'realm';
import ListasSchema from './schemas/listasSchema';
import ItensDaLista from './schemas/itensDaListaSchema';

export default function getRealm() {
  return Realm.open({
    schema: [ListasSchema, ItensDaLista],
  });
}
