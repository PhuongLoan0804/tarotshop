import React from 'react'
import { Create, SimpleForm, TextInput} from 'react-admin'

const CategoryEdit = (props) => {
    return (
        <Create title="Edit a Category" {...props}>
            <SimpleForm>
                <TextInput disabled source="id"/>
                <TextInput source="name"/>               
            </SimpleForm>
        </Create>
    )
}

export default CategoryEdit
