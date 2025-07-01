/*when the user logs in, we want to store its data in the db*/

import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  const user = await currentUser();

  if (!user) {  //if user not exists
    return null;
  }

  try {
    const loggedInUser = await db.user.findUnique({  //if user exists in db, find unique user using their clerk id
      where: {
        clerkUserId: user.id,
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    const name = `${user.firstName} ${user.lastName}`;  

    const newUser = await db.user.create({  //if we dont have user, then create new user
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress, //comees from clerk
      },
    });

    return newUser;
  } catch (error) {
    console.log(error.message);
  }
};