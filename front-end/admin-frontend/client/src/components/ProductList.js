import React from 'react'
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    DeleteButton,
    NumberField,
    ImageField,
    SelectField,
    RichTextField
} from 'react-admin'


const PostList = (props) => {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source="id"/>
                <TextField source="title"/>
                <NumberField source="price"/>
                <ImageField source="image0"/>
                <ImageField source="image1"/>
                <SelectField source="category"/>
                <TextField multiline source="description"/>
                {/* <RichTextField source="description"/> */}
                <EditButton basePath="/products"/>
                <DeleteButton basePath="/products"/>
            </Datagrid>
        </List>
    )
}

export default PostList
