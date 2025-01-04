import clientPromise from "@/lib/mongodb";
import {getAuth} from "@clerk/nextjs/server";
import {revalidatePath} from "next/cache";

export default async function handler(req, res) {

  const {userId} = getAuth(req);
  if(!userId){
    revalidatePath("/");
    return res.status(401).json({message: "Unauthorized", error: "User not Found"});
  }
  // connect to MOngodb
  const client = await clientPromise;
  const db = client.db("cert-manager");
  const collection = db.collection("tasks");

  const time = new Date();

  try {
    // all tasks
    switch (req.method) {
      case "GET":
        const tasks = await collection.find({userId}).toArray();
        res.status(200).json({ message: "All Tasks", data: tasks });
        break;

      case "POST":
        const newTask = {
          title: req.body.title,
          description: req.body.description,
          time: time.toLocaleString(),
          status: req.body.status,
          userId
        };
        const insertNewTask = await collection.insertOne(newTask);
        res
          .status(201)
          .json({ message: "Task created successfully" }, insertNewTask);
        break;

      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).json({ message: `Method ${req.method} not accepted` });
    }
  } catch (err) {
    throw new Error(`Failed to connect to the DB, ${err.message}`);
  }
}
