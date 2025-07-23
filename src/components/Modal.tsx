import { Dialog, DialogPanel } from "@headlessui/react";

interface Props {
  isOpen: boolean;
  close: () => void;
    children?: React.ReactNode;
}

export default function MyModal({ isOpen, close , children }: Props) {
  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
          <div className="fixed inset-0 flex items-center justify-end p-4 mr-10 mt-4">
        <DialogPanel
          className="w-[80%] h-[90vh] flex lex-col  rounded-xl bg-gray-800 shadow-xl transition-all mt-2"
        >
          {children}
        </DialogPanel>
      </div>
        </div>
      </Dialog>
    </>
  );
}
