"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup = require('yup');
const nameSchema = yup.object({
    name: yup.string().required()
});
exports.default = nameSchema;
//# sourceMappingURL=nameValidation.js.map