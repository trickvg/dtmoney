import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  models: {
    transaction: Model,
  },
  seeds(server) {
    server.db.loadData({
      transactions: [
          {
            id: 1,
            title: 'Transaction 1',
            amount: 400,
            type: 'deposit',
            category: 'Food',
            createdAt: new Date("2021-06-11 00:00:00")
          },
          {
            id: 2,
            title: 'Disney Plus',
            amount: 100,
            type: 'withdraw',
            category: 'Streaming Service',
            createdAt: new Date("2021-06-12 12:00:00")
          }
        ]
      });
    },

  routes() {

    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    });

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create('transaction', data);
    });
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);