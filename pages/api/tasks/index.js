import clientPromise from "@/lib/mongodb";
import {getAuth} from "@clerk/nextjs/server";
import {revalidatePath} from "next/cache";
export const revalidate = 0;
export default async function handler(req, res) {

try {

  const { userId, has } = getAuth(req);
  
  if(!userId){
    revalidatePath("/");
    return res.status(401).json({message: "Unauthorized", error: "User not Found"});
  }
  // connect to MOngodb
  const client = await clientPromise;
  const db = client.db("cert-manager");
  const collection = db.collection("tasks");

  const time = new Date();

  const isAdmin = has({ role: "org:admin"})
    // all tasks
    switch (req.method) {
      case "GET":
        let tasks;
        if (isAdmin) {
          tasks = await collection.find({}).toArray();
        } else {
           tasks = await collection.find({userId}).toArray();
        }
        
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
          .json({ message: "Task created successfully", data: insertNewTask });
        break;

      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).json({ message: `Method ${req.method} not accepted` });
    }
  } catch (err) {
    console.error(`Failed to connect to the DB: ${err.message}`);
  return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
}
