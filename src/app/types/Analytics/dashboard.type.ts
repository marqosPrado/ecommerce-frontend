export interface DashboardResponse {
  totalCustomer: {
    totalCustomer: number;
    growthTotalCustomer: number;
  };
  pendingOrders: number;
  openExchanges: number;
  deliveryToday: number;
}
