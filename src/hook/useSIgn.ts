import { useState } from "react";

export default function useSign() {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  return {
    username,
    setUsername,
    password,
    setPassword,
  };
}
