import ResponsiveDailog from "@/components/responsive-dailog";
import { Button } from "@/components/ui/button";
import React, { JSX, useState } from "react";

export const useConfirm = (
  title: string,
  description: string
): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () => {
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  };

  const handleClose = () => {
    setPromise(null);
  };
  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const ConfirmationDailog = () => {
    return (
      <ResponsiveDailog
        title={title}
        discription={description}
        open={promise !== null}
        onOpenChange={handleClose}
      >
        <div className=" flex flex-col-reverse pt-4 lg:flex-row gap-y-2 gap-x-2 items-center justify-end w-full">
          <Button
            className="w-full lg:w-auto"
            onClick={handleCancel}
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            className="w-full lg:w-auto"
            onClick={handleConfirm}
            
          >
            Confirm
          </Button>
        </div>
      </ResponsiveDailog>
    );
  };
  return [ConfirmationDailog, confirm];
};
