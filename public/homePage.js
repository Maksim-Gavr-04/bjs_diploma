"use strict"

// ---------- ВЫХОД ---------- \\
const logout = new LogoutButton();
logout.action = () => {
  const responseToLogout = response => {
    if (response.success) {
      location.reload();
    }
  };

  ApiConnector.logout(responseToLogout);
};

// ---------- ПОЛУЧЕНИЕ ИНФОРМАЦИИ О ПОЛЬЗОВАТЕЛЕ ---------- \\
ApiConnector.current(response => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});

// ---------- ПОЛУЧЕНИЕ ТЕКУЩИХ КУРСОВ ВАЛЮТЫ ---------- \\
const ratesBoard = new RatesBoard();
const receivingExchangeRates = () => {
  ApiConnector.getStocks(response => {
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    }
  });
};

receivingExchangeRates();
setInterval(receivingExchangeRates, 60000);

// ---------- ОПЕРАЦИИ С ДЕНЬГАМИ ---------- \\
const moneyManager = new MoneyManager();
function actionsToMoney(response, message) {
  if (!response.success) {
      moneyManager.setMessage(false, response.error);
      return;
    }

    ProfileWidget.showProfile(response.data);
    moneyManager.setMessage(true, message);
}

// ПОПОЛНЕНИЕ БАЛАНСА:
moneyManager.addMoneyCallback = data => {
  ApiConnector.addMoney(data, response => actionsToMoney(response, "Пополнение счёта прошло успешно!"));
};

// КОНВЕРТИРОВАНИЕ ВАЛЮТЫ:
moneyManager.conversionMoneyCallback = data => {
  ApiConnector.convertMoney(data, response => actionsToMoney(response, "Конвертация прошла успешно!"));
};

// ПЕРЕВОД ВАЛЮТЫ:
moneyManager.sendMoneyCallback = data => {
  ApiConnector.transferMoney(data, response => actionsToMoney(response, "Перевод средств прошёл успешно!"));
};

// ---------- РАБОТА С ИЗБРАННЫМ ---------- \\
const favoritesWidget = new FavoritesWidget();
function actionsToFavorites(response, message) {
  if (!response.success) {
      moneyManager.setMessage(false, response.error);
      return; 
    }

    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
    moneyManager.setMessage(true, message);
}

// ЗАПРОС НАЧАЛЬНОГО СПИСКА ИЗБРАННОГО:
ApiConnector.getFavorites(response => {
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
});

// ДОБАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯ В СПИСОК ИЗБРАННЫХ:
favoritesWidget.addUserCallback = data => {
  ApiConnector.addUserToFavorites(data, response => actionsToFavorites(response, "Пользователь добавлен в избранное!"));
};

// УДАЛЕНИЕ ПОЛЬЗОВАТЕЛЯ ИЗ СПИСКА ИЗБРАННЫХ:
favoritesWidget.removeUserCallback = data => {
  ApiConnector.removeUserFromFavorites(data, response => actionsToFavorites(response, "Пользователь удалён из избранного!"));
};