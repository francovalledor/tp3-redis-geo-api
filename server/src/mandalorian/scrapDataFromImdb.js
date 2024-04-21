/*
    HOW TO
    - Go to the episode you want to scrap
    - Open the console
    - Paste the following code

    first episode: https://www.imdb.com/title/tt9095424/?ref_=ttep_ep1
*/

const withAttr = (name, value) => `[${name}="${value}"]`;

const getActor = (el) =>
  el.querySelector(withAttr("data-testid", "title-cast-item__actor")).innerText;

const getAllItems = () =>
  document
    .querySelector(withAttr("data-testid", "title-cast"))
    ?.querySelectorAll(withAttr("data-testid", "title-cast-item"));

const getCharacters = (el) =>
  Array.from(
    el.querySelectorAll(withAttr("data-testid", "cast-item-characters-link"))
  )
    .map((i) => i.innerText)
    .flat();

const getInfo = (el) => ({
  actor: getActor(el),
  characters: getCharacters(el),
});

const getEpisodeNumber = () =>
  document.querySelector(
    withAttr("data-testid", "hero-subnav-bar-season-episode-numbers-section")
  ).innerText;
const getEpisodeName = () =>
  document.querySelector(withAttr("data-testid", "hero__primary-text"))
    .innerText;

const getEpisodeData = () => {
  const items = getAllItems();

  const number = getEpisodeNumber();
  const name = getEpisodeName();
  const cast = Array.from(items).map(getInfo);

  return { number, cast, name };
};

getEpisodeData();
