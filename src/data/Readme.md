# Region Info

The regions can be seen at <https://fly.io/docs/reference/regions/>,
however a fun and intuitive interactive map is missing.

## Geting better data

The graphql api can be found at: <https://api.fly.io/graphql>.  
To query the api we can use the following query:

```graphql
query {
  platform {
    regions {
      code
      name
      latitude
      longitude
      gatewayAvailable
      requiresPaidPlan
      #processGroup
    }
  }
}
```

First up you might wonder why `processGroup` is commented out?  
This is (I think) because you can only query this in the context of an app.  
_But what I definitely do know is that it gives me an error when I try to query it._

Secondly, when querying the api without a token, you will notice that `latitude` and `longitude` are all `null`.  
To fix this, go into your dashboard, select Tokens _(at the bottom)_, then create a new token and paste it into the headers in the api explorer like this:

```json
{
  "Fly-GraphQL-Client": "playground",
  "Authorization": "FlyV1 <rest-of-token>"
}
```

This should then allow you to also see the `latitude` and `longitude`.
