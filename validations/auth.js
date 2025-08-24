import {body} from 'express-validator'

export const registerValidation = [
    body('email', 'невірний формат пошти').isEmail(),
    body('password', 'Пароль має містити мінімум 5 символів').isLength({min: 5}),
    body('fullName', `Вкажіть правильно ім'я`).isLength({min: 3}),
    body('avatar', 'Невірне посилання на аватарку').optional().isURL(),
]