import { prisma } from "../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../fragments";
export default {
  Query: {
    getRoom: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user: id } = request;
      try {
        const room = await prisma
          .rooms({
            where: {
              participants_some: {
                id
              }
            }
          })
          .$fragment(ROOM_FRAGMENT);

        return room;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
