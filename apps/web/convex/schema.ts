import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    userId: v.string(), // clerkId
    email: v.string(),
    name: v.string(),
    isPro: v.boolean(),
    proSince: v.optional(v.number()),
    paymentId: v.optional(v.string()),
  }).index("by_user_id", ["userId"])
    .index("by_payment_id", ["paymentId"]),

  codeExecutions: defineTable({
    userId: v.string(),
    language: v.string(),
    code: v.string(),
    output: v.optional(v.string()),
    error: v.optional(v.string()),
  }).index("by_user_id", ["userId"]),

  snippets: defineTable({
    userId: v.string(),
    title: v.string(),
    language: v.string(),
    code: v.string(),
    userName: v.string(),
  }).index("by_user_id", ["userId"]),

  snippetComments: defineTable({
    snippetId: v.id("snippets"),
    userId: v.string(),
    userName: v.string(),
    content: v.string(),
  }).index("by_snippet_id", ["snippetId"]),

  stars: defineTable({
    userId: v.string(),
    snippetId: v.id("snippets"),
  })
    .index("by_user_id", ["userId"])
    .index("by_snippet_id", ["snippetId"])
    .index("by_user_id_and_snippet_id", ["userId", "snippetId"]),

  submissions: defineTable({
    userId: v.string(),
    snippetId: v.id("snippets"),
    token: v.string(),
    status:v.string(),
    time:v.string(),
  }).index("by_user_id",["userId"]).index("by_snippet_id", ["snippetId"]),

  payments: defineTable({
    userId: v.string(),
    orderId: v.string(),
    paymentId: v.string(),
    status: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user_id", ["userId"])
    .index("by_order_id", ["orderId"])
    .index("by_payment_id", ["paymentId"]),

    contestProblemResponses: defineTable({
      userId: v.string(),
      contestId: v.string(),
      problemId: v.string(),
      code: v.string(),
      token: v.array(v.string()),
      status: v.string(),
      language: v.string(),
      submittedAt: v.number(),
      executionTime: v.optional(v.number()),
      memory: v.optional(v.number()),
    }).index("by_user_id", ["userId"])
      .index("by_contest_id", ["contestId"])
      .index("by_problem_id", ["problemId"])
      .index("by_token", ["token"]),
});