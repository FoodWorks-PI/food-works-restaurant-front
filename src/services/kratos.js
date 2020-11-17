// @flow strict
import {PublicApi} from '@oryd/kratos-client';

export const kratos = new PublicApi(`${process.env.REACT_APP_FOODWORKS_BASE_URL}/.ory/kratos/public`);
