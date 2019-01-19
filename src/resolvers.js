// @flow
import { ApolloError } from 'apollo-server-express';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import moment from 'moment';

import KeplerData from './KeplerData';

export const resolvers = {
  // Date: new GraphQLScalarType({
  //   name: 'Date',
  //   description: 'Date custom scalar type',
  //   parseValue(value) {
  //     return moment(value, 'DD/MM/YYYY');
  //   },
  //   serialize(value: moment) {
  //     return value.format('DD/MM/YYYY');// value sent to the client
  //   },
  //   parseLiteral(ast) {
  //     if (ast.kind === Kind.INT) {
  //       return parseInt(ast.value, 10); // ast value is always in string format
  //     }
  //     return null;
  //   }
  // }),
  Query: {
    keplerDataUrl: (_: any, {from, till} : {from: Date, till: Date}) => {
      return new KeplerData(from, till).getUrl();
    }
  }
};
