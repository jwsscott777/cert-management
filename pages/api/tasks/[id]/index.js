import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import {getAuth} from "@clerk/nextjs/server";
import {revalidatePath} from "next/cache";

export const revalidate = 0;
export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader("Access-Control-Allow-Origin", "https://cert-management-ten.vercel.app"); // Replace with your frontend URL
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE, OPTIONS"); // Allowed methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allowed headers

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

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

  const { id } = req.query;
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: "Invalid ID" });
  }

  switch (req.method) {
    case 'PUT':
      try {
        const { title, description, status } = req.body;
        const updatedTime = time.toLocaleString();

        if (
          typeof title !== "string" ||
          typeof description !== "string" ||
          typeof status !== "boolean"
        ) {
          return res.status(400).json({ message: "Invalid input" });
        }

        const updateTask = await collection.updateOne(
          { _id: new ObjectId(id), userId },
          {
            $set: {
              title,
              description,
              updatedTime,
              status,
            },
          }
        );
        res
          .status(200)
          .json({ message: "Task updated successfully", data: updateTask });
      } catch (err) {
        res.status(500).json({ message: "Internal server error" });
        console.log(err);
      }
      break;
    case 'DELETE':
      try {
        const deleteTask = await collection.deleteOne(
            {_id: new ObjectId(id), userId});

        if (deleteTask.deletedCount === 0) {
          return res.status(404).json({ message: "Task not found in DB" });
        }
        res.status(200).json({ message: "Task deleted from DB" });
      } catch (err) {
        res.status(500).json({ message: "Internal server error" });
        console.log(err);
      }
      break;
    case 'GET':
      try {
        const taskItem = await collection.findOne({ _id: new ObjectId(id), userId });
        if (!taskItem) {
          return res.status(404).json({ message: "Task not found in DB" });
        }
        return res.status(200).json({ message: "Task found", data: taskItem });
      } catch (err) {
        res.status(500).json({ message: "Internal server error" });
        console.log(err);
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).json({ message: `Method ${req.method} not accepted` });
  }
}
