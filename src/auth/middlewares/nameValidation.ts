const yup = require('yup');

const nameSchema = yup.object({
    name: yup.string().required()
});

export default nameSchema;