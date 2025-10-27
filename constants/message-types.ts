
export type TMessageTypes = "error" | "info" | "success" | "warning";

export type TMessage = {
    title: string;
    content: string;
    subtitle?: string;
    type: TMessageTypes;
}

