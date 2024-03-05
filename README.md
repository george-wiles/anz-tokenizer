# ANZ Interview Task
## General Approach

As part of an initial technical interview task for ANZ I have been asked to complete a tokenization service in NodeJS.

The basic requirements for the solution are:

- Write a simple tokenization service in NodeJs.
- The purpose of tokenization is to swap out sensitive data, typically payment card or bank account numbers, with a randomized string with no intrinsic value of its own.
- The service should provide two HTTP endpoints, which will tokenize a collection of account numbers and another one to swap back the tokens for the original account numbers.

## Scope

This exam/exercise is not meant to be a productionized service, but more a starting point for a 1.5 hours technical assessment of my capabilities.

The scope must provide unit tests and a working and runnable API to swap account numbers for tokens and the inverse.  It is to be backed by an in-memory database to ensure roundtrip tokenization behaviour.

# Solution

## Test driven development

My approach to test driven development in the context of this assessment was to provide discrete testable layers encapsulating:

- Persistence, a database service to use LokiJS to hit the brief for a no-sql database that encapsulates the store and token collection (uuid, account-number).
```
-- src 
    |- database.service.js
-- test 
    |- database.service.test.js
```

- Service, a tokenize responsibility to leverage the db service to associate a uuid (token) with an account number, and a detokenize to lookup an account by uuid.
```
-- src 
    |- token.service.js
-- test 
    |- token.service.test.js
    |- token.service.integration.test.js
```

- Controller, a controller to manage the two endpoints for tokenization and detokenization.
```
-- src 
    |- token.controller.js
-- test 
    |- token.controller.test.js
```

- App, an app to rule them all, encapsulated in a server.js that defines the fastify routes and swagger integration for API first dev principals... though timeboxed as the static swagger docs not 100% realised in the timeframe.

```
-- server.js
```

# Github

Repo: https://github.com/george-wiles/anz-tokenizer

Visibility: public
Default branch: main

# Pre-requisites

node v18.13.0


# Usage
- clone repo or dowload from github as zip and unarchive, and install
```
git clone git@github.com:george-wiles/anz-tokenizer.git
cd anz-tokenizer
npm install
```

- To run the jest tests
```
npm run test

> tokenizer-challenge@1.0.0 test
> jest

 PASS  test/unit/database.service.test.js
 PASS  test/token-service.integration.test.js
 PASS  test/unit/token.controller.test.js
 PASS  test/unit/token.service.test.js

Test Suites: 4 passed, 4 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        0.419 s
Ran all test suites.
```

- To startup application

```
node server.js
Server listening on 3000
```

- round trip some data
```
curl -X POST \
  -H "Content-Type: application/json" \
  -d '[
      "1111-1111-1111-1111",
      "2222-2222-2222-2222",
      "3333-3333-3333-3333"
    ]' \
  http://localhost:3000/tokenize

```

Then pipe the response tokens into the detokenize request. 

```
curl -X POST \
  -H "Content-Type: application/json" \
  -d '[
      "2e37d5c2-b591-4594-85d2-75924d41cc2d",
      "33a5e3f4-e879-41df-872b-782bd313b710",
      "ba87c532-47a7-42fa-a915-373a1821485a"
    ]' \
  http://localhost:3000/detokenize

```

Note: if there is no account number for token in collection store, will return "null", but validation and error handling is outside of scope for this 2 hour exercise.

