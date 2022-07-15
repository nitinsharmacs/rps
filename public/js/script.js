const fetchReq = (url, { method, headers, body = '' }, cb) => {
  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    cb({ status: xhr.status, body: xhr.response });
  };

  xhr.onerror = (err) => {
    console.log(err);
  };

  xhr.open(method, url);

  for (const header in headers) {
    xhr.setRequestHeader(header, headers[header]);
  }

  xhr.send(body);
};

const playMove = (move) => {
  fetchReq('/play-move', {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ move })
  }, (res) => {
    console.log(res);
  });
};

const refreshPage = () => {
  const waitingMsgEle = document.querySelector('.waiting-message');
  const movesEle = document.querySelector('.moves');
  const messageArea = document.querySelector('.message-area');

  setInterval(() => {
    fetchReq('/game-stats', {
      method: 'get'
    }, ({ status, body }) => {
      const { started, winner, draw } = JSON.parse(body);
      if (started) {
        waitingMsgEle.classList.add('hide');
        movesEle.classList.remove('hide');
      }

      if (winner) {
        messageArea.innerText = `${winner.name} won the game`;
      }

      if (draw) {
        messageArea.innerText = `It's draw`;
      }
    });
  }, 1000);
};

const main = () => {
  const gameArea = document.querySelector('#game-area');
  refreshPage();
};

window.onload = main;
