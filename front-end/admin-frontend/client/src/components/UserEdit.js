import React from 'react'
import { Edit, PasswordInput, SimpleForm, TextInput } from 'react-admin'

const UserEdit = (props) => {
    return (
        <Edit title="Edit User" {...props}>
            <SimpleForm>
                <TextInput disabled source="id"/>
                <TextInput source="name"/>
                <TextInput source="email"/>
                <PasswordInput source="password"/>
            </SimpleForm>
        </Edit>
    )
}

export default UserEdit
