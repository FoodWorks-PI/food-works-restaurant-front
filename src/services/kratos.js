// @flow strict
import {PublicApi} from '@oryd/kratos-client';
import BASE_URL from '../services/config';

export const kratos = new PublicApi(`${BASE_URL}/.ory/kratos/public`);
