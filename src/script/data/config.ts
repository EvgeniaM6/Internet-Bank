export default {
  server: 'http://127.0.0.1:3000',
  currentUser: '',
  regex: {
    username: '^[a-zA-Z0-9]+$',
    password: '^[a-zA-Z0-9]{8,20}$',
    email: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
  },
};
