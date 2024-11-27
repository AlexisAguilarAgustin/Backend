//moduls/suppliers.js

const suppliersQueries={

    getAllSupp: 'SELECT * FROM suppliers WHERE is_active = 1',
    getByRfc: 'SELECT * FROM suppliers WHERE rfc = ? AND is_active = 1',
    create: 'INSERT INTO suppliers (rfc, name, description, phone_number, email, address, is_active) VALUES (?,?,?,?,?,?,?)',
    updateByRfc: 'UPDATE suppliers SET name = ?, description = ?, phone_number = ?, email = ?, address = ?, is_active = ? WHERE rfc = ?',
    deleteSupp: 'UPDATE suppliers SET is_active = 0 WHERE rfc = ?'

};

module.exports = {suppliersQueries};