import { observable, action } from "mobx";
import { create, persist } from 'mobx-persist';
import axios from "axios";

const hydrate = create({})

class Story {
  id: number
  index: number
  title: string
  type: string
  by: string
  url: string
  descendants: number
  score: number
  time: number
}

export default class AppState {
  @persist('number')      @observable maxItem     = 0;
  @persist('array')       @observable newStories  = [];
  @persist('list', Story) @observable stories     = new Map();

  constructor() {
    this.testval = "Cipick-/ ";
    this.baseURL = 'https://hacker-news.firebaseio.com/v0';

    hydrate('App', this)
      .then(() => console.log('App hydrated'))
  }

  async fetchMaxItem() {
    let { data } = await axios.get(
      `${this.baseURL}/maxitem.json`
    );
    this.setMaxItem(data);
  }

  async fetchData() {
    this.fetchNewStories();
  }

  async fetchNewStories() {
    let { data } = await axios.get(
      `${this.baseURL}/newstories.json`
    );

    this.newStories = data;
    this.newStories.map((key, index) => {
      if(index<50) this.fetchStory(key);
    });
  }

  async fetchStory(key) {
    let { data } = await axios.get(
      `${this.baseURL}/item/${key}.json`
    );
    this.setSingle(data);
  }

  @action setSingle(item) {
    this.stories.set(item.id, item);
  }

  @action clearItems() {
    this.stories = [];
  }
}
