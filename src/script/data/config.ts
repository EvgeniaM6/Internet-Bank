export default {
  server: 'http://127.0.0.1:3000',
  wss: 'wss://127.0.0.1:3000/count',
  currentUser: '',
  currentEmail: '',
  userMoney: 0,
  password: '',
  lang: 'en',
  page: '',
  regex: {
    username: '^[a-zA-Z0-9]+$',
    password: '^[a-zA-Z0-9]{8,20}$',
    email: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
  },
};
