import { Routes } from '@angular/router';
import {ClientRegister} from './components/client-register/client-register';
import {ListClients} from './components/list-clients/list-clients';
import {EditClient} from './components/edit-client/edit-client';
import {ClientWallet} from './components/client-wallet/client-wallet';

export const routes: Routes = [
  {
    path: 'client/register',
    component: ClientRegister
  },
  {
    path: 'client/all',
    component: ListClients
  },
  {
    path: 'client/edit/:id',
    component: EditClient
  },
  {
    path: 'minha-conta/carteira',
    component: ClientWallet
  }
];
