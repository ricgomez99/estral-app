import {
  PipelineStep,
  IContext,
} from "@/types/middlewares-types/event-orchestrator-types";

export type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

export const Result = {
  ok: <T, E = Error>(value: T): Result<T, E> => ({ ok: true, value }),
  err: <T, E = Error>(error: E): Result<T, E> => ({
    ok: false,
    error,
  }),
};

function toError(error: unknown): Error {
  if (error instanceof Error) return error;

  return new Error(typeof error === "string" ? error : JSON.stringify(error));
}
export class EventsOrchestrator {
  private steps: PipelineStep[] = [];

  use(step: PipelineStep): this {
    this.steps.push(step);
    return this;
  }

  async execute(context: IContext): Promise<Result<IContext, Error>> {
    let index = -1;
    const dispatch = async (i: number): Promise<void> => {
      if (i <= index) {
        throw new Error("next() called multiple times in srchestrator steps");
      }

      index = i;
      const step = this.steps[i];

      if (!step) return;

      await step(context, async () => {
        await dispatch(i + 1);
      });
    };

    try {
      await dispatch(0);
      return Result.ok(context);
    } catch (error) {
      return Result.err(toError(error));
    }
  }
}
