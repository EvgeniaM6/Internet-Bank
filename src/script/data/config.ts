export default {
  server: 'http://127.0.0.1:3000',
  wss: 'ws://127.0.0.1:8000',
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
