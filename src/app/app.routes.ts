import { Routes } from '@angular/router';
import {ClientRegister} from './components/client-register/client-register';
import {ListClients} from './components/list-clients/list-clients';
import {EditClient} from './components/edit-client/edit-client';
import {ClientWallet} from './components/client-wallet/client-wallet';
import {Main} from './components/main/main';
import {ProductDetails} from './components/product-details/product-details';
import {Cart} from './components/cart/cart';
import {ProductSearch} from './components/product-search/product-search';
import {Login} from './components/login/login';
import {Admin} from './components/admin/admin';
import {AdminClientManagement} from './components/admin-client-management/admin-client-management';
import {AdminProductManagement} from './components/admin-product-management/admin-product-management';
import {AdminAnalytics} from './components/admin-analytics/admin-analytics';
import {ClientDashboard} from './components/client-dashboard/client-dashboard';
import {Orders} from './components/client-order/Orders';

export const routes: Routes = [
  {
    path: '',
    component: Main
  },
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
    path: 'minha-conta',
    component: ClientDashboard
  },
  {
    path: 'minha-conta/carteira',
    component: ClientWallet
  },
  {
    path: 'produto/:id',
    component: ProductDetails
  },
  {
    path: 'carrinho',
    component: Cart
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'produto',
    component: ProductSearch
  },
  {
    path: 'admin',
    component: Admin
  },
  {
    path: 'admin/clientes',
    component: AdminClientManagement
  },
  {
    path: 'admin/produtos',
    component: AdminProductManagement
  },
  {
    path: 'admin/analises',
    component: AdminAnalytics
  },
  {
    path: 'meus-pedidos',
    component: Orders
  }
  // {
  //   path: 'admistrador/produto/cadastro'
  // }
];
