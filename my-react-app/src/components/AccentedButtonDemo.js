import React from "react";
import { Button } from "@salt-ds/core";

export const AccentedButtonDemo = ({ label, appearance, ...rest }) => {
  return (
    <Button sentiment="accented" appearance="solid">
      Solid
    </Button>

    
  );
};