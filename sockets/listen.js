var Storage = require('../storage/storage');

var listen = {
  'message':function(socket){
    // console.log('服务端收到 : ', data);
    socket.on('message', (data)=>{
      console.log('message : ', data);
    })
  },
  'playerInfo':function(socket){
    socket.on('playerInfo', (data)=>{
      console.log('playerInfo : ', data, Storage["players"]);
      let _playerInfo = {};
      let _uuid = data["uuid"];
      for(let i of Storage["players"]){
        console.log(i);
        if(i["uuid"] == _uuid){
          _playerInfo = i;
          socket.emit('getPlayerInfo', _playerInfo);
          return;
        }
      }
      socket.emit('getPlayerInfo', {"msg":"无用户数据"});
    })
  },
  'createRole':function(socket){
    socket.on('createRole', (data)=>{
      console.log('createRole : ', data);
      let _newRole = data.data;
      _newRole["uuid"] = Storage["maxUuid"]+1;
      Storage["maxUuid"] += 1;
      Storage["players"].push(_newRole);

      console.log('createRole : ', Storage["players"]);
    })
  }
}

module.exports = listen;
