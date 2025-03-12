import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const saveContestProblemResponse = mutation({
    args: {
        contestId: v.string(),
        problemId: v.string(),
        code: v.string(),
        token: v.array(v.string()),
        status: v.string(),
        language: v.string(),
        executionTime: v.optional(v.number()),
        memory: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const submittedAt = Date.now();

        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");
        
        const responseId = await ctx.db.insert("contestProblemResponses", {
            userId: identity.subject,
            contestId: args.contestId,
            problemId: args.problemId,
            code: args.code,
            token: args.token,
            status: args.status,
            language: args.language,
            submittedAt,
            executionTime: args.executionTime,
            memory: args.memory,
        });
        
        return responseId;
    },
});