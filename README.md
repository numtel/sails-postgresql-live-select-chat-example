# sails-postgresql-live-select-chat-example

A [Sails](http://sailsjs.org) chat room application that uses [the `sails-postgresql-live-select` NPM package wrapper](https://github.com/numtel/sails-postgresql-live-select) in order to provide live (real time) result sets for models.

This example uses [AngularJS](https://angularjs.org/) as a front-end framework. The original inspiration for this example was provided by [Maanga Labs' Sockets in Sails example application](https://github.com/maangalabs/socket-in-sails). Also, [a tutorial is available for the original Maanga Labs socket example](http://maangalabs.com/blog/2014/12/04/socket-in-sails/).

## Installation

The following instructions assume that you already have Node.js installed.

```bash
# Clone the repository
git clone git://github.com/numtel/sails-postgresql-live-select-chat-example.git
# Switch to new directory
cd sails-postgresql-live-select-chat-example
# Install dependencies
npm install
# Update PostgreSQL connection settings in editor
vim config/connections.js
# Lift Sails (or simply 'sails lift' if installed)
node app.js
```

## Explanation

1. The `sails-postgresql-live-select` adapter is configured in `config/connections.js` in addition to the `sails-postgresql` adapter. [View Source](config/connections.js)

2. Models are configured by default to use both the `pg` and `livePg` connections. [View Source](config/models.js)

3. A method called `liveStream` is added to the `ChatController` to enable subscribing and unsubscribing from the chat message stream. The `liveFind` method added to each model accepts two arguments: the find query options, and an optional [data invalidation callback](https://github.com/numtel/pg-live-select#trigger-object-definitions) as defined in pg-live-select. [View Source](api/controllers/ChatController.js)

4. The Angular controller performs a socket `GET` request on initialization to `/chat/liveStream`. On unsubscribing, a `POST` request containing a parameter `unsubscribe` set to `true` is performed to stop receiving updates. [View Source](assets/index.html)

5. Result set differences arrive on the client in the format provided by `pg-live-select` and are applied to the data cache array using the `applyDiff` function copied from the server-side code for client-side usage. [View Source](assets/js/applyDiff.js)

## License

Unlicense
