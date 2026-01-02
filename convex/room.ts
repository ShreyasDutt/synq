import { v } from "convex/values";
import { mutation, query, MutationCtx } from "./_generated/server";

const generateRandomRoomCode = async (ctx: MutationCtx) => {
  for (let i = 0; i < 10; i++) { // try 10
    const randomRoomCode = Math.floor(100000 + Math.random() * 900000);
    const existingRoom = await ctx.db
      .query("room")
      .withIndex("byRoomCode", (q) => q.eq("roomCode", randomRoomCode))
      .unique();
    if (!existingRoom) return randomRoomCode;
  }
  throw new Error("Could not generate unique 6-digit room code after 10 tries");
};


export const getRooms = query({
  args: {},
  handler: async (ctx) => {
    const rooms = await ctx.db.query("room").collect();
    if (!rooms.length) return [];

    const memberships = await ctx.db.query("roomMembers").collect();

    const userIds = Array.from(new Set(memberships.map(m => m.userId)));

    const usersArray = await Promise.all(userIds.map(id => ctx.db.get("users", id)));

    const userMap: Record<string, typeof usersArray[number]> = {};
    usersArray.forEach(u => {
      if (u) userMap[u._id] = u;
    });

    const roomsWithMembers = rooms.map(room => {
      const members = memberships
        .filter(m => m.roomId === room._id)
        .map(m => userMap[m.userId])
        .filter(Boolean); // remove missing users

      return {
        ...room,
        members,
      };
    });
    return roomsWithMembers;
  },
});


export const createRoom = mutation({
  args: {
    clerkId: v.string(),
  },
    handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("byClerkId", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (!user) {
      console.log("User not found for creating room with clerkId: " + args.clerkId);
      return;
    }

    const roomcode = await generateRandomRoomCode(ctx);
    
     const createdRoomId = await ctx.db.insert("room", {
      roomCode: roomcode,
      hostId: user._id,
      createdAt: Date.now(),
      currentSongState: false,
      currentLoopState: "none",
      currentSongProgress: 0.0,
      playbackPermissions:'admins'
    });

    await ctx.db.insert('roomMembers',{
      userId: user._id,
      isAdmin: true,
      roomId: createdRoomId,
      joinedAt: Date.now(),
      
    })

    return roomcode;
  },
});

export const joinRoom = mutation({
  args: {
    roomCode: v.number(),
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("byClerkId", (q) => q.eq("clerkId", args.clerkId))
      .unique();
    if (!user) {
      console.log("User not found joining room with clerkId: " + args.clerkId);
      return;
    }

    const room = await ctx.db
      .query("room")
      .withIndex("byRoomCode", (q) => q.eq("roomCode", args.roomCode))
      .unique();

      
      //Create room if doesn't exist
      if (!room){
           const createdRoomId = await ctx.db.insert("room", {
            roomCode:args.roomCode,
            hostId: user._id,
            createdAt: Date.now(),
            currentSongState: false,
            currentLoopState: "none",
            currentSongProgress: 0.0,
            playbackPermissions:'admins'
          });

        await ctx.db.insert('roomMembers',{
          userId: user._id,
          isAdmin: true,
          roomId: createdRoomId,
          joinedAt: Date.now(),
          
        })
        return args.roomCode;
      }

      const existingMember = await ctx.db.query('roomMembers').withIndex('byRoomandUser', q => q.eq('roomId',room._id).eq('userId',user._id)).unique();
      if(existingMember){
        console.log('User already joined room with room code: ' + args.roomCode);
        return;
      }
    await ctx.db.insert('roomMembers',{
      userId: user._id,
      roomId: room._id,
      isAdmin: false,
      joinedAt: Date.now(),
      
    })
    return room;
  },
});

export const leaveAllRooms = mutation({
  args:{
    clerkId: v.string(),
  },
  handler: async (ctx,args) => {
    const user = await ctx.db.query('users').withIndex('byClerkId', q => q.eq('clerkId',args.clerkId)).unique();
    if(!user){
      console.log('User not found while leaving all rooms with clerkId: ' + args.clerkId);
      return;
    }
    const memberships = await ctx.db
      .query("roomMembers")
      .withIndex("byUserId", q => q.eq('userId',user._id))
      .collect();

    if (!memberships.length) return;

    for (const membership of memberships) {
      await ctx.db.delete(membership._id);
    }
     
  }
})

export const leaveRoom = mutation({
  args: {
    roomCode: v.number(),
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("byClerkId", (q) => q.eq("clerkId", args.clerkId))
      .unique();
    if (!user) {
      console.log("User not found while leaving room with clerkId: " + args.clerkId);
      return;
    }
    const room = await ctx.db
      .query("room")
      .withIndex("byRoomCode", (q) => q.eq("roomCode", args.roomCode))
      .unique();
    if (!room)
      return console.log(`room not found with room code: ${args.roomCode}`);

    const membership = await ctx.db.query('roomMembers').withIndex('byRoomandUser', q => q.eq('roomId',room._id).eq('userId',user._id)).unique();

    if(!membership){
      console.log('User not found while leaving room with clerkId: ' + args.clerkId);
      return;
    }
    await ctx.db.delete(membership._id);
  },
});
