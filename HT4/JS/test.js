// Генератор чатов, пользователей и сообщений для тестирования

'use strict'

console.log('Генератор чатов, пользователей и сообщений для тестирования: \nstartTest(chats, users, massagesPerUserInChat)')

function startTest(chats, users, massagesPerUserInChat) {
  for (var i = 0; i < chats; i++) {
    var chatVar = 'chat' + i;
    var massageIndex = '0';
    window[chatVar] = new Chat(chatVar);
    for (var j = 0; j < users; j++) {
      var userVar = 'user' + j; 
      if (!window[userVar]) {
        window[userVar] = new User(userVar);
      }
      window[chatVar].login(window[userVar]);
      for (var y = 0; y < massagesPerUserInChat; y++) {
        var massageText = 'massage' + massageIndex++;
        window[chatVar].sendMessage(window[userVar], massageText);
      }
    }
  }
}
