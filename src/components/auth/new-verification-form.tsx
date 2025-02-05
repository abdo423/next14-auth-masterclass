"use client";
import { CardWrapper } from "./card-wrapper";
import { useState, useCallback, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { newVerification } from "../../../actions/new-verification";
import FormError from "../form-error";
import FormSuccess from "../form-success";

const NewVerificationForm = () => {
  const [verify, setVerify] = useState<{ error?: string; success?: string }>(
    {}
  );
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const onSubmit = useCallback(() => {
    if (!token) {
      setVerify({ error: "Token not found", success: undefined });
      return;
    }
    newVerification(token)
      .then((data) => {
        setVerify({ error: data.error, success: data.success });
      })
      .catch((error) => {
        setVerify({ error: error.message, success: undefined });
      });
    console.log(token);
  }, [token]);
  useEffect(() => {
    onSubmit(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSubmit]);
  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center ">
        {!verify.success && !verify.error && <BeatLoader color="#1fd655" />}
        <FormSuccess message={verify.success} />
        <FormError message={verify.error} />
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
