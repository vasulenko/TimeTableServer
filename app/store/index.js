import {defaultStorage} from '../store/defaultStorage';

export default class Storage {
  constructor(data = false, group = 'TI-51') {
    this.storage = [{
      storage: data || defaultStorage,
      group: group || 'TI-' + this.generateInt()
    }];
  }

  getStorage() {
    return this.storage;
  }

  setStorage(newStorage) {
    this.storage = newStorage;
  }

  getStorageByGroup(group) {
    return this.storage.filter(el => {
      return el.group === group
    })
  }

  setStorageByGroup(storage) {
    console.log(storage);
    this.storage.forEach(el => {
      if (el.group === storage.group) {
        el.storage = storage.data;
      }
    })
  }

  addGroup(storage) {
    this.storage.push({
      storage: storage.data || defaultStorage,
      group: storage.group || 'TI-' + this.generateInt()
    })
  }

  static generateInt() {
    return parseInt(Math.random() * 100)
  }

  getAllGroup() {
    let res = [];
    this.storage.forEach(el => {
      res.push(el.group);
    });
    return res;
  }
};