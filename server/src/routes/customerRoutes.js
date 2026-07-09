const express = require("express");

const router = express.Router();

const customerController = require("../controllers/customerController");
const validate = require("../middleware/validate");

const {
    createCustomerSchema,
    getCustomersSchema,
    customerIdSchema,
    updateCustomerSchema
} = require("../validators/customerValidator");

router.post(
    "/",
    validate(createCustomerSchema),
    customerController.createCustomer
);

router.get(
    "/",
    validate(getCustomersSchema, "query"),
    customerController.getCustomers
);

router.get(
    "/:id",
    validate(customerIdSchema, "params"),
    customerController.getCustomerById
);

router.patch(
    "/:id",
    validate(customerIdSchema, "params"),
    validate(updateCustomerSchema),
    customerController.updateCustomer
);

router.delete(
    "/:id",
    validate(customerIdSchema, "params"),
    customerController.archiveCustomer
);

module.exports = router;