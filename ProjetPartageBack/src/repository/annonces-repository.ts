import { ObjectId } from "mongodb";
import { Annonces } from "../entities";
import { connection } from "./connection";

const collection = connection.db("Partage").collection<Annonces>("annonces");

export const annoncesRepository = {
  findAll() {
    return collection.find().toArray();
  },
  findById(_id: any) {
    return collection.findOne({ _id: new ObjectId(_id) });
  },
  async persist(annonces: Annonces) {
    const result = await collection.insertOne(annonces);
    annonces._id = result.insertedId;
    return annonces;
  },
  remove(_id: string) {
    return collection.deleteOne({ _id: new ObjectId(_id) });
  },
  update(_id: string, annonces: Annonces) {
    return collection.updateOne({ _id: new ObjectId(_id) }, { $set: annonces });
  },
  findByEverything(search:any){
    return collection.find({
        $or:[
            {name:{$regex:`${search}`}},
            {type:{$regex:search}},
            {owner:{
                address:{$regex:search}
            }},
        ]
    }).toArray();
},
};