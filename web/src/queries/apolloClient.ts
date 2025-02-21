'use client';

import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  split,
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { CachePersistor, LocalStorageWrapper } from 'apollo3-cache-persist';
import { Kind, OperationTypeNode } from 'graphql';
import { createClient } from 'graphql-ws';

// TODO: Change to env variables
const httpUrl: string = 'http://localhost:5000/graphql';
const wsUrl: string = 'ws://localhost:5000/graphql';

const httpLink: ApolloLink = createHttpLink({
  uri: httpUrl,
  credentials: 'include',
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: wsUrl,
    retryAttempts: 20,
    shouldRetry: () => true,
    on: {
      closed: () => {
        console.log('Client closed.');
      },
      connected: () => {
        console.log('Client connected.');
      },
    },
  })
);

const cache: InMemoryCache = new InMemoryCache();
let apolloPersistor: CachePersistor<NormalizedCacheObject> | null = null;

const initPersistorCache = async (): Promise<void> => {
  apolloPersistor = new CachePersistor({
    cache,
    storage: new LocalStorageWrapper(window.localStorage),
    debug: false,
    trigger: 'write',
  });
  await apolloPersistor.restore();
};

initPersistorCache();

const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: split(isSubscription, wsLink, httpLink),
  cache,
  connectToDevTools: true, // TODO: Set to false for production
});

function isSubscription({ query }: { query: any }): boolean {
  const definition = getMainDefinition(query);
  return (
    definition.kind === Kind.OPERATION_DEFINITION &&
    definition.operation === OperationTypeNode.SUBSCRIPTION
  );
}

export { apolloClient, apolloPersistor };
