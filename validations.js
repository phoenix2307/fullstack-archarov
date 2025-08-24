import {body} from 'express-validator'

export const loginValidation = [
    body('email', 'невірний формат пошти').isEmail(),
    body('password', 'Пароль має містити мінімум 5 символів').isLength({min: 5}),
]

export const registerValidation = [
    body('email', 'невірний формат пошти').isEmail(),
    body('password', 'Пароль має містити мінімум 5 символів').isLength({min: 5}),
    body('fullName', `Вкажіть правильно ім'я`).isLength({min: 3}),
    body('avatar', 'Невірне посилання на аватарку').optional().isURL(),
]

export const postCreateValidation = [
    body('title', 'Введіть назву статті').isLength({min: 3}).isString(),
    body('text', 'Введіть текст статті').isLength({min: 3}).isString(),
    body('tags', 'Невірний формат тегів (вкажіть масив тегів)').optional().isArray(),
    body('imageUrl', 'Невірне посилання на зображення').optional().isString(),
]