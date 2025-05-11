import { Agent } from './routes/ai_models';
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc"

const appRouter = createTRPCRouter({
  // ...
  AgentRouter: Agent
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);