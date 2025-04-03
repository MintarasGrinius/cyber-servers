import noDataImage from "@/assets/no-data.svg";
import { Heading, Paragraph } from "@/components/ui/Typography";

const NoServersAvailable = () => (
  <div className="flex items-center justify-center flex-1">
    <div className="h-96 w-96 space-y-4 max-w-screen text-center">
      <img src={noDataImage} alt="Error" className="w-1/2 h-auto mx-auto" />
      <Heading.H1>No servers available</Heading.H1>
      <Paragraph>
        Seems like there are no servers available at the moment. Please check
        back later or contact support if you believe this is an error.
      </Paragraph>
    </div>
  </div>
);

export default NoServersAvailable;
