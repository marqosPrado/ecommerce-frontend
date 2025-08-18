import { Routes } from '@angular/router';
import {ClientRegister} from './components/client-register/client-register';
import {ListClients} from './components/list-clients/list-clients';
import {EditClient} from './components/edit-client/edit-client';

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
    path: 'client/:id',
    component: EditClient
  }
];
