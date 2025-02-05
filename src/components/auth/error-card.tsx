import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { CardWrapper } from "./card-wrapper";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel={"Oops Something went wrong"}
      backButtonLabel={"Back to login"}
      backButtonHref={"/auth/login"}
    >
      <ExclamationTriangleIcon className="w-full h-10 text-red-500" />
    </CardWrapper>
  );
};
