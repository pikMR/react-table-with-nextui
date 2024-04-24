import React, { useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { useGlobalState } from "./../GlobalState";
import { EyeFilledIcon } from "../icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../icons/EyeSlashFilledIcon";
import { Input } from "@nextui-org/input";
import { postLogin } from "../../service";

export const ModalLogin = () => {
  const email = useRef(null);
  const password = useRef(null);
  const { login, loginUser } = useGlobalState(); // TODO isAdmin
  const [ pwVisible, setPwVisible] = useState(false);

  const toggleVisibility = () => setPwVisible(!pwVisible);
  const fetchLogin = async () => {
    const member = {
      email: email.current.value,
      password: password.current.value,
    };

    const { value, isOk } = await postLogin(member);
    if (isOk) {
      const userlogin = { admin: true, valid: isOk, token: value };
      loginUser(userlogin);
    }
  };

  return (
    <Modal
      backdrop="blur"
      isOpen={!login}
      onClose={loginUser}
      hideCloseButton={true}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Login</ModalHeader>
        <ModalBody>
          <Input
            type="email"
            label="Email"
            defaultValue=""
            className="max-w-xs"
            ref={email}
          />
          <Input
            label="Password"
            variant="bordered"
            placeholder="Enter your password"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {pwVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={pwVisible ? "text" : "password"}
            className="max-w-xs"
            ref={password}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onPress={fetchLogin}>
            Acceder
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
