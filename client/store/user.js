import axios from 'axios';

const initialState = {
  username: 'logged out',
  imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/512qpv%2B1gsL._AC_SL1000_.jpg'
};

const GOT_USER = 'GOT_USER';

const gotUser = (user) => ({ type: GOT_USER, user });

export const login = (body) => async (dispatch) => {
  try {
    const { data } = await axios.post('/auth/login', body);
    dispatch(gotUser(data));
  } catch (err) {
    console.error(err);
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.delete('/auth/logout');
    dispatch(gotUser(initialState));
  } catch (err) {
    console.error(err);
  }
};

export const me = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/auth/me');
    dispatch(gotUser(data || initialState));
  } catch (err) {
    console.error(err);
  }
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USER:
      return action.user;
    default:
      return state;
  }
};

export default userReducer;
