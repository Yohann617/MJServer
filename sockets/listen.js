var Storage = require('../storage/storage');

var listen = {
  'message':function(data){
    console.log('服务端收到 : ', data);
  },
  'playerInfo':function(data){
    console.log('playerInfo : ', data, Storage["players"]);
    let _playerInfo = {};

  }
}

module.exports = listen;
