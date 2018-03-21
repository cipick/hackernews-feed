import { observable, action } from "mobx";
import axios from "axios";

export default class AppState {
  @observable items;
  @observable item;

  @observable testval;

  constructor() {
    this.apiKey = 'cf882ff05c8e4f8aad4bce8b95e03efyours';
    this.items = [];
    this.item = {};

    this.testval = "Cipick-/ ";
  }

  async fetchData(pathname) {
    let { data } = await axios.get(pathname);
    this.setData(data);
  }

  @action setData(data) {
    this.items = data['articles'];
  }

  @action setSingle(data) {
    this.item = data;
  }

  @action clearItems() {
    this.items = [];
    this.item = {};
  }
}
