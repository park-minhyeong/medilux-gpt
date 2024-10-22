export interface CreateChat {
  message: string;
  prompt?: string;
}

export function isCreateChat(obj: any): obj is CreateChat {
  return (
    typeof obj === "object" &&
    typeof obj.message === "string" &&
    (typeof obj.prompt === "string" || typeof obj.prompt === "undefined")
  );
}
