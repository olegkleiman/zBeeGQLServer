// @flow
import { ApolloError } from 'apollo-server-express';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import moment from 'moment';

import KeplerData from './KeplerData';

export const resolvers = {

  Query: {
    keplerDataUrl: (_: any, {from, till} : {from: Date, till: Date}) => {
      return new KeplerData(from, till).getUrl();
    }
  }
  
};
