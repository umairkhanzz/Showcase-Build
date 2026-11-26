import { Container } from "@/components/ui/container";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Marker } from "@/components/ui/marker";

export default function NotFound() {
  return (
    <Container as="section" className="flex min-h-[70vh] flex-col items-start justify-center pt-32">
      <p className="font-mono text-sm text-muted-foreground">404</p>
      <h1 className="mt-4 font-display text-6xl font-semibold tracking-[-0.045em] md:text-8xl">
        Page <Marker>not found</Marker>.
      </h1>
      <p className="mt-6 text-lg text-muted-foreground">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <div className="mt-10">
        <MagneticButton href="/">Back home</MagneticButton>
      </div>
    </Container>
  );
}
