import { createClient } from "@sanity/client";

export const client = createClient({
    projectId: "qxrqpcwq",
    dataset: "billettlyst",
    apiVersion: "v2025-05-15",
    useCdn: true,
});