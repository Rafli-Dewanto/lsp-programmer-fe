import React from "react";

const useDisclosure = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return { isOpen, open, close };
};

export default useDisclosure;
