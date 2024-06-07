import { Prisma } from "@prisma/client"
import { WithoutFunctions } from "./helpers"
export type PermissionsPrisma = Prisma.PermissionsGetPayload<{}>
export type PermissionsForm = Omit<WithoutFunctions<Permissions>, "id"> & { id?: number }
export type PartialPermissions = Partial<Permissions> & {
    id: number
}
export declare class Permissions {
    id: number
    role_id: number | null
    panelTab: boolean
    creatorTab: boolean
    searchTab: boolean
    favoritesTab: boolean
    configTab: boolean
    static createDefault(): Promise<Permissions>
    constructor(data: PermissionsPrisma)
}
