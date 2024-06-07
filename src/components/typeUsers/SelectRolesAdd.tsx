import React, { useEffect, useState } from "react"
import { Box, Checkbox, MenuItem, TextField, Typography } from "@mui/material"
import { Role, RoleForm } from "../../types/server/class/Role"
import { PermissionsOption } from "../../types/PermissionsOption"
import { FormikErrors, FormikTouched } from "formik"

interface SelectRolesAddProps {
    permissions: PermissionsOption[] // Permissões selecionadas
    title: string
    edit: boolean
    view?: boolean
    formik: {
        initialValues: RoleForm
        values: Partial<Role>
        errors: FormikErrors<Partial<Role>>
        touched: FormikTouched<Partial<Role>>
        handleChange: (e: React.ChangeEvent<any>) => void
        handleBlur: {
            (e: React.FocusEvent<any, Element>): void
            <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void
        }
        setFieldValue: (
            field: string,
            value: any,
            shouldValidate?: boolean | undefined
        ) => Promise<void> | Promise<FormikErrors<Partial<Role>>>
    }
}

export const SelectRolesAdd: React.FC<SelectRolesAddProps> = ({ permissions, title, formik, view }) => {
    const [selected, setSelected] = useState<string[]>([])

    // const truePermissions = Object.entries(formik.values.permissions!)
    //     .filter(([key, value]) => value === true)
    //     .map(([key, value]) => key)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, permissionValue: string) => {
        // const selectedPermissions = edit ? truePermissions : (event.target.value as unknown as string[])
        // setSelected(selectedPermissions)

        // const new_permissions = { ...formik.values.permissions! }
        // Object.entries(formik.values.permissions!).map(([key, value]) => {
        //     if (!permissions.find((item) => item.value == key)) return

        //     // @ts-ignore
        //     new_permissions[key] = selectedPermissions.includes(key)
        // })
        // formik.setFieldValue("permissions", new_permissions)
        formik.setFieldValue(`permissions.${event.target.name}`, event.target.checked as boolean)
    }

    const selectedValues = permissions
        //@ts-ignore
        .filter((item) => formik.values.permissions && formik.values.permissions[item.value])
        .map((item) => item.value)

    return (
        <Box sx={{ flexDirection: "column", gap: "0.1vw", width: "100%" }}>
            <Typography>{title}</Typography>
            <TextField
                select
                value={selectedValues}
                onChange={view ? () => {} : (e) => handleChange(e, e.target.value)}
                InputProps={{
                    sx: { height: "2vw" }, // Define a altura do input
                }}
                SelectProps={{
                    multiple: true,
                    renderValue: (selected) =>
                        //@ts-ignore
                        selected
                            .map((item: any) => permissions.find((permission) => permission.value === item)?.label)
                            .join(", "),
                    MenuProps: {
                        MenuListProps: { sx: { width: "100%", height: "100%", bgcolor: "#E5E5E5" } },
                        sx: { maxHeight: "29vh", borderRadius: "1vw" },
                    },
                }}
            >
                {permissions.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                        <Checkbox
                            //@ts-ignore
                            checked={formik.values.permissions[item.value] ?? false}
                            onChange={view ? () => {} : (e) => handleChange(e, item.value)}
                            name={item.value}
                        />
                        {item.label}
                    </MenuItem>
                ))}
            </TextField>
        </Box>
    )
}
