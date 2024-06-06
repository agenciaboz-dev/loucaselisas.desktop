import { Prisma } from "@prisma/client"

export type PermissionsPrimsa = Prisma.PermissionsGetPayload<{}>
export type PermissionsPrisma = Prisma.PermissionsGetPayload<{}>
export type PermissionsForm = Omit<WithoutFunctions<Permissions>, "id", "panelTab">
export type PartialPermissions = Partial<Permissions> & { id: string }

export declare class Permissions {
    id: number
    role_id: number | null
    panelTab: boolean
    creatorTab: boolean
    searchTab: boolean
    favoritesTab: boolean
    configTab: boolean
    static createDefault(): Promise<Permissions>
    constructor(data: PermissionsPrimsa)
}
