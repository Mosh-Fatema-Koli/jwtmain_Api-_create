const db  = require('../../dbConnection');

module.exports = {
    find: async() => {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();
            const fetchResult = await connection.query(
                `SELECT id,name,email,address,number,
                CONCAT('http://192.168.3.6:3000/upload/',profile_picture) AS profile_picture
                FROM profile`,
            );
            await connection.commit();
            return fetchResult[0];
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },
    create: async(data) => {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();
            const queryResult = await connection.query(
                `insert into profile
                (name,email,address,number,profile_picture)
                values(?,?,?,?,?)`, [
                    data.name,
                    data.email,
                    data.address,
                    data.number,
                    data.profile_picture
                ]
            );
            const fetchResult = await connection.query(
                `SELECT id,name,email,address,number,
                CONCAT('http://192.168.3.6:3000/upload/',profile_picture) AS profile_picture
                FROM profile WHERE id = ?`, [queryResult[0].insertId]
            );
            await connection.commit();
            return fetchResult[0][0];
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },
};