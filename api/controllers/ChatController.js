/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var subscribers = {};

module.exports = {

  addConv:function (req,res) {

    var data_from_client = req.params.all();

    if(req.isSocket && req.method === 'POST'){

      // This is the message from connected client
      // So add new conversation
      Chat.create(data_from_client).exec(function(error, data_from_client) {
        // Message has been created
      });
    }
    else {
      res.view();
    }
  },

  liveStream: function(req, res){

    var data_from_client = req.params.all();

    if(req.isSocket && req.method === 'POST'
        && data_from_client.unsubscribe
        && req.socket.id in subscribers) {
      console.log( 'User unsubscribed from ' + req.socket.id );

      // Stop receiving updates
      subscribers[req.socket.id].stop();

      // Remove reference
      delete subscribers[req.socket.id];
    }
    else if(req.isSocket) {
      console.log( 'User subscribed on ' + req.socket.id );

      // Start the liveFind
      subscribers[req.socket.id] = Chat.liveFind({},
        function(row, newRow, rowDeleted) {
          // Optional data invalidation callback
          // Check if data is invalidated by this row change
          console.log('Row data', row);
          return true;
        }
      ).on('update',
        function(diff, data) {
          // Results have changed, send to client
          sails.sockets.emit(req.socket.id, 'chatDiff', diff);
        }
      );
    }


  }
};

