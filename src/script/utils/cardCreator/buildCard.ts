import cardConfig from './cardConfig';
import config from '../../data/config';

class BuildCard {
  main() {
    const main = document.querySelector('.main-container');
    if (!main) return;

    main.className = 'main-container container';

    main.innerHTML = `<div class="card">
        <form class="card__info">
            <div class="card__info-item">
                <label for="" class="card__select-label">${config.lang === 'en' ? 'Card by' : 'Система'}</label>
                <select name="" id="" class="card__select">
                    <option value="mastercard" selected>Mastercard</option>
                    <option value="visa">Visa</option>
                    <option value="unionpay">Union Pay</option>
                </select>
            </div>
            <div class="card__info-item">
                <label for="" class="card__name-label">${config.lang === 'en' ? 'Your name' : 'Ваше имя и фамилия'}</label>
                <input type="text" name="" id="" class="card__name" value="Name Surname">
            </div>
            <div class="card__info-item"> 
                <label for="" class="card__color-label">${config.lang === 'en' ? 'Background color' : 'Цвет фона'}</label>
                <input type="color" name="" id="" class="card__color">
            </div>
            <div class="card__info-item"> 
                <label for="" class="card__text-label">${config.lang === 'en' ? 'Text color' : 'Цвет текста'}</label>
                <input type="color" name="" id="" class="card__text" value="#ffffff">
            </div>
            <div class="card__info-item">
                <label for="" class="card__link-label">${config.lang === 'en' ? 'Background link' : 'Ссылка на ваше изображение'}</label>
                <input type="text" name="" id="" class="card__link">
            </div>
            <div class="card__range-item">
                <label for="" class="card__blur-label">${config.lang === 'en' ? 'Blur' : 'Размытие'}</label>
                <input type="range" name="" id="" class="card__blur" max="8" min="0" value="0" step="0.1">
            </div>
            <div class="card__range-item">
                <label for="" class="card__brightness-label">${config.lang === 'en' ? 'Brightness' : 'Яркость'}</label>
                <input type="range" name="" id="" class="card__brightness" max="100" min="10" value="80" step="1">
            </div>
            <button class="card__button">${config.lang === 'en' ? 'Preview' : 'Превью'}</button>
            <button class="card__create">${config.lang === 'en' ? 'Create!' : 'Создать!'}</button>
            <ol class="card__instraction">
                <li class="c__i-one">${config.lang === 'en' ? 'Choose card system' : 'Выберите платежную систему'}</li>
                <li class="c__i-two">${config.lang === 'en' ? 'Enter your name' : 'Введите ваше имя и фамилию'}</li>
                <li class="c__i-three">${config.lang === 'en' ? 'Choose background color' : 'Выберите цвет фона'}</li>
                <li class="c__i-four">${config.lang === 'en' ? 'Choose text color' : 'Выберите цвет текста'}</li>
                <li class="c__i-five">${config.lang === 'en' ? 'Add your own image via link (optional)' : 'Добавьте свое собственное изображение (ссылка, опционально)'}</li>
                <li class="c__i-six">${config.lang === 'en' ? 'Press "Preview" button' : 'Нажмите "Превью"'}</li>
                <li class="c__i-seven">${config.lang === 'en' ? 'Did you like the card? Press "Create" and enjoy shopping!' : 'Вам понравилась картчока? Нажмите "Создать" и наслаждайтесь шопингом!'}</li>
            </ol>
        </form>
        <div class="card__prev"></div>
    </div>`;

    const blur = document.querySelector('.card__blur');
    const brightness = document.querySelector('.card__brightness');

    if (!blur || !brightness) return;

    if (config.theme === 'dark') {
      blur.classList.add('page-dark');
      brightness.classList.add('page-dark');
    } else {
      blur.classList.remove('page-dark');
      brightness.classList.remove('page-dark');
    }
  }

  card() {
    const code = `<div class="card__code" style="position:relative;width:650px;height:400px;font-family: 'Montserrat', sans-serif;border-radius:20px;overflow:hidden;font-size:30px;color:${
      cardConfig.text
    };">
        <div style="width:100%;height:100%;${
          cardConfig.color ? `background-color:${cardConfig.color}` : ''
        };background-image:url(${cardConfig.link});background-size: cover;filter: blur(${
      cardConfig.blur
    }px) brightness(${cardConfig.brightness}%);"></div>
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
