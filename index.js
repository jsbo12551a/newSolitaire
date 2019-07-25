(() => {
  let nudo = [];
  let fromElement = 0;
  //計時
  function showTime(m, s) {
    let tag = document.querySelector('#time');
    let minute = m;
    let second = s;
    let recordInterval = 0;
    let showTimeInterval = function() {
      recordInterval = setInterval(function() {
        if (second <= 60) {
          second += 1;
          if (second < 10) {
            if (minute < 10) {
              tag.innerText = `0${minute} : 0${second}`;
            } else {
              tag.innerText = `${minute} : 0${second}`;
            }
          } else {
            if (minute < 10) {
              tag.innerText = `0${minute} : ${second}`;
            } else {
              tag.innerText = `${minute} : ${second}`;
            }
          }
        } else {
          second = 0;
          minute += 1;
          if (second < 10) {
            if (minute < 10) {
              tag.innerText = `0${minute} : 0${second}`;
            } else {
              tag.innerText = `${minute} : 0${second}`;
            }
          } else {
            if (minute < 10) {
              tag.innerText = `0${minute} : ${second}`;
            } else {
              tag.innerText = `${minute} : ${second}`;
            }
          }
        }
      }, 1000);
    };
    showTimeInterval();
    let pause = document.querySelector('#pause');
    let restart = document.querySelector('#restart');
    //1=>開始 0=>暫停
    let record = 1;
    pause.addEventListener('click', function() {
      if (record === 1) {
        record = 0;
        clearInterval(recordInterval);
        pause.style.color = '#999';
      } else {
        record = 1;
        pause.style.color = '';
        showTimeInterval();
      }
    });
    restart.addEventListener('click', function() {
      clearInterval(recordInterval);
      minute = 0;
      second = 0;
      removeCode();
      showCode();
      showTimeInterval();
    });
  }

  //卡牌
  class Card {
    constructor(suit, number) {
      this.suit = suit;
      this.number = number;
    }
    //牌面
    cardNumber() {
      switch (this.number) {
        case 1:
          return 'A';
        case 11:
          return 'J';
        case 12:
          return 'Q';
        case 13:
          return 'K';
        default:
          return this.number;
      }
    }

    //點數
    cardPoint() {
      switch (this.number) {
        // case 1:
        //   return 11;
        // case 11:
        // case 12:
        // case 13:
        //   return 10;
        default:
          return this.number;
      }
    }

    //花色
    cardSuit() {
      switch (this.suit) {
        case 1:
          return '♠';
        case 2:
          return '♣';
        case 3:
          return '♥';
        case 4:
          return '♦';
      }
    }
  }
  //洗牌
  //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  function shuffle(array) {
    let deckArr = [[], [], [], [], [], [], [], []];
    let arr = [];
    let num = 52;
    let sum = 0;
    for (let i = 0; i < 8; i++) {
      let random = Math.floor(Math.random() * 13) + 1;
      arr.push(random);
    }
    while (true) {
      if (sum !== num) {
        arr = [];
        sum = 0;
        for (let i = 0; i < 8; i++) {
          let random = Math.floor(Math.random() * 8) + 5;
          arr.push(random);
        }
        arr.forEach(i => (sum += i));
      } else {
        break;
      }
    }
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    for (let i = 0; i < deckArr.length; i++) {
      // let randomNumber = Math.floor(Math.random() * 13) + 1;
      for (let j = 0; j < arr[i]; j++) {
        deckArr[i].push(array.pop());
      }
    }
    return deckArr;
  }
  //新卡牌製造
  function buildDeck() {
    let deck = [];
    //   let deck = [[],[],[],[],[],[],[],[]];
    for (let suit = 1; suit <= 4; suit++) {
      for (let number = 1; number <= 13; number++) {
        let c = new Card(suit, number);
        deck.push(c);
      }
    }
    return deck;
  }

  //顯示卡牌
  function showCode() {
    let deck = shuffle(buildDeck());
    // console.log(deck);
    for (let i = 0; i < deck.length; i++) {
      let top = 0;
      for (let j = 0; j < deck[i].length; j++) {
        let pile = document.getElementById(`pile${i}`);
        let code = document.createElement('div');
        let suitTop = document.createElement('p');
        let suitBottom = document.createElement('p');
        code.setAttribute('id', `code${i}_${deck[i][j].cardPoint()}`);
        code.setAttribute('class', 'box');
        code.setAttribute('draggable', 'true');
        code.style.position = 'absolute';
        code.style.top = `${top}px`;
        suitTop.style.position = 'absolute';
        suitTop.style.top = '5px';
        suitTop.style.left = '20px';
        suitTop.innerText =
          deck[i][j].cardNumber() + '  ' + deck[i][j].cardSuit();
        suitBottom.style.position = 'absolute';
        suitBottom.style.bottom = '5px';
        suitBottom.style.right = '20px';
        suitBottom.innerText =
          deck[i][j].cardNumber() + '  ' + deck[i][j].cardSuit();

        if (deck[i][j].suit === 3 || deck[i][j].suit === 4) {
          suitBottom.style.color = '#A617FF';
          suitTop.style.color = '#A617FF';
        } else {
          suitBottom.style.color = '#00FFCE';
          suitTop.style.color = '#00FFCE';
        }
        code.appendChild(suitTop);
        code.appendChild(suitBottom);
        pile.appendChild(code);
        top += 30;
      }
    }
  }

  //刪除卡牌
  function removeCode() {
    let deck = [];
    let solitaire = document.getElementsByClassName('solitaire');
    let box = document.getElementsByClassName('box');
    for (let i = 0; i < solitaire.length; i++) {
      if (box !== null) {
        // solitaire[i].removeChild(box);
        solitaire[i].innerHTML = '';
      }
    }

    // console.log(deck);
  }

  showCode();
  showTime(0, 0);

  //儲存動作

  // class storeAction {
  //   constructor(code, position) {
  //     this.code = code;
  //     this.position = position;
  //   }
  //   //返回上一個動作
  //   last_Action() {}
  // }

  //拖曳卡
  let box = document.querySelectorAll('.box');
  let draggedCode = 0;
  // box.addEventListener('dragstart', dragStart);
  box.forEach(function() {
    this.addEventListener('dragstart', dragStart);
  });

  var solitaire = document.querySelectorAll('.solitaire');
  solitaire.forEach(item => {
    item.addEventListener('drop', dropped);
    item.addEventListener('dragenter', cancelDefault);
    item.addEventListener('dragover', cancelDefault);
  });

  function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    // console.log(e.target.previousSibling.id)
    fromElement = e.target.previousSibling.id;
  }
  function cancelDefault(e) {
    // console.log(e.path[0].id.split("_")[1])
    // console.log(e)
    e.preventDefault();
    // e.stopPropagation();
    return false;
  }

  function dropped(e) {
    cancelDefault(e);
    // console.log(e.target);
    let id = e.dataTransfer.getData('text/plain');
    // console.log(id.split("_")[1])
    //   if (id.dataset.item === e.target.dataset.num) {

    //判斷是否有卡牌
    if (e.target.id === '') {
      let code = document.getElementById(id);
      code.style.top = 0;
      e.target.appendChild(code);
      nudo.push([fromElement, id]);
      //若有卡牌作比較
    } else if ((e.target.id.split('_')[1] - 1) * 1 === id.split('_')[1] * 1) {
      // console.log(e.target.id.split('_')[1]-1)
      // console.log(id.split('_')[1])
      let code = document.getElementById(id);
      code.style.top = '30px';
      e.target.appendChild(code);
      nudo.push([fromElement, id]);
    }
  }
  //回上一個動作
  let onnudo = document.querySelector('#undo');
  onnudo.addEventListener('click', function() {
    let a = nudo.pop();
    let onCode = document.getElementById(a[0]);
    // console.log(onCode.offsetTop)
    let code = document.getElementById(a[1]);
    code.style.top = '30px'
    onCode.appendChild(code);
  });
})();
