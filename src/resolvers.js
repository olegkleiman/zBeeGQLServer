// @flow
import { ApolloError } from 'apollo-server-express';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import casual from 'casual';
import moment from 'moment';

import KeplerData from './KeplerData';
import originsData from '../data/origins.json';
import Origin from './Origin';

export const resolvers = {

  Query: {
    keplerDataUrl: (_: any, {from, till} : {from: Date, till: Date}) => {
      return new KeplerData(from, till).getUrl();
    },
    origins() {
      return originsData.origins.map( item => {
        return {
                  id:casual.uuid,
                  ...item
               }
        });
    }
  }

};
