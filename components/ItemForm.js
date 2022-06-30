import {Form, Formik, Field} from 'formik';
import {
    Button, ButtonGroup,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    NumberInput, NumberInputField
} from '@chakra-ui/react';
import * as Yup from 'yup';

const ItemSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    price: Yup.number().min(1, 'Must be greater than 0').max(1000000000, 'Must be less than 1 billion').required('Required'),
    note: Yup.string(),
});

export default function ItemForm({item, onSubmit, onClose}) {
    return (
        <Formik
            initialValues={{
                name: item ? item.name : '',
                price: item ? parseInt(item.price.replaceAll(',', '')) : 0,
                note: item ? item.note : '',
            }}
            validationSchema={ItemSchema}
            onSubmit={(values, actions) => {
                values.price = parseInt(values.price)
                onSubmit(values);
                onClose();
                actions.setSubmitting(false);
            }}
        >
            {(props) => (
                <Form>
                    <Field name="name">
                        {({field, form}) => (
                            <FormControl isInvalid={form.errors.name && !!form.touched.name} isRequired>
                                <FormLabel htmlFor="name">Name</FormLabel>
                                <Input {...field} id="name" placeholder="Item name"/>
                                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>
                    <Field name="price">
                        {({field, form}) => (
                            <FormControl isInvalid={form.errors.price && !!form.touched.price} isRequired>
                                <FormLabel htmlFor="price">Price</FormLabel>
                                <NumberInput {...field}>
                                    <NumberInputField {...field} id="price"/>
                                </NumberInput>
                                <FormErrorMessage>{form.errors.price}</FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>
                    <Field name="note">
                        {({field, form}) => (
                            <FormControl isInvalid={form.errors.note && !!form.touched.note}>
                                <FormLabel htmlFor="note">Notes</FormLabel>
                                <Input {...field} id="note" placeholder="Additional notes"/>
                                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>
                    <ButtonGroup my={4}>
                        <Button colorScheme="green" mr={3} isLoading={props.isSubmitting} type={'submit'}>
                            {item ? 'Save' : 'Create'}
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ButtonGroup>
                </Form>
            )}
        </Formik>
    );
}