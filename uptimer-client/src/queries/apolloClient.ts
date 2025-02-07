import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

const httpUrl: string = 'http://localhost:5000/graphql';

const httpLink: ApolloLink = createHttpLink({
  uri: httpUrl,
  credentials: 'include',
});

const cache: InMemoryCache = new InMemoryCache();

const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: httpLink,
  cache,
  connectToDevTools: true, // TODO: Set to false for production
});

export { apolloClient };
