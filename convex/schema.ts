import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    fullname: v.string(),
    pfp: v.optional(v.string()),
    username: v.string(),
    email: v.string(),
}).index("byClerkId", ["clerkId"]).index("byUsername", ["username"]).index("byEmail", ["email"]),

  songs: defineTable({
    title: v.string(),
    artist: v.string(),
    coverImg: v.optional(v.string()),
    uploadedBy: v.string(),
    createdAt: v.number(),
  }).index("byTitle", ['title']).index("byArtist", ['artist']).index("byUploadedBy",['uploadedBy']),

  room: defineTable({
    roomCode: v.number(),
    hostId: v.id('users'),
    createdAt: v.number(),
    songsQueue: v.optional(v.array(v.string())),
    currentSong: v.optional(v.string()),
    currentSongState: v.boolean(), //default set to false
    currentLoopState: v.union(v.literal('none'), v.literal('song'), v.literal('album')),//album or song or none
    currentSongProgress: v.number(),
  }).index("byRoomCode", ["roomCode"]).index("byHostId", ["hostId"]),


  roomMembers: defineTable({
    userId: v.id('users'),
    roomId: v.id('room'),
    joinedAt: v.number(),
  }).index("byUserId", ["userId"]).index("byRoomId", ["roomId"]).index("byRoomandUser", ["roomId", "userId"]),
});

