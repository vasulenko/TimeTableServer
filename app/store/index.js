import {defaultStorage,emptyStorage} from '../store/defaultStorage';

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

  getAllRoom() {
    let res = [];
    this.storage.forEach(group => {
      console.log(group);
      group.storage.map(lesson => {
        lesson.map(day => {
          if (res.indexOf(day.top.room) === -1) {
            res.push(day.top.room);
          }
          if (res.indexOf(day.bottom.room) === -1) {
            res.push(day.bottom.room);
          }
        })
      })
    });
    console.log(res);
    return res;
  }

  getAllPeople() {
    let res = [];
    this.storage.forEach(group => {
      console.log(group);
      group.storage.map(lesson => {
        lesson.map(day => {
          if (res.indexOf(day.top.people) === -1) {
            res.push(day.top.people);
          }
          if (res.indexOf(day.bottom.people) === -1) {
            res.push(day.bottom.people);
          }
        })
      })
    });
    console.log(res);
    return res;
  }

  getStorageByPeople(name) {
    let res = [...emptyStorage];
    this.storage.forEach(group => {
      console.log(group);
      group.storage.map((lesson, i) => {
        lesson.map((day, j) => {
          console.log(res);
          console.log(res[i][j]);
          if (day.top.people === name) {
            res[i][j].top = day.top;
          } else {
            res[i][j].top = {
              'context': '',
              'room': '',
              'people': ''
            };
          }
          if (day.bottom.people === name) {
            res[i][j].bottom = day.bottom;
          } else {
            res[i][j].bottom = {
              'context': '',
              'room': '',
              'people': ''
            };
          }
        })
      })
    });
    console.log(res);
    return res;
  }

  getStorageByRoom(room) {
    let res = [...emptyStorage];
    this.storage.forEach(group => {
      console.log(group);
      group.storage.map((lesson, i) => {
        lesson.map((day, j) => {
          if (day.top.room === room) {
            res[i][j].top = day.top;
          }
          if (day.bottom.room === room) {
            res[i][j].bottom = day.bottom;
          }
        })
      })
    });
    console.log(res);
    return res;
  }
};