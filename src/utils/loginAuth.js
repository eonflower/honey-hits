import axios from "axios";
import history from "./history";

const SET_USER_LOGGED_IN = 'auth/SET_USER_LOGGED_IN';

export const authorizeUser = () => dispatch => {
    const loginOpts = {
      client_id: config.CLIENT_ID,
      redirect_uri: config.CALLBACK_URL,
      scope: config.AUTH_SCOPES,
      response_type: 'token',
    };
    const loginUrl =