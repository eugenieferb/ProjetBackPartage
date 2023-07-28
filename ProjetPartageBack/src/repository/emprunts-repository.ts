import { ObjectId } from "mongodb";
import { Emprunts } from "../entities";
import { connection } from "./connection";

const collection = connection.db("Partage").collection<Emprunts>("emprunts");

export const empruntsRepository = {
  findAll() {
    return collection.find().toArray();
  },
  findById(_id: any) {
    return collection.findOne({ _id: new ObjectId(_id) });
  },
  async persist(emprunts: Emprunts) {
    const result = await collection.insertOne(emprunts);
    emprunts._id = result.insertedId;
    return emprunts;
  },
  remove(_id: string) {
    return collection.deleteOne({ _id: new ObjectId(_id) });
  },
  update(_id: string, emprunts: Emprunts) {
    return collection.updateOne({ _id: new ObjectId(_id) }, { $set: emprunts });
  }
};