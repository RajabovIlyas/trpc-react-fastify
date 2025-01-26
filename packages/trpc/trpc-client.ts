import {createTRPCReact} from "@trpc/react-query";
import type {AppRouter} from "api/src/server/router"
import type {CreateTRPCReact} from "@trpc/react-query";


export const trpcClient: CreateTRPCReact<AppRouter, unknown> = createTRPCReact<AppRouter>()
