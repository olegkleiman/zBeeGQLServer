// @flow
import moment from 'moment';
import _ from 'lodash';
import fs from 'fs';
import streamToPromise from 'stream-to-promise';
import csv from 'fast-csv';
import ip from 'ip';

class KeplerData {

  from: Date
  till: Date

  constructor(from: Date, till: Date) {
    this.from = from;
    this.till = till;
  }

  // Create csv file in 'data' directory.
  // That file will be accessed by HTTP GET
  async processRawData() {

    const fileName = `/data/snaps_.csv`;

    const hostname = ip.address();
    return `http://${hostname}:4000${fileName}`;
  }

  async getUrl() {

    try {
      return ::this.processRawData();

    } catch( err ) {
      return Promise.reject(err);
    }

  }

};

export default KeplerData;
