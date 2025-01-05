import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import {getAuth} from "@clerk/nextjs/server";
import {revalidatePath} from "next/cache";

export const revalidate = 0;
// export default async function handler(req, res) {
//   try {

//   const { userId, has } = getAuth(req);
//   if(!userId){
//     revalidatePath("/");
//     return res.status(401).json({message: "Unauthorized", error: "User not Found"});
//   }

//   const isAdmin = has({ role: "org:admin" });
//   // connect to MOngodb
//   const client = await clientPromise;
//   const db = client.db("cert-manager");
//   const collection = db.collection("tasks");

//   const time = new Date();

//   const { id } = req.query;
//   if (!id || typeof id !== 'string') {
//     return res.status(400).json({ message: "Invalid ID" });
//   }

//   switch (req.method) {
//     case 'PUT':
//       try {
//         const { title, description, status } = req.body;
//         const updatedTime = time.toLocaleString();

//         if (
//           typeof title !== "string" ||
//           typeof description !== "string" ||
//           typeof status !== "boolean"
//         ) {
//           return res.status(400).json({ message: "Invalid input" });
//         }

//         const updateTask = await collection.updateOne(
//           { _id: new ObjectId(id), userId },
//           {
//             $set: {
//               title,
//               description,
//               updatedTime,
//               status,
//             },
//           }
//         );
//         res
//           .status(200)
//           .json({ message: "Task updated successfully", data: updateTask });
//       } catch (err) {
//         res.status(500).json({ message: "Internal server error" });
//         console.log(err);
//       }
//       break;
//     case 'DELETE':
//       try {
//         const deleteTask = await collection.deleteOne(
//             {_id: new ObjectId(id), userId});

//         if (deleteTask.deletedCount === 0) {
//           return res.status(404).json({ message: "Task not found in DB" });
//         }
//         res.status(200).json({ message: "Task deleted from DB" });
//       } catch (err) {
//         res.status(500).json({ message: "Internal server error" });
//         console.log(err);
//       }
//       break;
//     case 'GET':
//       try {
//         const taskItem = await collection.findOne({ _id: new ObjectId(id), userId });
//         if (!taskItem) {
//           return res.status(404).json({ message: "Task not found in DB" });
//         }
//         return res.status(200).json({ message: "Task found", data: taskItem });
//       } catch (err) {
//         res.status(500).json({ message: "Internal server error" });
//         console.log(err);
//       }
//       break;
//     default:
//       res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
//       res.status(405).json({ message: `Method ${req.method} not accepted` });
//   }
// }

export default async function handler(req, res) {
  try {
    // Authenticate user
    const { userId, has } = getAuth(req);
    if (!userId) {
      revalidatePath("/");
      return res.status(401).json({ message: "Unauthorized", error: "User not Found" });
    }

    // Check for admin role
    const isAdmin = has({ role: "org:admin" });

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("cert-manager");
    const collection = db.collection("tasks");

    const { id } = req.query;
    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const time = new Date();

    switch (req.method) {
      case "PUT":
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

          const updateFilter = isAdmin
            ? { _id: new ObjectId(id) } // Admin: Update any task
            : { _id: new ObjectId(id), userId }; // Regular user: Update their own task

          const updateTask = await collection.updateOne(updateFilter, {
            $set: {
              title,
              description,
              updatedTime,
              status,
            },
          });

          if (updateTask.matchedCount === 0) {
            return res.status(404).json({ message: "Task not found in DB" });
          }

          res.status(200).json({ message: "Task updated successfully", data: updateTask });
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: "Internal server error" });
        }
        break;

      case "DELETE":
        try {
          const deleteFilter = isAdmin
            ? { _id: new ObjectId(id) } // Admin: Delete any task
            : { _id: new ObjectId(id), userId }; // Regular user: Delete their own task

          const deleteTask = await collection.deleteOne(deleteFilter);

          if (deleteTask.deletedCount === 0) {
            return res.status(404).json({ message: "Task not found in DB" });
          }

          res.status(200).json({ message: "Task deleted from DB" });
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: "Internal server error" });
        }
        break;

      default:
        res.setHeader("Allow", ["PUT", "DELETE"]);
        res.status(405).json({ message: `Method ${req.method} not accepted` });
        break;
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
}