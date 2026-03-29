import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js"

class LoginDto extends BaseDto {
    static Schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
}

export default LoginDto