import cardConfig from './cardConfig';

class BuildCard {
  main() {
    const main = document.querySelector('.main-container');
    if (!main) return;

    main.className = 'main-container container';

    main.innerHTML = `<div class="card">
        <form class="card__info">
            <div class="card__info-item">
                <label for="" class="card__select-label">Card by</label>
                <select name="" id="" class="card__select">
                    <option value="mastercard" selected>Mastercard</option>
                    <option value="visa">Visa</option>
                    <option value="unionpay">Union Pay</option>
                </select>
            </div>
            <div class="card__info-item">
                <label for="" class="card__name-label">Your name</label>
                <input type="text" name="" id="" class="card__name" value="Name Surname">
            </div>
            <div class="card__info-item"> 
                <label for="" class="card__color-label">Background color</label>
                <input type="color" name="" id="" class="card__color">
            </div>
            <div class="card__info-item"> 
                <label for="" class="card__text-label">Text color</label>
                <input type="color" name="" id="" class="card__text" value="#ffffff">
            </div>
            <div class="card__info-item">
                <label for="" class="card__link-label">Background link</label>
                <input type="text" name="" id="" class="card__link">
            </div>
            <button class="card__button">Preview</button>
            <button class="card__create">Create!</button>
            <ol class="card__instraction">
                <li class="c__i-one">Choose card system</li>
                <li class="c__i-two">Enter your name</li>
                <li class="c__i-three">Choose background color</li>
                <li class="c__i-four">Choose text color</li>
                <li class="c__i-five">Add your own image via link (optional)</li>
                <li class="c__i-six">Press "Preview" button</li>
                <li class="c__i-seven">Did you like the card? Press "Create" and enjoy shopping!</li>
            </ol>
        </form>
        <div class="card__prev"></div>
    </div>`;
  }

  card() {
    const code = `<div class="card__code" style="position:relative;width:650px;height:400px;font-family: 'Montserrat', sans-serif;border-radius:20px;overflow:hidden;font-size:30px;color:${
      cardConfig.text
    };">
        <div style="width:100%;height:100%;${
          cardConfig.color ? `background-color:${cardConfig.color}` : ''
        };background-image:url(${cardConfig.link});background-size: cover;"></div>
        <img src="https://raw.githubusercontent.com/kkolite/online-store/develop/src/assets/png/${
          cardConfig.system
        }.png" alt="" style="width:80px;position:absolute;bottom:30px;right:30px">
        <p style="position:absolute;left:60px;bottom:80px">${cardConfig.name.toUpperCase()}</p>
        <p style="position:absolute;left:350px;bottom:130px">02/26</p>
        <p style="position:absolute;left:30px;top:30px;padding:5px;border-radius:10px;font-size:50px;color:#d8c307;background-color:white">RS Bank</p>
        <p style="position:absolute;left:60px;bottom:180px;font-size:50px">${buildCard.generateCard()}</p>
    </div>`;

    return code;
  }

  generateCard() {
    let first: string;
    switch (cardConfig.system) {
      case 'mastercard':
        first = '5247';
        break;
      case 'visa':
        first = '4255';
        break;
      case 'unionpay':
        first = '6582';
        break;
      default:
        first = '7474';
    }

    const second = `${random()}5${random()}8`;
    const third = `${random()}${random()}${random()}${random()}`;
    const fourth = `${random()}${random()}${random()}${random()}`;

    function random() {
      return Math.floor(Math.random() * 10);
    }

    return `${first}&nbsp;&nbsp;${second}&nbsp;&nbsp;${third}&nbsp;&nbsp;${fourth}`;
  }
}

export const buildCard = new BuildCard();
