// @flow strict
let _baseURL = process.env.REACT_APP_FOODWORKS_BASE_URL;
if (_baseURL === null || _baseURL === undefined || _baseURL.length === 0) {
  _baseURL = 'https://127.0.0.1:4455';
}
const BASE_URL = _baseURL;
export default BASE_URL;

