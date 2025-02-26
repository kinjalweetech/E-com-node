import { Sequelize } from "sequelize";
import mysql from "mysql2/promise"; // Import MySQL for manual DB creation
import dotenv from "dotenv";

dotenv.config();

// Extract environment variables
const DB_NAME = process.env.DB_NAME || "e-commerce";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_DIALECT = process.env.DB_DIALECT || "mysql";

// // Step 1: Create database if it doesn't exist
// const createDatabase = async () => {
//     try {
//         const connection = await mysql.createConnection({
//             host: DB_HOST,
//             user: DB_USER,
//             password: DB_PASSWORD,
//         });
//         await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
//         console.log("✅ Database checked/created successfully!");
//         await connection.end();
//     } catch (error) {
//         console.error("❌ Error creating database:", error);
//     }
// };

// Step 2: Initialize Sequelize after the database is created
const connectSequelize = async () => {
    // await createDatabase(); // Ensure the database exists before connecting

    const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
        host: DB_HOST,
        dialect: DB_DIALECT ,
        logging: false,
    });

    try {
        await sequelize.authenticate();
        console.log("🔥 Sequelize Database connected successfully!");
    } catch (error) {
        console.error("❌ Sequelize Unable to connect to the database:", error);
    }

    return sequelize;
};

// Export Sequelize instance
export const sequelize = await connectSequelize();
export default sequelize;
