class BuildMain {
  about() {
    const main = document.querySelector('.main-container');
    const about = document.querySelector('.header__nav-about');
    if (!main || !about) return;

    about.classList.add('header__nav_active');
    main.innerHTML = `<p>Some text</p>`;
  }
}

export const buildMain = new BuildMain();
