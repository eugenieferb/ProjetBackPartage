import { connection } from "./connection";
import {Users} from '../entities';
import { ObjectId } from "mongodb";

const collection = connection.db('Partage').collection<Users>('users');

export const usersRepository = {
    findAll() {
      return collection.find().toArray();
    },
    findByName(name: string) {
      return collection.findOne({ name });
    },
    async persist(users: Users) {
      const result = await collection.insertOne(users);
      users._id = result.insertedId;
      return users;
    },
    remove(_id: string) {
      return collection.deleteOne({ _id: new ObjectId(_id) });
    },
    update(_id: string, users: Users) {
      return collection.updateOne({ _id: new ObjectId(_id) }, { $set: users });
    },
  };