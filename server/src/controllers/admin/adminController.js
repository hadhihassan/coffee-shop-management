import { STATUS_CODES } from '../../constants/httpStatusCodes.js'
import catchAsync from '../../utils/catchAsync.js'
import Admin from '../../models/admin-model.js';
import { comparePassword } from '../../utils/bcryptUtil.js';
import { generateAccessToken } from '../../utils/jwtToken.js';


export const loginAdmin = catchAsync(async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await Admin.findOne({ email })
        if (userExist !== null) {

            const mathPassword = await comparePassword(password, userExist.password);
            console.log(mathPassword)
            if (mathPassword) {
                const accessToken = await generateAccessToken(userExist._id)
                return res.status(STATUS_CODES.OK).json({ message: "Success", data: userExist, access: accessToken })
            } else {
                return res.status(STATUS_CODES.UNAUTHORIZED).json({
                    message: "Incorrect Password",
                    data: null,
                    accessToken: "",
                })
            }

        } else {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({
                message: "Invalid password or email",
                data: null,
                accessToken: "",
                refreshToken: ""
            })
        }
    } catch (error) {
        console.error(error.message);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred during registration' });
    }
});
