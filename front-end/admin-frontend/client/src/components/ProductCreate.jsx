import React from 'react'
import { Create, SimpleForm, TextInput,  NumberInput, ImageInput, SelectInput } from 'react-admin'
// import RichTextInput from 'ra-input-rich-text';

const PostCreate = (props) => {
    return (
        <Create title="Create a Product" {...props}>
            <SimpleForm>
                <TextInput source="title"/>
                {/* <TextInput multiline source="body"/> */}
                <NumberInput source="price"/>
                <ImageInput source="image0"/>
                <ImageInput source="image1"/>
                <SelectInput source="category"/>
                <TextInput multiline source="description"/>
                {/* <RichTextInput source="description"/> */}
                
            </SimpleForm>
        </Create>
    )
}

export default PostCreate
