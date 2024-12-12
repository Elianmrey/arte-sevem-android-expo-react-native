import {  API_TOKEN } from '../../env.local.js';

export const options = {
  method: 'GET',
  headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_TOKEN}`
  }
};

export const optionPost = {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: `Bearer ${API_TOKEN}`
  }
};
