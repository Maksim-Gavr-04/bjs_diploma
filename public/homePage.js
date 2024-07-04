"use strict"

// ---------- ВЫХОД ---------- \\
const logoutButton = new LogoutButton();

logoutButton.action = () => {
  const responseToLogout = response => {
    if (response.success === true) {
      location.reload();
    }
  };

  ApiConnector.logout(responseToLogout);
};

// ---------- ПОЛУЧЕНИЕ ИНФОРМАЦИИ О ПОЛЬЗОВАТЕЛЕ ---------- \\
ApiConnector.current(response => {
  if (response.success === true) {
    ProfileWidget.showProfile(response.data);
  }
});

// ---------- ПОЛУЧЕНИЕ ТЕКУЩИХ КУРСОВ ВАЛЮТЫ ---------- \\
const ratesBoard = new RatesBoard();

const receivingExchangeRates = () => {
  ApiConnector.getStocks(response => {
    if (response.success === true) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    }
  });
};

receivingExchangeRates();
setInterval(receivingExchangeRates, 60000);

// ---------- ОПЕРАЦИИ С ДЕНЬГАМИ ---------- \\

// ПОПОЛНЕНИЕ БАЛАНСА:

// КОНВЕРТИРОВАНИЕ ВАЛЮТЫ:

// ПЕРЕВОД ВАЛЮТЫ:


// ---------- РАБОТА С ИЗБРАННЫМ ---------- \\

// ЗАПРОС НАЧАЛЬНОГО СПИСКА ИЗБРАННОГО:

// ДОБАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯ В СПИСОК ИЗБРАННЫХ:

// УДАЛЕНИЕ ПОЛЬЗОВАТЕЛЯ ИЗ СПИСКА ИЗБРАННЫХ: