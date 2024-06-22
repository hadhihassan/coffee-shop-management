import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
    try {
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds);
        const hasedPassword = await bcrypt.hash(password, salt);
        return hasedPassword
    } catch (error) {
        throw new Error('Error hashing password ' + error.message);
    }
}

export const comparePassword = async (enterdPassword, storedPassword) => {
    console.log(enterdPassword, storedPassword)
    try {
        return await bcrypt.compare(enterdPassword, storedPassword)
    } catch (error) {
        throw new Error('Error comparing passwords ' + error.message);
    }
}


