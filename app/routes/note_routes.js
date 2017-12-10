import Storage from '../store';
import {emptyStorage} from "../store/defaultStorage";

let storage = new Storage();
module.exports = function (app) {
  app.get('/', (req, res) => {
    res.send(JSON.stringify({
        data: storage.getStorage(),
        group: storage.getGroup()
      })
    );
  });

  app.get('/reset', (req, res) => {
    storage = new Storage();
    res.send(JSON.stringify(storage.getStorage()));
  });

  app.get('/group', (req, res) => {
    res.send(JSON.stringify(storage.getAllGroup()));
  });

  app.get('/room', (req, res) => {
    res.send(JSON.stringify(storage.getAllRoom()));
  });

  app.get('/people', (req, res) => {
    res.send(JSON.stringify(storage.getAllPeople()));
  });


  app.get('/storage', (req, res) => {
    console.log(req.query);
    res.send(JSON.stringify(storage.getStorageByGroup(req.query.group)));
  });

  app.post('/', (req, res) => {
    const data = req.body.data;
    const group = req.body.group;
    if (data === undefined) {
      res.sendStatus(400);
      return;
    }
    try {
      storage.setStorage(data);
      storage.setGroup(group);
    } catch (err) {
      res.sendStatus(400);
    }
    res.sendStatus(202);
  });

  app.post('/group', (req, res) => {
    const data = req.body.data;
    const group = req.body.group;
    try {
      if (storage.getAllGroup().indexOf(group) === -1) {
        storage.addGroup({
          data: data.length < 7 ? emptyStorage : data,
          group: group
        });
      } else {
        storage.setStorageByGroup({
          data: data,
          group: group
        })
      }
    } catch (err) {
      res.sendStatus(400);
      return;
    }
    res.sendStatus(202);
  });

  app.post('/people', (req, res) => {
    const people = req.body.people;
    res.send([{"storage": storage.getStorageByPeople(people)}]);
  });

  app.post('/room', (req, res) => {
    const room = req.body.room;
    res.send([{"storage": storage.getStorageByRoom(room)}]);
  });
};