# Copyright (c) 2025, Cloud Engineering and Services Company Limited and contributors
# For license information, please see license.txt

import frappe
import json
from frappe.model.document import Document


class ADL(Document):
    @property
    def adl_score(self):
        result = json.loads(frappe.db.get_value("ADL", self.name, "questionaire_data"))
        return result['total']

    @property
    def client_name(self):
        return frappe.db.get_value("Customer", self.customer, "customer_name")
