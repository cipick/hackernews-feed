import { observable, action } from "mobx";
import axios from "axios";

export default class AppState {
  @observable items;
  @observable maxItem;

  @observable testval;

  constructor() {
    this.items = [];
    this.maxItem = 0;

    this.testval = "Cipick-/ ";
    this.baseURL = 'https://hacker-news.firebaseio.com/v0';
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
