// src/pages/ServersPage.tsx
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/Typography";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="space-y-4 text-center">
        <Heading.H1 className="text-3xl md:text-5xl font-bold">
          Welcome to the Dashboard
        </Heading.H1>
        <p className="lg:w-[60%] text-xl text-muted-foreground">
          You can use our servers to test your applications and learn how to use
        </p>
        <Button asChild className="rounded-full" size="lg">
          <Link to="/servers">Have a look at our servers</Link>
        </Button>
      </div>
    </section>
  );
};

export default DashboardPage;
