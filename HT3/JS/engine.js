"use strict"

+function() {
  
  putIntoWindow('Chat', Chat);
  putIntoWindow('Message', Message);
  putIntoWindow('User', User);
  
  Chat.chats = [];
  User.users = [];
  
  function Chat(chatName) {  
    if (!arguments[0]) throw new Error ('chatName is undefined');
       
    Chat.getChats = function() {
      return Chat.chats;
    };
    Chat.showChats = function(user) {
      for (var i = 0; i < Chat.chats.length; i++) {
        var chatInfo = '';
        chatInfo += Chat.chats[i].name + ': ' + Chat.chats[i].history.length + ' messages';
        if (user) {
          chatInfo += ' (' + Chat.chats[i].countUnreaded(user) + ' unreaded)';
        }
        console.log(chatInfo);
      }
    };
    Chat.getChatByName = function(chatName) {
      for (var i = 0; i < Chat.chats.length; i++) {
        if (Chat.chats[i].name == chatName) {
          return Chat.chats[i];
        }
      }
    };
    
    chatName = chatName.toString()
    if (Chat.getChatByName(chatName)) throw new Error ('chat ' + chatName + ' already exists') 
    Chat.chats.push(this); 
    
    this.name = chatName;
    this.history = [];
    this.loggedUsers = [];
    
    this.login = function() {
      for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] instanceof User) {
          this.loggedUsers[arguments[i].id] = true;
        }
      }
    };
    this.logoff = function() {
      for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] instanceof User && this.loggedUsers[arguments[i].id]) {
          this.loggedUsers[arguments[i].id] = false;
        }
      }
    };
    this.sendMessage = function(user, messageText) {
      if (this.loggedUsers[user.id]) {
        var message = new Message(user, messageText);
        this.history.push(message); 
        return message;   
      } else {
        throw new Error(user.name + ' is not logged in ' + this.name)
      }
    };
    this.showHistory = function() {
      var startIndex, endIndex;
      if (arguments[1]) {
        startIndex = arguments[0];
        endIndex = arguments[1] + startIndex;
      } else {
        startIndex = 0;
        endIndex = arguments[0] || 10; 
      }
      endIndex = (this.history.length > endIndex) ? endIndex : this.history.length;
      for (var i = startIndex; i < endIndex; i++) {
        this.logMessage(this.history[i]);
      }
    };
    this.readMessages = function(user, numberOfMessages) {
      var readed = [];
      var numberOfMessages = (Number.isFinite(numberOfMessages)) ? numberOfMessages : Infinity;
      for (i = 0; i < this.history.length && !!numberOfMessages; i++) {
        var message = this.history[i];
        if (message.readBy[user.id]) {
          continue;
        }
        message.read(user);
        readed.push(message);
        numberOfMessages--;
      }
      return readed;
    };
    this.logMessage = function(message) {
      console.log('[' + message.user.name + ']{' + (this.loggedUsers[message.user.id] ? 'logged in' : 'logged off') + '}{' + message.getTimeToLog() + '}: ' + message.text);
    };
    this.countUnreaded = function(user) {
      var count = 0;
      for (i = 0; i < this.history.length; i++) {
        if (this.history[i].readBy[user.id]) {
          continue;
        }
        count++;
      }
      return count;
    };
  }

  function Message(user, massageText) {
    if (!user || !(user instanceof User)) throw new Error('user is undefined');
    if (!massageText) throw new Error('massageText is undefined');
    
    this.time = new Date;
    this.user = user;
    this.text = massageText;
    this.readBy = [];
    
    this.read = function(user) {
      this.readBy[user.id] = true;
    };
    this.getTimeToLog = function() {
      var time = this.time;
      var hh = time.getHours();
      var mm = time.getMinutes();
      var ss = time.getSeconds();
      var timeWithoutMS = new Date(time.getFullYear(), time.getMonth(), time.getDate(), hh, mm, ss);
      var ms = time - timeWithoutMS;
      return hh + ':' + mm + ':' + ss + '.' + ms;
    }
  }

  function User(userName) {
    if (!userName) throw new Error('userName is undefined');
    
    User.users.push(this);
    
    User.showUsers = function(userName) {
      for (var i = 0; i < User.users.length; i++) {
        if (userName && User.users[i].name != userName) continue;
        console.log('id: ' + User.users[i].id + ', name: ' + User.users[i].name);
      }
    };
    User.getUserbyId = function(id) {
      if (id <= User.users.length) {
        for (var i = 0; i < User.users.length; i++) {
          if (User.users[i].id == id) {
            return User.users[i];
          }
        }
      }
      throw new Error('User with id: ' + id + ' not exists');
    };
    
    this.id = User.users.length - 1;
    this.name = userName.toString();
    
    this.setDefaultChat = function(chat) {
      this.defaultChat = chat;
    };
    this.login = function(chat) {
      if (!chat && !this.defaultChat) throw new Error('defaultChat is not set');
      chat = chat || this.defaultChat;
      chat.login(this);
    };
    this.logoff = function(chat) {
      if (!chat && !this.defaultChat) throw new Error('defaultChat is not set');
      chat = chat || this.defaultChat;
      chat.logoff(this);
    };
    this.sendMessage = function() {
      var chat, textMessage;
      if (arguments[1]) {
        chat = arguments[0];
        textMessage = arguments[1];
      } else {
        if (!this.defaultChat) throw new Error('defaultChat is not set');
        chat = this.defaultChat;
        textMessage = arguments[0]; 
      }
      chat.sendMessage(this, textMessage);
    };
    this.readMessages = function() {
      var chat, numberOfMessages;
      if (arguments[1]) {
        chat = arguments[0];
        numberOfMessages = arguments[1];
      } else if (arguments[0] instanceof Chat) {
        chat = arguments[0]; 
        numberOfMessages = 10;
      } else if (Number.isFinite(arguments[0])) {
        if (!this.defaultChat) throw new Error('defaultChat is not set');
        chat = this.defaultChat; 
        numberOfMessages = arguments[0];
      } else {
        return;
      }
      var readed = chat.readMessages(this,numberOfMessages);
      for (var i = 0; i < readed.length; i++) {
        chat.logMessage(readed[i]);
      }
    };
  }

  
  function putIntoWindow(propertyName, variable) {
    if (window.hasOwnProperty(propertyName)) {
      throw new Error(varName + ' already exists')
    } else {
    // Вариант через value/writable. Ошибка будет генерироваться только при 'use strict' 
      //~ Object.defineProperty(window, propertyName, {
        //~ value: variable,
        //~ writable: false
      //~ });
    // Вариант через get/set. Генерируем свою ошибку      
    Object.defineProperty(window, propertyName, {
      get: function() {return variable;},
      set: function() {throw new Error(propertyName + 'already exists and read-only');}
    });
    }  
  }

}()

