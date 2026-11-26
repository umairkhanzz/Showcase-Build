import { Container } from "./container";

/** Placeholder shown for an instant while a case study or post streams in. */
export function DetailSkeleton() {
  return (
    <Container className="animate-pulse pt-28 md:pt-36" aria-hidden>
      <div className="h-6 w-40 rounded-full bg-muted" />
      <div className="mt-8 h-20 w-3/4 rounded-2xl bg-muted" />
      <div className="mt-6 h-5 w-1/2 rounded-full bg-muted" />
      <div className="mt-14 aspect-[16/9] rounded-[28px] bg-muted" />
    </Container>
  );
}
