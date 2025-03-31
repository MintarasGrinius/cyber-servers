// src/pages/ServersPage.tsx
import { Button } from "@/components/ui/button";
import { Heading, Paragraph } from "@/components/ui/Typography";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="space-y-4 text-center px-8">
        <Heading.H1>Welcome to the Dashboard</Heading.H1>
        <Paragraph size="lg">
          You can use our servers to test your applications and learn how to use
        </Paragraph>
        <Button asChild className="rounded-full" size="lg">
          <Link to="/servers">Have a look at our servers</Link>
        </Button>
      </div>
    </section>
  );
};

export default DashboardPage;
