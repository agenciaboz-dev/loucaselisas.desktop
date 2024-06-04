import React, { useState } from "react"
import { Checkbox, MenuItem, TextField, Typography } from "@mui/material"
import { Role } from "../../types/server/class/Role"
import { PermissionsOption } from "../../types/PermissionsOption"
import { FormikErrors, FormikTouched } from "formik"

interface SelectRolesAddProps {
    permissions: PermissionsOption[] // Permissões selecionadas
    title: string
    formik: {
        initialValues: Partial<Role>
        values: Partial<Role>
        errors: FormikErrors<Partial<Role>>
        touched: FormikTouched<Partial<Role>>
        handleChange: (e: React.ChangeEvent<any>) => void
        handleBlur: {
            (e: React.FocusEvent<any, Element>): void
            <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void
        }
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<Partial<Role>>>
    }
}

export const SelectRolesAdd: React.FC<SelectRolesAddProps> = ({ permissions, title, formik }) => {
    const [selected, setSelected] = useState<string[]>([])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedPermissions = event.target.value as unknown as string[]
        setSelected(selectedPermissions)

        const new_permissions = { ...formik.values.permissions! }
        Object.entries(formik.values.permissions!).map(([key, value]) => {
            if (!permissions.find((item) => item.value == key)) return

            // @ts-ignore
            new_permissions[key] = selectedPermissions.includes(key)
        })
        formik.setFieldValue("permissions", new_permissions)
    }

    return (
        <>
            <Typography>{title}</Typography>
            <TextField
                select
                value={selected}
                onChange={handleChange}
                InputProps={{
                    sx: { height: "2vw" }, // Define a altura do input
                }}
                SelectProps={{
                    multiple: true,
                    renderValue: (value: string[]) =>
                        value.map((item) => permissions.find((permission) => permission.value == item)?.label).join(", "),
                    MenuProps: {
                        MenuListProps: { sx: { width: "100%", height: "100%", bgcolor: "#E5E5E5" } },
                        sx: { maxHeight: "29vh", borderRadius: "1vw" },
                    },
                }}
            >
                {permissions.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                        <Checkbox checked={selected.includes(item.value)} />
                        {item.label}
                    </MenuItem>
                ))}
            </TextField>
        </>
    )
}
