export const BaseUrl = 'http://localhost:8080/';

export const ApiPaths = {
  AUTH : {
    LOGIN : 'api/auth/login',
    REGISTER : 'api/auth/register',
    GET_USER_INFO : 'api/auth/user-info'
  },
  DASHBOARD : {
    GET_DASHBOARD_DATA : 'api/dashboard'
  },
  INCOME :{
    ADD_INCOME : 'api/income/add-income',
    GET_INCOME : 'api/income/get-incomes',
    DELETE_INCOME : (id) => `api/income/delete-income/${id}`,	
    UPDATE_INCOME : (id) => `api/income/update-income/${id}`,
    SEARCH_INCOME : 'api/income/search-income',
    DOWNLOAD_INCOME_EXCEL : 'api/income/download-income-excel'
  },
  EXPENSE : {
    ADD_EXPENSE : 'api/expense/add-expense',
    GET_EXPENSE : 'api/expense/get-expenses',
    DELETE_EXPENSE : (id) => `api/expense/delete-expense/${id}`,
    UPDATE_EXPENSE : (id) => `api/expense/update-expense/${id}`,	
    SEARCH_EXPENSE : 'api/expense/search-expense',
    DOWNLOAD_EXPENSE_EXCEL : 'api/expense/download-expense-excel'
  },
  PROFILE : {
    UPLOAD_PROFILE_PIC : 'api/auth/upload-image'
  }
}