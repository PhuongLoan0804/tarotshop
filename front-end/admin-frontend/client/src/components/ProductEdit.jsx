import React from 'react'

import { Edit, SimpleForm, TextInput, DateInput, NumberInput, ImageInput, SelectInput, MarkdownInput, RichTextField} from 'react-admin'

const PostEdit = (props) => {
    return (
        <Edit title="Edit Product" {...props}>
            <SimpleForm>
                <TextInput disabled source="id"/>
                <TextInput source="title"/>
                <NumberInput source="price"/>
                <ImageInput source="image0"/>
                <ImageInput source="image1"/>
                <SelectInput source="category"/>
                <TextInput multiline source="description"/>
                {/* <RichTextField source="description"/> */}
            </SimpleForm>
        </Edit>
    )
}

export default PostEdit
