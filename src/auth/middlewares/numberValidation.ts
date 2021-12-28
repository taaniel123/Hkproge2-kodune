const yup = require('yup');

const numberSchema = yup.object({
    number: yup.number().required()
});

export default numberSchema;