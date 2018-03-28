import { observable, action } from "mobx";
import { create, persist } from 'mobx-persist'
import axios from "axios";

const hydrate = create({})

export default class AppState {
  @persist('list') @observable items = [];
  @persist @observable maxItem = 0;

  @observable testval;

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
    let { data } = await axios.get(
      `${this.baseURL}/newstories.json`
    );

    data.map((postId, index) => {
      if(index < 100) {
        this.fetchItem(postId);
      }
    });
  }

  async fetchItem(key) {
    let { data } = await axios.get(
      `${this.baseURL}/item/${key}.json`
    );
    this.setSingle(data);
  }

  @action setMaxItem(data) {
    this.maxItem = data;
  }

  @action setSingle(item) {
    this.items.push(item);
  }

  @action clearItems() {
    this.items = [];
  }
}
