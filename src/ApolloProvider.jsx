import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "graphql",
  cache: new InMemoryCache(),
});

export default function AppProvider({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
