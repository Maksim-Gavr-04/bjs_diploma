"use strict"

const userForm = new UserForm();

// ---------- ВХОД ---------- \\
userForm.loginFormCallback = data => {
  const responseToLogin = response => {
    if (response.success !== true) {
      userForm.setLoginErrorMessage(response.error);
      return;
    }

    location.reload();
  };
  
  ApiConnector.login(data, responseToLogin);
};

// ---------- РЕГИСТРАЦИЯ ---------- \\
userForm.registerFormCallback = data => {
  const responseToRegister = response => {
    if (response.success !== true) {
      userForm.setRegisterErrorMessage(response.error);
      return;
    }

    location.reload();
  };
  
  ApiConnector.register(data, responseToRegister);
};