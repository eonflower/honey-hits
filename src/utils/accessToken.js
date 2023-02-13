import { last } from 'lodash';

export const getAccessToken = () => {
    const url = window.location.href;
    const urlParts = url.split('#access_token=');

    return last(urlParts);
};

export default getAccessToken;