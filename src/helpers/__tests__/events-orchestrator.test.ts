import { EventsOrchestrator } from "@/helpers/events-orchestrator";

describe("EventsOrchestrator", () => {
  interface TestContext {
    logs: string[];
    value?: number;
  }

  interface OrderContext {
    orderId: string;
    totalAmount: number;
    processed: boolean;
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Normal Execution Flow", () => {
    it("should execute steps in the correct order (Middleware / Onion Pattern)", async () => {
      const orchestrator = new EventsOrchestrator<TestContext>();

      orchestrator
        .use(async (ctx, next) => {
          ctx.logs.push("step1 - start");
          await next();
          ctx.logs.push("step1 - end");
        })
        .use(async (ctx, next) => {
          ctx.logs.push("step2 - start");
          await next();
          ctx.logs.push("step2 - end");
        });

      const context: TestContext = { logs: [] };
      const result = await orchestrator.execute(context);

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value.logs).toEqual([
          "step1 - start",
          "step2 - start",
          "step2 - end",
          "step1 - end",
        ]);
      }
    });

    it("should sequentially mutate the context across steps", async () => {
      const orchestrator = new EventsOrchestrator<TestContext>();

      orchestrator
        .use(async (ctx, next) => {
          ctx.value = 10;
          await next();
        })
        .use(async (ctx, next) => {
          if (ctx.value !== undefined) {
            ctx.value *= 2;
          }
          await next();
        });

      const result = await orchestrator.execute({ logs: [] });

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value.value).toBe(20);
      }
    });

    it("should support reusing the orchestrator with a completely different context type", async () => {
      const orchestrator = new EventsOrchestrator<OrderContext>();

      orchestrator.use(async (ctx, next) => {
        ctx.totalAmount += 50;
        ctx.processed = true;
        await next();
      });

      const initialContext: OrderContext = {
        orderId: "ORD-1234",
        totalAmount: 100,
        processed: false,
      };

      const result = await orchestrator.execute(initialContext);

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toEqual({
          orderId: "ORD-1234",
          totalAmount: 150,
          processed: true,
        });
      }
    });

    it("should return the unmodified context if no steps were registered", async () => {
      const orchestrator = new EventsOrchestrator<TestContext>();
      const context: TestContext = { logs: ["init"] };

      const result = await orchestrator.execute(context);

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value.logs).toEqual(["init"]);
      }
    });
  });

  describe("Error Handling and Guards", () => {
    it("should catch unhandled exceptions and return Result.err", async () => {
      const orchestrator = new EventsOrchestrator<TestContext>();

      orchestrator
        .use(async (ctx, next) => {
          ctx.logs.push("step1");
          await next();
        })
        .use(async () => {
          throw new Error("Database connection failed");
        });

      const result = await orchestrator.execute({ logs: [] });

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toBeInstanceOf(Error);
        expect(result.error.message).toBe("Database connection failed");
      }
    });

    it("should convert non-Error throws into Error instances in Result.err", async () => {
      const orchestrator = new EventsOrchestrator<TestContext>();

      orchestrator.use(async () => {
        throw "String error format";
      });

      const result = await orchestrator.execute({ logs: [] });

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toBeInstanceOf(Error);
        expect(result.error.message).toBe("String error format");
      }
    });

    it("should throw an error if next() is called multiple times within the same step", async () => {
      const orchestrator = new EventsOrchestrator<TestContext>();

      orchestrator.use(async (_, next) => {
        await next();
        await next(); // Illegal second call
      });

      const result = await orchestrator.execute({ logs: [] });

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.message).toMatch(
          /next\(\) called multiple times in orchestrator steps/,
        );
      }
    });
  });

  describe("Jest Mocking Support", () => {
    it("should invoke each registered step exactly once", async () => {
      const step1 = jest.fn(
        async (ctx: TestContext, next: () => Promise<void>) => {
          await next();
        },
      );
      const step2 = jest.fn(
        async (ctx: TestContext, next: () => Promise<void>) => {
          await next();
        },
      );

      const orchestrator = new EventsOrchestrator<TestContext>();
      orchestrator.use(step1).use(step2);

      await orchestrator.execute({ logs: [] });

      expect(step1).toHaveBeenCalledTimes(1);
      expect(step2).toHaveBeenCalledTimes(1);
    });
  });
});
