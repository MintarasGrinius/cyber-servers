import errorImage from "@/assets/error.svg";
import { Heading, Paragraph } from "@/components/ui/Typography";

const ServerError = ({ message }: { message?: string }) => (
  <div className="flex items-center justify-center flex-1">
    <div className="h-96 w-96 space-y-4 max-w-screen">
      <img src={errorImage} alt="Error" className="w-full h-auto" />
      <Heading.H1>Ay caramba!</Heading.H1>
      <Paragraph>
        {message ?? "It seems that this page is having some problems."}
      </Paragraph>
    </div>
  </div>
);

export default ServerError;
